// FIXED commands/use.js
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { getCharacter, getPlayerInventory, removeItemFromInventory, updateCharacterProgress } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed } = require('../utils/embeds');
const { checkLevelUp } = require('../utils/levelProgression');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('use')
        .setDescription('Use an item from your inventory')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('The item to use')
                .setRequired(true)
                .setAutocomplete(true))
        .addIntegerOption(option =>
            option.setName('quantity')
                .setDescription('How many to use (default: 1)')
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(10)),
    
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const userId = interaction.user.id;
        
        try {
            const character = await getCharacter(userId);
            if (!character) {
                return await interaction.respond([]);
            }
            
            const inventory = await getPlayerInventory(userId);
            if (!inventory || inventory.length === 0) {
                return await interaction.respond([]);
            }
            
            const usableItems = inventory.filter(item => 
                ['food', 'healing', 'potion', 'consumable', 'boost'].includes(item.item_type)
            );
            
            const filtered = usableItems.filter(item => 
                item.item_name.toLowerCase().includes(focusedValue.toLowerCase())
            );
            
            const choices = filtered
                .slice(0, 25)
                .map(item => ({
                    name: `${item.item_name} (x${item.quantity}) - ${item.item_type}`,
                    value: item.item_name
                }));
            
            await interaction.respond(choices);
            
        } catch (error) {
            console.error('[AUTOCOMPLETE] Error:', error);
            await interaction.respond([]);
        }
    },
    
    async execute(interaction) {
        const userId = interaction.user.id;
        const itemName = interaction.options.getString('item');
        const quantity = interaction.options.getInteger('quantity') || 1;
        
        try {
            const character = await getCharacter(userId);
            
            if (!character) {
                const embed = createEmbed('No Character Found', 
                    'You don\'t have a character yet! Use `/create` to create one.', 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }

            // Get the specific item from inventory
            const inventory = await getPlayerInventory(userId);
            const item = inventory.find(inv => inv.item_name === itemName);
            
            if (!item) {
                const embed = createEmbed('Item Not Found', 
                    `You don't have "${itemName}" in your inventory.`, 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }
            
            if (item.quantity < quantity) {
                const embed = createEmbed('Not Enough Items', 
                    `You only have ${item.quantity} of "${itemName}".`, 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }
            
            // Check if item is usable
            const usableTypes = ['food', 'healing', 'potion', 'consumable', 'boost'];
            if (!usableTypes.includes(item.item_type)) {
                const embed = createEmbed('Item Not Usable', 
                    `"${itemName}" cannot be used. It's a ${item.item_type} item.`, 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }
            
            // Apply item effects
            let effectsApplied = [];
            let newHp = character.hp || character.max_hp;
            let newMp = character.mp || 0; // Add MP support
            let newExp = character.experience;
            let newGold = character.gold;
            let newAtk = character.atk;
            let newDef = character.def;
            let newSpd = character.spd;
            
            for (let i = 0; i < quantity; i++) {
                // Parse item effects from description (case-insensitive)
                const description = item.item_description.toLowerCase();
                
                // HP restoration - improved regex patterns
                const hpPatterns = [
                    /restores (\d+) hp/,
                    /\+(\d+) hp/,
                    /heals (\d+) hp/,
                    /(\d+) hp restored/
                ];
                
                for (const pattern of hpPatterns) {
                    const hpMatch = description.match(pattern);
                    if (hpMatch) {
                        const hpRestore = parseInt(hpMatch[1]);
                        const oldHp = newHp;
                        newHp = Math.min(newHp + hpRestore, character.max_hp);
                        const actualRestore = newHp - oldHp;
                        if (actualRestore > 0) {
                            effectsApplied.push(`+${actualRestore} HP${actualRestore < hpRestore ? ' (max HP reached)' : ''}`);
                        }
                        break;
                    }
                }
                
                // MP restoration - improved patterns
                const mpPatterns = [
                    /restores (\d+) mp/,
                    /\+(\d+) mp/,
                    /(\d+) mp restored/,
                    /and (\d+) mp/ // for "restores X HP and Y MP"
                ];
                
                for (const pattern of mpPatterns) {
                    const mpMatch = description.match(pattern);
                    if (mpMatch) {
                        const mpRestore = parseInt(mpMatch[1]);
                        newMp += mpRestore;
                        effectsApplied.push(`+${mpRestore} MP`);
                        break;
                    }
                }
                
                // XP bonus - improved patterns
                const xpPatterns = [
                    /\+(\d+) xp/,
                    /(\d+) xp bonus/,
                    /grants (\d+) experience/
                ];
                
                for (const pattern of xpPatterns) {
                    const xpMatch = description.match(pattern);
                    if (xpMatch) {
                        const xpBonus = parseInt(xpMatch[1]);
                        newExp += xpBonus;
                        effectsApplied.push(`+${xpBonus} XP`);
                        break;
                    }
                }
                
                // Gold bonus
                const goldPatterns = [
                    /contains (\d+) extra coins/,
                    /\+(\d+) coins/,
                    /(\d+) gold/
                ];
                
                for (const pattern of goldPatterns) {
                    const goldMatch = description.match(pattern);
                    if (goldMatch) {
                        const goldBonus = parseInt(goldMatch[1]);
                        newGold += goldBonus;
                        effectsApplied.push(`+${goldBonus} Coins`);
                        break;
                    }
                }
                
                // Temporary stat boosts (for future implementation)
                const statPatterns = [
                    { pattern: /\+(\d+) temporary (?:atk|attack)/, stat: 'atk', name: 'ATK' },
                    { pattern: /\+(\d+) temporary (?:def|defense)/, stat: 'def', name: 'DEF' },
                    { pattern: /\+(\d+) temporary (?:spd|speed)/, stat: 'spd', name: 'SPD' }
                ];
                
                for (const statInfo of statPatterns) {
                    const statMatch = description.match(statInfo.pattern);
                    if (statMatch) {
                        const statBoost = parseInt(statMatch[1]);
                        // For now, just show the effect (implement temporary boosts later)
                        effectsApplied.push(`+${statBoost} ${statInfo.name} (temporary)`);
                        break;
                    }
                }
                
                // Special item effects
                if (description.includes('lucky') || description.includes('luck')) {
                    effectsApplied.push('Lucky effect applied');
                }
                
                if (description.includes('boost') && !effectsApplied.some(e => e.includes('XP'))) {
                    effectsApplied.push('Boost effect applied');
                }
            }
            
            // Remove items from inventory
            const removeResult = await removeItemFromInventory(userId, itemName, quantity);
            
            if (!removeResult.success) {
                const embed = createEmbed('Use Item Error', 
                    removeResult.message, 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }
            
            // Check for level up
            const levelUpData = checkLevelUp(character.level, character.experience, newExp);
            
            // Update character with new stats
            if (levelUpData.leveledUp) {
                await updateCharacterProgress(
                    userId, 
                    newExp, 
                    newGold, 
                    levelUpData.newLevel,
                    newHp,
                    levelUpData.newStats.maxHp,
                    levelUpData.newStats.atk,
                    levelUpData.newStats.def,
                    levelUpData.newStats.spd,
                    newExp // Set current XP
                );
            } else {
                await updateCharacterProgress(userId, newExp, newGold, character.level, newHp);
            }
            
            // Create success embed
            const faction = FACTIONS[character.faction];
            const embed = new EmbedBuilder()
                .setColor(faction.color)
                .setTitle('✨ Item Used Successfully!')
                .setDescription(`You used **${quantity}x ${itemName}**`)
                .addFields([
                    { 
                        name: '💊 Effects Applied', 
                        value: effectsApplied.length > 0 ? effectsApplied.join('\n') : 'No immediate effects', 
                        inline: false 
                    },
                    { 
                        name: '❤️ Current HP', 
                        value: `${newHp}/${character.max_hp}`, 
                        inline: true 
                    },
                    { 
                        name: '📦 Remaining', 
                        value: `${removeResult.remaining}x ${itemName}`, 
                        inline: true 
                    }
                ])
                .setFooter({ text: 'Cross Realm Chronicles • Item Usage' })
                .setTimestamp();
            
            // Show level up information
            if (levelUpData.leveledUp) {
                embed.addFields([
                    { 
                        name: '🆙 LEVEL UP!', 
                        value: `You are now level ${levelUpData.newLevel}!\n` +
                               `+${levelUpData.hpGained} HP (${levelUpData.newStats.max_hp} total)\n` +
                               `+${levelUpData.atkGained} ATK (${levelUpData.newStats.atk} total)\n` +
                               `+${levelUpData.defGained} DEF (${levelUpData.newStats.def} total)\n` +
                               `+${levelUpData.spdGained} SPD (${levelUpData.newStats.spd} total)`, 
                        inline: false 
                    }
                ]);
            }
            
            // Show experience change if any
            if (newExp > character.experience) {
                embed.addFields([
                    { 
                        name: '📈 Experience', 
                        value: `${character.experience} → ${newExp} (+${newExp - character.experience})`, 
                        inline: true 
                    }
                ]);
            }
            
            // Show MP if changed
            if (newMp > (character.mp || 0)) {
                embed.addFields([
                    { 
                        name: '💙 Magic Points', 
                        value: `${character.mp || 0} → ${newMp} (+${newMp - (character.mp || 0)})`, 
                        inline: true 
                    }
                ]);
            }
            
            interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Use item error:', error);
            const embed = createEmbed('Use Item Error', 
                'An error occurred while using the item. Please try again.', 
                '#ff6b6b');
            interaction.reply({ embeds: [embed] });
        }
    }
};