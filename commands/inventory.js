const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { getCharacter, getPlayerInventory } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('View your inventory and stored items'),
    async execute(interaction) {
        const userId = interaction.user.id;
        
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

            const embed = new EmbedBuilder()
                .setColor(faction.color)
                .setTitle(`🎒 ${character.name}'s Inventory`)
                .setDescription(`**${faction.name}** Inventory`)
                .setFooter({ text: 'Cross Realm Chronicles • Inventory System' })
                .setTimestamp();

            if (inventory.length === 0) {
                embed.addFields([
                    { 
                        name: '📦 Empty Inventory', 
                        value: 'Your inventory is empty. Complete quests to earn items!', 
                        inline: false 
                    }
                ]);
            } else {
                // Group items by type
                const itemsByType = {};
                inventory.forEach(item => {
                    if (!itemsByType[item.item_type]) {
                        itemsByType[item.item_type] = [];
                    }
                    itemsByType[item.item_type].push(item);
                });

                // Display items by category
                const typeEmojis = {
                    'food': '🍽️',
                    'healing': '💊',
                    'material': '⚒️',
                    'currency': '💰',
                    'boost': '⚡',
                    'weapon': '⚔️',
                    'armor': '🛡️'
                };

                for (const [type, items] of Object.entries(itemsByType)) {
                    const typeEmoji = typeEmojis[type] || '📦';
                    const itemList = items.map(item => 
                        `${item.item_name} x${item.quantity}\n*${item.item_description}*`
                    ).join('\n\n');
                    
                    embed.addFields([
                        { 
                            name: `${typeEmoji} ${type.charAt(0).toUpperCase() + type.slice(1)} Items`, 
                            value: itemList, 
                            inline: false 
                        }
                    ]);
                }

                // Add summary
                const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
                embed.addFields([
                    { 
                        name: '📊 Inventory Summary', 
                        value: `Total items: ${totalItems}/100\nItem types: ${Object.keys(itemsByType).length}\nUsable items: ${inventory.filter(item => ['food', 'healing', 'potion', 'consumable'].includes(item.item_type)).length}`, 
                        inline: false 
                    }
                ]);
            }

            interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Inventory view error:', error);
            const embed = createEmbed('Inventory Error', 
                'An error occurred while retrieving your inventory. Please try again.', 
                '#ff6b6b');
            interaction.reply({ embeds: [embed] });
        }
    }
};