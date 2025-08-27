const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { getCharacter, updateCharacterProgress } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { getRandomPhase1Quest, calculatePhase1SuccessRate, rollForItem } = require('../utils/quests');
const { createEmbed } = require('../utils/embeds');
const { checkLevelUp } = require('../utils/levelProgression');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quest')
        .setDescription('Start a Phase 1 universal quest')
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Start a random Phase 1 quest')),
    
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

            const subcommand = interaction.options.getSubcommand();
            
            if (subcommand === 'start') {
                // Get a random Phase 1 quest
                const quest = getRandomPhase1Quest();
                const faction = FACTIONS[character.faction];
                
                // Calculate success rate based on character level
                const successRate = calculatePhase1SuccessRate(character.level);
                const success = Math.random() < successRate;
                
                // Base rewards
                let xpGained = quest.xpReward;
                let coinsGained = quest.coinReward;
                let itemReceived = null;
                
                if (success) {
                    // Roll for bonus item
                    itemReceived = rollForItem(quest, character.level);
                    
                    // Successful quest - full rewards
                    const newExp = character.experience + xpGained;
                    const newGold = character.gold + coinsGained;
                    
                    // Handle extra coin pouch item
                    if (itemReceived && itemReceived.type === 'currency') {
                        coinsGained += 10; // Extra coins from coin pouch
                    }
                    
                    // Handle XP boost token
                    if (itemReceived && itemReceived.type === 'boost') {
                        xpGained += 3; // Bonus XP
                    }
                    
                    const finalNewExp = character.experience + xpGained;
                    const finalNewGold = character.gold + coinsGained;
                    
                    // Check for level up
                    const levelUpData = checkLevelUp(character.level, character.experience, finalNewExp);
                    
                    // Update character with new stats if leveled up
                    if (levelUpData.leveledUp) {
                        await updateCharacterProgress(
                            userId, 
                            finalNewExp, 
                            finalNewGold, 
                            levelUpData.newLevel,
                            levelUpData.newStats.hp,
                            levelUpData.newStats.maxHp,
                            levelUpData.newStats.atk,
                            levelUpData.newStats.def,
                            levelUpData.newStats.spd,
                            finalNewExp
                        );
                    } else {
                        await updateCharacterProgress(userId, finalNewExp, finalNewGold, character.level);
                    }
                    
                    // Create success embed
                    const embed = new EmbedBuilder()
                        .setColor('#f39c12')
                        .setTitle('🎯 Quest Complete!')
                        .setDescription(quest.successMessage)
                        .addFields([
                            { name: '📜 Quest', value: `${quest.name} ${getCategoryEmoji(quest.category)}`, inline: false },
                            { 
                                name: '📊 Rewards', 
                                value: `+${xpGained} XP\\n+${coinsGained} Coins${itemReceived ? `\\n${itemReceived.name} (${itemReceived.description})` : ''}`, 
                                inline: false 
                            },
                            { 
                                name: '🧑‍🎤 Progress', 
                                value: `Level: ${character.level}${levelUpData.leveledUp ? ` → ${levelUpData.newLevel}` : ''}\\nXP: ${finalNewExp} / ${levelUpData.leveledUp ? levelUpData.newLevel * 100 : character.level * 100}\\nCoins: ${finalNewGold}`, 
                                inline: false 
                            }
                        ])
                        .setFooter({ text: 'Cross Realm Chronicles – Phase 1 Quest System' })
                        .setTimestamp();
                        
                    if (levelUpData.leveledUp) {
                        embed.addFields([
                            { 
                                name: '🆙 LEVEL UP!', 
                                value: `You are now level ${levelUpData.newLevel}!\\n` +
                                       `+${levelUpData.hpGained} HP (${levelUpData.newStats.maxHp} total)\\n` +
                                       `+${levelUpData.atkGained} ATK (${levelUpData.newStats.atk} total)\\n` +
                                       `+${levelUpData.defGained} DEF (${levelUpData.newStats.def} total)\\n` +
                                       `+${levelUpData.spdGained} SPD (${levelUpData.newStats.spd} total)`, 
                                inline: false 
                            }
                        ]);
                    }
                    
                    return interaction.reply({ embeds: [embed] });
                    
                } else {
                    // Quest failed - reduced rewards
                    const reducedXP = Math.floor(xpGained * 0.5);
                    const reducedCoins = Math.floor(coinsGained * 0.3);
                    
                    const newExp = character.experience + reducedXP;
                    const newGold = character.gold + reducedCoins;
                    
                    // Check for level up (unlikely with reduced XP)
                    const levelUpData = checkLevelUp(character.level, character.experience, newExp);
                    
                    // Update character
                    if (levelUpData.leveledUp) {
                        await updateCharacterProgress(
                            userId, 
                            newExp, 
                            newGold, 
                            levelUpData.newLevel,
                            levelUpData.newStats.hp,
                            levelUpData.newStats.maxHp,
                            levelUpData.newStats.atk,
                            levelUpData.newStats.def,
                            levelUpData.newStats.spd,
                            newExp
                        );
                    } else {
                        await updateCharacterProgress(userId, newExp, newGold, character.level);
                    }
                    
                    // Create failure embed
                    const embed = new EmbedBuilder()
                        .setColor('#e74c3c')
                        .setTitle('💥 Quest Challenging!')
                        .setDescription(quest.failureMessage || 'The quest didn\'t go perfectly, but you gained some experience.')
                        .addFields([
                            { name: '📜 Quest', value: `${quest.name} ${getCategoryEmoji(quest.category)}`, inline: false },
                            { 
                                name: '📊 Partial Rewards', 
                                value: `+${reducedXP} XP\\n+${reducedCoins} Coins`, 
                                inline: false 
                            },
                            { 
                                name: '🧑‍🎤 Progress', 
                                value: `Level: ${character.level}${levelUpData.leveledUp ? ` → ${levelUpData.newLevel}` : ''}\\nXP: ${newExp} / ${levelUpData.leveledUp ? levelUpData.newLevel * 100 : character.level * 100}\\nCoins: ${newGold}`, 
                                inline: false 
                            }
                        ])
                        .setFooter({ text: 'Don\'t give up! Try another quest to improve your skills.' })
                        .setTimestamp();
                        
                    if (levelUpData.leveledUp) {
                        embed.addFields([
                            { 
                                name: '🆙 LEVEL UP!', 
                                value: `You are now level ${levelUpData.newLevel}!\\n` +
                                       `+${levelUpData.hpGained} HP (${levelUpData.newStats.maxHp} total)\\n` +
                                       `+${levelUpData.atkGained} ATK (${levelUpData.newStats.atk} total)\\n` +
                                       `+${levelUpData.defGained} DEF (${levelUpData.newStats.def} total)\\n` +
                                       `+${levelUpData.spdGained} SPD (${levelUpData.newStats.spd} total)`, 
                                inline: false 
                            }
                        ]);
                    }
                    
                    return interaction.reply({ embeds: [embed] });
                }
            }
            
        } catch (error) {
            console.error('Quest command error:', error);
            const embed = createEmbed('Quest Error', 
                'An error occurred while processing the quest. Please try again.', 
                '#ff6b6b');
            return interaction.reply({ embeds: [embed] });
        }
    }
};

// Helper function to get category emoji
function getCategoryEmoji(category) {
    const categoryEmojis = {
        'gathering': '🌿',
        'hunting': '🐗',
        'protection': '🛡️',
        'delivery': '📦',
        'errand': '📝',
        'community': '🏘️',
        'training': '⚔️'
    };
    return categoryEmojis[category] || '⭐';
}