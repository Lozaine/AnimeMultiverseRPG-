const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { getCharacter, getPlayerInventory, usePlayerItem } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed } = require('../utils/embeds');

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
                const embed = createEmbed('No Character Found', 
                    'You don\'t have a character yet! Use `/create` to create one.', 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }

            const inventory = await getPlayerInventory(userId);
            const faction = FACTIONS[character.faction];

            if (inventory.length === 0) {
                const embed = new EmbedBuilder()
                    .setColor(faction.color)
                    .setTitle(`🎒 ${character.name}'s Inventory`)
                    .setDescription(`**${faction.name}** Inventory`)
                    .addFields([
                        { 
                            name: '📦 Empty Inventory', 
                            value: 'Your inventory is empty. Complete quests to earn items!', 
                            inline: false 
                        }
                    ])
                    .setFooter({ text: 'Cross Realm Chronicles • Inventory System' })
                    .setTimestamp();
                return interaction.reply({ embeds: [embed] });
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

            const embed = new EmbedBuilder()
                .setColor(faction.color)
                .setTitle(`🎒 ${character.name}'s Inventory`)
                .setDescription(`**${faction.name}** Inventory • Page ${currentPage}/${totalPages}`)
                .setFooter({ text: `Cross Realm Chronicles • Showing ${pageItems.length} of ${allItems.length} items` })
                .setTimestamp();

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

            // Create column layout - 3 columns per row
            const columns = [[], [], []];
            pageItems.forEach((item, index) => {
                const columnIndex = index % 3;
                const typeEmoji = typeEmojis[item.item_type] || '📦';
                const itemText = `${typeEmoji} **${item.item_name}** (x${item.quantity})`;
                columns[columnIndex].push(itemText);
            });

            // Add columns as inline fields
            for (let i = 0; i < 3; i++) {
                if (columns[i].length > 0) {
                    embed.addFields([
                        {
                            name: i === 0 ? '📋 Items' : '\u200b', // Only show title on first column
                            value: columns[i].join('\n') || '\u200b',
                            inline: true
                        }
                    ]);
                }
            }

            // Add spacing and summary
            embed.addFields([
                { name: '\u200b', value: '\u200b', inline: false } // Spacer
            ]);

            // Summary section
            const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
            const usableCount = inventory.filter(item => ['food', 'healing', 'potion', 'consumable'].includes(item.item_type)).length;
            
            embed.addFields([
                { 
                    name: '📊 Summary', 
                    value: `**${totalItems}/100** items total\n**${Object.keys(itemsByType).length}** different types\n**${usableCount}** usable items`, 
                    inline: true 
                },
                { 
                    name: '🗂️ Categories', 
                    value: Object.entries(itemsByType).map(([type, items]) => {
                        const emoji = typeEmojis[type] || '📦';
                        return `${emoji} ${type.charAt(0).toUpperCase() + type.slice(1)} (${items.length})`;
                    }).join('\n'), 
                    inline: true 
                },
                { 
                    name: '📖 Navigation', 
                    value: totalPages > 1 ? `Use \`/inventory page:${currentPage + 1 <= totalPages ? currentPage + 1 : 1}\` for ${currentPage + 1 <= totalPages ? 'next' : 'first'} page` : 'All items shown', 
                    inline: true 
                }
            ]);

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

            interaction.reply({ embeds: [embed], components: components });

        } catch (error) {
            console.error('Inventory view error:', error);
            const embed = createEmbed('Inventory Error', 
                'An error occurred while retrieving your inventory. Please try again.', 
                '#ff6b6b');
            interaction.reply({ embeds: [embed] });
        }
    }
};