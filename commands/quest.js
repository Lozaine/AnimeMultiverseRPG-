const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getCharacter, updateCharacterProgress, completeQuest } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { generateQuest, QUESTS } = require('../utils/quests');
const { createEmbed } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quest')
        .setDescription('Start a faction-specific quest or view available quests')
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('View available quests for your faction'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Start a specific quest')
                .addIntegerOption(option =>
                    option.setName('number')
                        .setDescription('Quest number to start')
                        .setRequired(true)
                        .setMinValue(1)
                        .setMaxValue(10))),
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

            const faction = FACTIONS[character.faction];
            
            const subcommand = interaction.options.getSubcommand();
            
            // Handle quest list
            if (subcommand === 'list') {
                const questList = QUESTS[character.faction].map((quest, index) => {
                    const levelReq = quest.levelRequirement > character.level ? 
                        `❌ (Level ${quest.levelRequirement} required)` : 
                        `✅ Available`;
                    return `**${index + 1}. ${quest.name}**\n${quest.description}\n**Reward:** ${quest.reward.experience} XP, ${quest.reward.gold} Gold\n**Status:** ${levelReq}`;
                }).join('\n\n');

                const embed = new EmbedBuilder()
                    .setColor(faction.color)
                    .setTitle(`${faction.emoji} Available Quests`)
                    .setDescription(`Choose a quest for your ${faction.name} character:\n\n${questList}`)
                    .setFooter({ text: 'Click a button to start a quest!' });

                // Create quest selection buttons
                const buttons = [];
                for (let i = 0; i < Math.min(QUESTS[character.faction].length, 5); i++) {
                    const quest = QUESTS[character.faction][i];
                    const isAvailable = character.level >= quest.levelRequirement;
                    buttons.push(
                        new ButtonBuilder()
                            .setCustomId(`quest_${i + 1}`)
                            .setLabel(`${i + 1}. ${quest.name.substring(0, 20)}`)
                            .setStyle(isAvailable ? ButtonStyle.Primary : ButtonStyle.Secondary)
                            .setDisabled(!isAvailable)
                    );
                }

                const row = new ActionRowBuilder().addComponents(buttons);
                
                return interaction.reply({ embeds: [embed], components: [row] });
            }

            // Handle quest start
            if (subcommand === 'start') {
                const questChoice = interaction.options.getInteger('number');
                const availableQuests = QUESTS[character.faction];
                
                if (questChoice < 1 || questChoice > availableQuests.length) {
                    const embed = createEmbed('Invalid Quest', 
                        `Please choose a valid quest number (1-${availableQuests.length})`, 
                        '#ff6b6b');
                    return interaction.reply({ embeds: [embed] });
                }

                const selectedQuest = availableQuests[questChoice - 1];
                
                // Check level requirement
                if (character.level < selectedQuest.levelRequirement) {
                    const embed = createEmbed('Level Too Low', 
                        `You need to be level ${selectedQuest.levelRequirement} to attempt this quest. You are currently level ${character.level}.`, 
                        '#ff6b6b');
                    return interaction.reply({ embeds: [embed] });
                }

                // Quests are now repeatable - removed completion check

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

                    // Add repeat and back buttons
                    const actionRow = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`repeat_quest_${questChoice}`)
                                .setLabel('🔄 Repeat Quest')
                                .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                                .setCustomId('quest_back')
                                .setLabel('⬅️ Back to Quest List')
                                .setStyle(ButtonStyle.Secondary)
                        );

                    interaction.reply({ embeds: [embed], components: [actionRow] });
                } else {
                    // Quest failed
                    const embed = new EmbedBuilder()
                        .setColor('#ff6b6b')
                        .setTitle('💥 Quest Failed!')
                        .setDescription(`**${selectedQuest.name}**\n${selectedQuest.failureMessage || 'You failed to complete the quest. Train harder and try again!'}`)
                        .setFooter({ text: 'Don\'t give up! Try again when you\'re stronger.' });

                    // Add retry and back buttons
                    const actionRow = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`repeat_quest_${questChoice}`)
                                .setLabel('🔄 Try Again')
                                .setStyle(ButtonStyle.Danger),
                            new ButtonBuilder()
                                .setCustomId('quest_back')
                                .setLabel('⬅️ Back to Quest List')
                                .setStyle(ButtonStyle.Secondary)
                        );

                    interaction.reply({ embeds: [embed], components: [actionRow] });
                }
            }

        } catch (error) {
            console.error('Quest command error:', error);
            const embed = createEmbed('Quest Error', 
                'An error occurred while processing the quest. Please try again.', 
                '#ff6b6b');
            interaction.reply({ embeds: [embed] });
        }
    }
};
