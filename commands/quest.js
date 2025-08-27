const { EmbedBuilder } = require('discord.js');
const { getCharacter, updateCharacterProgress, completeQuest } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { generateQuest, QUESTS } = require('../utils/quests');
const { createEmbed } = require('../utils/embeds');

module.exports = {
    name: 'quest',
    description: 'Start a faction-specific quest or view available quests',
    async execute(message, args) {
        const userId = message.author.id;
        
        try {
            const character = await getCharacter(userId);
            
            if (!character) {
                const embed = createEmbed('No Character Found', 
                    'You don\'t have a character yet! Use `!create` to create one.', 
                    '#ff6b6b');
                return message.reply({ embeds: [embed] });
            }

            const faction = FACTIONS[character.faction];
            
            // If no subcommand, show available quests
            if (!args[0]) {
                const questList = QUESTS[character.faction].map((quest, index) => {
                    const levelReq = quest.levelRequirement > character.level ? 
                        `❌ (Level ${quest.levelRequirement} required)` : 
                        `✅ Available`;
                    return `**${index + 1}. ${quest.name}**\n${quest.description}\n**Reward:** ${quest.reward.experience} XP, ${quest.reward.gold} Gold\n**Status:** ${levelReq}`;
                }).join('\n\n');

                const embed = new EmbedBuilder()
                    .setColor(faction.color)
                    .setTitle(`${faction.emoji} Available Quests`)
                    .setDescription(`Choose a quest for your ${faction.name} character:\n\n${questList}\n\nUse: \`!quest start [quest_number]\``)
                    .setFooter({ text: 'Complete quests to gain experience and gold!' });
                
                return message.reply({ embeds: [embed] });
            }

            // Handle quest start
            if (args[0] === 'start') {
                const questChoice = parseInt(args[1]);
                const availableQuests = QUESTS[character.faction];
                
                if (isNaN(questChoice) || questChoice < 1 || questChoice > availableQuests.length) {
                    const embed = createEmbed('Invalid Quest', 
                        `Please choose a valid quest number (1-${availableQuests.length})`, 
                        '#ff6b6b');
                    return message.reply({ embeds: [embed] });
                }

                const selectedQuest = availableQuests[questChoice - 1];
                
                // Check level requirement
                if (character.level < selectedQuest.levelRequirement) {
                    const embed = createEmbed('Level Too Low', 
                        `You need to be level ${selectedQuest.levelRequirement} to attempt this quest. You are currently level ${character.level}.`, 
                        '#ff6b6b');
                    return message.reply({ embeds: [embed] });
                }

                // Check if quest already completed
                const completedQuests = character.completed_quests ? character.completed_quests.split(',') : [];
                const questId = `${character.faction}_${questChoice - 1}`;
                
                if (completedQuests.includes(questId)) {
                    const embed = createEmbed('Quest Already Completed', 
                        'You have already completed this quest!', 
                        '#ff6b6b');
                    return message.reply({ embeds: [embed] });
                }

                // Simulate quest completion (simple success rate based on level)
                const successRate = Math.min(0.7 + (character.level * 0.05), 0.95);
                const success = Math.random() < successRate;

                if (success) {
                    // Quest successful
                    const newExp = character.experience + selectedQuest.reward.experience;
                    const newGold = character.gold + selectedQuest.reward.gold;
                    let newLevel = character.level;
                    
                    // Check for level up
                    const expNeeded = newLevel * 100;
                    if (newExp >= expNeeded) {
                        newLevel++;
                    }

                    // Update character
                    await updateCharacterProgress(userId, newExp, newGold, newLevel);
                    await completeQuest(userId, questId);

                    const embed = new EmbedBuilder()
                        .setColor('#00ff00')
                        .setTitle('🎉 Quest Completed Successfully!')
                        .setDescription(`**${selectedQuest.name}**\n${selectedQuest.successMessage}`)
                        .addFields([
                            { name: '💰 Gold Earned', value: selectedQuest.reward.gold.toString(), inline: true },
                            { name: '⭐ Experience Gained', value: selectedQuest.reward.experience.toString(), inline: true },
                            { name: '📊 Total Experience', value: newExp.toString(), inline: true }
                        ]);

                    if (newLevel > character.level) {
                        embed.addFields([{ name: '🆙 LEVEL UP!', value: `You are now level ${newLevel}!`, inline: false }]);
                    }

                    message.reply({ embeds: [embed] });
                } else {
                    // Quest failed
                    const embed = new EmbedBuilder()
                        .setColor('#ff6b6b')
                        .setTitle('💥 Quest Failed!')
                        .setDescription(`**${selectedQuest.name}**\n${selectedQuest.failureMessage || 'You failed to complete the quest. Train harder and try again!'}`)
                        .setFooter({ text: 'Don\'t give up! Try again when you\'re stronger.' });

                    message.reply({ embeds: [embed] });
                }
            }

        } catch (error) {
            console.error('Quest command error:', error);
            const embed = createEmbed('Quest Error', 
                'An error occurred while processing the quest. Please try again.', 
                '#ff6b6b');
            message.reply({ embeds: [embed] });
        }
    }
};
