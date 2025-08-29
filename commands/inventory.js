const { 
    EmbedBuilder, 
    SlashCommandBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    StringSelectMenuBuilder, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle,
    TextDisplayBuilder,
    ContainerBuilder,
    SectionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MessageFlags 
} = require('discord.js');
const { getCharacter, getPlayerInventory, usePlayerItem } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed, createErrorContainer } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('View your inventory and stored items')
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('Page number to view (default: 1)')
                .setRequired(false)
                .setMinValue(1)),
    async execute(interaction) {
        const userId = interaction.user.id;
        // Handle both slash commands and button interactions
        const page = (interaction.options && interaction.options.getInteger('page')) || 1;
        
        try {
            const character = await getCharacter(userId);
            
            if (!character) {
                const errorContainer = createErrorContainer('No Character Found', 
                    'You don\'t have a character yet! Use `/create` to create one.');
                return interaction.reply({ 
                    components: [errorContainer], 
                    flags: MessageFlags.IsComponentsV2 
                });
            }

            const inventory = await getPlayerInventory(userId);
            const faction = FACTIONS[character.faction];

            if (inventory.length === 0) {
                const titleDisplay = new TextDisplayBuilder()
                    .setContent(`# 🎒 ${character.character_name || character.name}'s Inventory\n**${faction.name}** Inventory`);

                const emptyDisplay = new TextDisplayBuilder()
                    .setContent(`## 📦 Empty Inventory\n\nYour inventory is empty. Complete quests to earn items!\n\n*Use \`/quest\` to start your adventure and find treasure!*`);

                const emptyContainer = new ContainerBuilder()
                    .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
                    .addTextDisplayComponents(titleDisplay)
                    .addSeparatorComponents(
                        new SeparatorBuilder()
                            .setDivider(true)
                            .setSpacing('medium')
                    )
                    .addTextDisplayComponents(emptyDisplay);

                return interaction.reply({ 
                    components: [emptyContainer], 
                    flags: MessageFlags.IsComponentsV2 
                });
            }

            // Group items by type
            const itemsByType = {};
            inventory.forEach(item => {
                if (!itemsByType[item.item_type]) {
                    itemsByType[item.item_type] = [];
                }
                itemsByType[item.item_type].push(item);
            });

            // Pagination setup
            const itemsPerPage = 12; // 4 rows × 3 columns = 12 items per page
            const allItems = inventory.slice(); // Copy for pagination
            const totalPages = Math.ceil(allItems.length / itemsPerPage);
            const currentPage = Math.min(page, totalPages);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageItems = allItems.slice(startIndex, endIndex);

            // Display items by category with emojis
            const typeEmojis = {
                'food': '🍽️',
                'healing': '💊',
                'material': '⚒️',
                'currency': '💰',
                'boost': '⚡',
                'weapon': '⚔️',
                'armor': '🛡️',
                'potion': '🧪',
                'consumable': '📦'
            };

            // Create main inventory container using Components V2
            const titleDisplay = new TextDisplayBuilder()
                .setContent(`# 🎒 ${character.character_name || character.name}'s Inventory\n**${faction.name}** Inventory • Page ${currentPage}/${totalPages}`);

            // Create items display organized by type
            const itemsDisplay = new TextDisplayBuilder()
                .setContent(`## 📋 Items Collection\n\n${
                    Object.entries(itemsByType).map(([type, items]) => {
                        const emoji = typeEmojis[type] || '📦';
                        const itemList = items.slice(0, 8).map(item => 
                            `• **${item.item_name}** (x${item.quantity})`
                        ).join('\n');
                        return `**${emoji} ${type.charAt(0).toUpperCase() + type.slice(1)}:**\n${itemList}`;
                    }).join('\n\n')
                }`);

            // Summary stats section
            const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
            const usableCount = inventory.filter(item => ['food', 'healing', 'potion', 'consumable'].includes(item.item_type)).length;

            const summarySection = new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## 📊 Inventory Statistics`),
                    new TextDisplayBuilder().setContent(
                        `**Storage:** ${totalItems}/100 items total\n` +
                        `**Categories:** ${Object.keys(itemsByType).length} different types\n` +
                        `**Usable Items:** ${usableCount} ready to consume`
                    )
                );

            // Categories breakdown
            const categoriesDisplay = new TextDisplayBuilder()
                .setContent(
                    `## 🗂️ Categories Breakdown\n\n${
                        Object.entries(itemsByType).map(([type, items]) => {
                            const emoji = typeEmojis[type] || '📦';
                            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
                            return `${emoji} **${type.charAt(0).toUpperCase() + type.slice(1)}:** ${items.length} types (${totalQuantity} items)`;
                        }).join('\n')
                    }`
                );

            // Navigation info
            let navigationDisplay = null;
            if (totalPages > 1) {
                navigationDisplay = new TextDisplayBuilder()
                    .setContent(
                        `## 📖 Navigation\n\n` +
                        `**Current Page:** ${currentPage} of ${totalPages}\n` +
                        `**Items Shown:** ${pageItems.length} of ${allItems.length}\n\n` +
                        `*Use \`/inventory page:${currentPage + 1 <= totalPages ? currentPage + 1 : 1}\` for ${currentPage + 1 <= totalPages ? 'next' : 'first'} page*`
                    );
            }

            // Build the container
            const inventoryContainer = new ContainerBuilder()
                .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
                .addTextDisplayComponents(titleDisplay)
                .addSeparatorComponents(
                    new SeparatorBuilder()
                        .setDivider(true)
                        .setSpacing('medium')
                )
                .addTextDisplayComponents(itemsDisplay)
                .addSeparatorComponents(
                    new SeparatorBuilder().setSpacing('medium')
                )
                .addSectionComponents(summarySection)
                .addSeparatorComponents(
                    new SeparatorBuilder().setSpacing('small')
                )
                .addTextDisplayComponents(categoriesDisplay);

            if (navigationDisplay) {
                inventoryContainer
                    .addSeparatorComponents(
                        new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                    )
                    .addTextDisplayComponents(navigationDisplay);
            }

            // Create interactive components
            const components = [];
            const usableItems = inventory.filter(item => ['food', 'healing', 'potion', 'consumable'].includes(item.item_type));
            
            if (usableItems.length > 0) {
                // Create select menu for item usage (up to 25 items can be shown)
                const selectMenuOptions = usableItems.slice(0, 25).map(item => ({
                    label: `${item.item_name} (x${item.quantity})`,
                    description: item.item_description.substring(0, 100),
                    value: item.item_name, // Use exact item name, not transformed
                    emoji: typeEmojis[item.item_type] || '📦'
                }));

                const selectMenu = new StringSelectMenuBuilder()
                    .setCustomId(`inventory_use_${userId}`)
                    .setPlaceholder('Choose an item to use...')
                    .addOptions(selectMenuOptions);

                const selectRow = new ActionRowBuilder().addComponents(selectMenu);
                components.push(selectRow);

                // Add utility buttons
                const utilityRow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`refresh_inventory_${userId}`)
                            .setLabel('🔄 Refresh')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId(`sort_inventory_${userId}`)
                            .setLabel('📊 Sort by Type')
                            .setStyle(ButtonStyle.Secondary)
                    );
                components.push(utilityRow);
            }

            interaction.reply({ 
                components: [inventoryContainer, ...components], 
                flags: MessageFlags.IsComponentsV2 
            });

        } catch (error) {
            console.error('Inventory view error:', error);
            const errorContainer = createErrorContainer('Inventory Error', 
                'An error occurred while retrieving your inventory. Please try again.');
            interaction.reply({ 
                components: [errorContainer], 
                flags: MessageFlags.IsComponentsV2 
            });
        }
    }
};