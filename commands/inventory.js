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
                .setMinValue(1))
        .addStringOption(option =>
            option.setName('filter')
                .setDescription('Filter items by type')
                .setRequired(false)
                .addChoices(
                    { name: '🍽️ Food Items', value: 'food' },
                    { name: '💊 Healing Items', value: 'healing' },
                    { name: '⚒️ Materials', value: 'material' },
                    { name: '💰 Currency', value: 'currency' },
                    { name: '⚡ Boost Items', value: 'boost' },
                    { name: '⚔️ Weapons', value: 'weapon' },
                    { name: '🛡️ Armor', value: 'armor' },
                    { name: '🧪 Potions', value: 'potion' },
                    { name: '📦 Consumables', value: 'consumable' }
                ))
        .addStringOption(option =>
            option.setName('sort')
                .setDescription('Sort items by criteria')
                .setRequired(false)
                .addChoices(
                    { name: 'Name (A-Z)', value: 'name_asc' },
                    { name: 'Name (Z-A)', value: 'name_desc' },
                    { name: 'Quantity (High to Low)', value: 'quantity_desc' },
                    { name: 'Quantity (Low to High)', value: 'quantity_asc' },
                    { name: 'Type', value: 'type' },
                    { name: 'Recently Added', value: 'recent' }
                )),
    async execute(interaction) {
        const userId = interaction.user.id;
        const page = (interaction.options && interaction.options.getInteger('page')) || 1;
        const filterType = interaction.options && interaction.options.getString('filter');
        const sortBy = interaction.options && interaction.options.getString('sort') || 'type';

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

            let inventory = await getPlayerInventory(userId);
            const faction = FACTIONS[character.faction];

            // Apply filtering
            if (filterType) {
                inventory = inventory.filter(item => item.item_type === filterType);
            }

            // Apply sorting
            inventory = this.sortInventory(inventory, sortBy);

            // Empty inventory case
            if (inventory.length === 0) {
                return this.createEmptyInventoryResponse(character, faction, filterType);
            }

            // Group items by type for better organization
            const itemsByType = this.groupItemsByType(inventory);

            // Pagination setup
            const itemsPerPage = 15;
            const totalPages = Math.ceil(inventory.length / itemsPerPage);
            const currentPage = Math.min(page, totalPages);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageItems = inventory.slice(startIndex, endIndex);

            // Create enhanced inventory display
            const inventoryContainer = this.createInventoryContainer(
                character, faction, pageItems, itemsByType, currentPage, totalPages, filterType, sortBy
            );

            // Create interactive components
            const components = this.createInventoryComponents(userId, inventory, currentPage, totalPages, filterType, sortBy);

            await interaction.reply({ 
                components: [inventoryContainer, ...components], 
                flags: MessageFlags.IsComponentsV2 
            });

        } catch (error) {
            console.error('Inventory view error:', error);
            const errorContainer = createErrorContainer('Inventory Error', 
                'An error occurred while retrieving your inventory. Please try again.');
            await interaction.reply({ 
                components: [errorContainer], 
                flags: MessageFlags.IsComponentsV2 
            });
        }
    },

    sortInventory(inventory, sortBy) {
        switch (sortBy) {
            case 'name_asc':
                return inventory.sort((a, b) => a.item_name.localeCompare(b.item_name));
            case 'name_desc':
                return inventory.sort((a, b) => b.item_name.localeCompare(a.item_name));
            case 'quantity_desc':
                return inventory.sort((a, b) => b.quantity - a.quantity);
            case 'quantity_asc':
                return inventory.sort((a, b) => a.quantity - b.quantity);
            case 'type':
                return inventory.sort((a, b) => {
                    if (a.item_type === b.item_type) {
                        return a.item_name.localeCompare(b.item_name);
                    }
                    return a.item_type.localeCompare(b.item_type);
                });
            case 'recent':
                return inventory.sort((a, b) => new Date(b.date_acquired || 0) - new Date(a.date_acquired || 0));
            default:
                return inventory;
        }
    },

    groupItemsByType(inventory) {
        const itemsByType = {};
        inventory.forEach(item => {
            if (!itemsByType[item.item_type]) {
                itemsByType[item.item_type] = [];
            }
            itemsByType[item.item_type].push(item);
        });
        return itemsByType;
    },

    createEmptyInventoryResponse(character, faction, filterType) {
        const titleDisplay = new TextDisplayBuilder()
            .setContent(
                `# 🎒 ${character.character_name || character.name}'s Inventory\n` +
                `**${faction.name}** Storage ${filterType ? `(${filterType} filter)` : ''}`
            );

        const emptyMessage = filterType 
            ? `No **${filterType}** items found in your inventory.` 
            : `Your inventory is empty.`;

        const emptyDisplay = new TextDisplayBuilder()
            .setContent(
                `## 📦 ${filterType ? 'No Items Found' : 'Empty Inventory'}\n\n` +
                `${emptyMessage}\n\n` +
                `**💡 Tips to get items:**\n` +
                `• Complete quests with \`/quest\`\n` +
                `• Defeat enemies in battles\n` +
                `• Explore different locations\n` +
                `• Trade with other players\n\n` +
                `*Start your adventure with \`/quest\` to find treasure!*`
            );

        const emptyContainer = new ContainerBuilder()
            .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
            .addTextDisplayComponents(titleDisplay)
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Medium)
            )
            .addTextDisplayComponents(emptyDisplay);

        return { 
            components: [emptyContainer], 
            flags: MessageFlags.IsComponentsV2 
        };
    },

    createInventoryContainer(character, faction, pageItems, itemsByType, currentPage, totalPages, filterType, sortBy) {
        const typeEmojis = {
            'food': '🍽️', 'healing': '💊', 'material': '⚒️', 'currency': '💰',
            'boost': '⚡', 'weapon': '⚔️', 'armor': '🛡️', 'potion': '🧪', 'consumable': '📦'
        };

        // Header with filtering/sorting info
        let headerInfo = '';
        if (filterType) headerInfo += ` (Filtered: ${typeEmojis[filterType]} ${filterType})`;
        if (sortBy && sortBy !== 'type') headerInfo += ` (Sorted: ${sortBy.replace('_', ' ')})`;

        const titleDisplay = new TextDisplayBuilder()
            .setContent(
                `# 🎒 ${character.character_name || character.name}'s Inventory\n` +
                `**${faction.name}** Storage • Page ${currentPage}/${totalPages}${headerInfo}`
            );

        // Create detailed item listings organized by type
        const inventorySections = [];

        if (filterType) {
            // Single type display when filtered
            const items = pageItems;
            if (items.length > 0) {
                const typeSection = new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`## ${typeEmojis[filterType]} ${filterType.charAt(0).toUpperCase() + filterType.slice(1)} Items`),
                        new TextDisplayBuilder().setContent(
                            items.map((item, index) => 
                                `**${startIndex + index + 1}.** ${item.item_name} ×${item.quantity}\n` +
                                `   *${item.item_description.substring(0, 80)}${item.item_description.length > 80 ? '...' : ''}*`
                            ).join('\n\n')
                        )
                    );
                inventorySections.push(typeSection);
            }
        } else {
            // Multi-type display
            Object.entries(itemsByType).forEach(([type, items]) => {
                if (items.length > 0) {
                    const displayItems = items.slice(0, 8); // Limit per category
                    const typeSection = new SectionBuilder()
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent(`## ${typeEmojis[type] || '📦'} ${type.charAt(0).toUpperCase() + type.slice(1)}`),
                            new TextDisplayBuilder().setContent(
                                displayItems.map(item => 
                                    `• **${item.item_name}** ×${item.quantity}`
                                ).join('\n') +
                                (items.length > 8 ? `\n*...and ${items.length - 8} more items*` : '')
                            )
                        );
                    inventorySections.push(typeSection);
                }
            });
        }

        // Statistics section
        const totalItems = Object.values(itemsByType).reduce((sum, items) => 
            sum + items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
        const usableCount = Object.values(itemsByType)
            .filter(([type]) => ['food', 'healing', 'potion', 'consumable'].includes(type))
            .reduce((sum, items) => sum + items.length, 0);

        const statsSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 📊 Inventory Statistics`),
                new TextDisplayBuilder().setContent(
                    `**📦 Total Items:** ${totalItems}/500 slots\n` +
                    `**🗂️ Categories:** ${Object.keys(itemsByType).length} different types\n` +
                    `**🎯 Usable Items:** ${usableCount} items ready to use\n` +
                    `**📄 Current View:** ${pageItems.length} items shown`
                )
            );

        // Build container
        const inventoryContainer = new ContainerBuilder()
            .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
            .addTextDisplayComponents(titleDisplay)
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Medium)
            );

        // Add inventory sections
        inventorySections.forEach((section, index) => {
            inventoryContainer.addSectionComponents(section);
            if (index < inventorySections.length - 1) {
                inventoryContainer.addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                );
            }
        });

        inventoryContainer
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Medium)
            )
            .addSectionComponents(statsSection);

        return inventoryContainer;
    },

    createInventoryComponents(userId, inventory, currentPage, totalPages, filterType, sortBy) {
        const components = [];

        // Item usage dropdown (for usable items)
        const usableItems = inventory.filter(item => 
            ['food', 'healing', 'potion', 'consumable'].includes(item.item_type)
        );

        if (usableItems.length > 0) {
            const typeEmojis = {
                'food': '🍽️', 'healing': '💊', 'potion': '🧪', 'consumable': '📦'
            };

            const selectMenuOptions = usableItems.slice(0, 25).map(item => ({
                label: `${item.item_name} (×${item.quantity})`,
                description: item.item_description.substring(0, 100),
                value: `use_item_${item.item_name.toLowerCase().replace(/\s+/g, '_')}`,
                emoji: typeEmojis[item.item_type] || '📦'
            }));

            const useItemMenu = new StringSelectMenuBuilder()
                .setCustomId(`inventory_use_${userId}`)
                .setPlaceholder('🎯 Select an item to use...')
                .addOptions(selectMenuOptions);

            components.push(new ActionRowBuilder().addComponents(useItemMenu));
        }

        // Filter and sort controls
        const filterMenu = new StringSelectMenuBuilder()
            .setCustomId(`inventory_filter_${userId}`)
            .setPlaceholder(filterType ? `Current filter: ${filterType}` : '🔍 Filter by item type...')
            .addOptions([
                { label: 'Show All Items', value: 'none', emoji: '📋' },
                { label: 'Food Items', value: 'food', emoji: '🍽️' },
                { label: 'Healing Items', value: 'healing', emoji: '💊' },
                { label: 'Materials', value: 'material', emoji: '⚒️' },
                { label: 'Weapons', value: 'weapon', emoji: '⚔️' },
                { label: 'Armor', value: 'armor', emoji: '🛡️' },
                { label: 'Potions', value: 'potion', emoji: '🧪' },
                { label: 'Consumables', value: 'consumable', emoji: '📦' }
            ]);

        components.push(new ActionRowBuilder().addComponents(filterMenu));

        // Navigation and utility buttons
        const navigationRow = new ActionRowBuilder();

        // Pagination buttons
        if (totalPages > 1) {
            navigationRow.addComponents(
                new ButtonBuilder()
                    .setCustomId(`inventory_page_${userId}_${Math.max(1, currentPage - 1)}`)
                    .setLabel('◀️ Previous')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(currentPage === 1),
                new ButtonBuilder()
                    .setCustomId(`inventory_page_${userId}_${Math.min(totalPages, currentPage + 1)}`)
                    .setLabel('Next ▶️')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(currentPage === totalPages)
            );
        }

        // Utility buttons
        navigationRow.addComponents(
            new ButtonBuilder()
                .setCustomId(`refresh_inventory_${userId}`)
                .setLabel('🔄 Refresh')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`inventory_stats_${userId}`)
                .setLabel('📊 Detailed Stats')
                .setStyle(ButtonStyle.Secondary)
        );

        // Add organize button if inventory has items
        if (inventory.length > 0) {
            navigationRow.addComponents(
                new ButtonBuilder()
                    .setCustomId(`organize_inventory_${userId}`)
                    .setLabel('🗂️ Organize')
                    .setStyle(ButtonStyle.Secondary)
            );
        }

        components.push(navigationRow);

        return components;
    }
};