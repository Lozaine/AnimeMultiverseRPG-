const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getCharacter, deleteCharacterData } = require('../database/database');
const { createEmbed } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('⚠️ PERMANENTLY delete your character and all data'),
    
    async execute(interaction) {
        const userId = interaction.user.id;
        
        try {
            // Check if user has a character
            const character = await getCharacter(userId);
            
            if (!character) {
                const embed = createEmbed('No Character Found', 
                    'You don\'t have a character to reset! Use `/create` to create one.', 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }
            
            // Create confirmation embed
            const confirmEmbed = new EmbedBuilder()
                .setColor('#ff6b6b')
                .setTitle('⚠️ CHARACTER RESET CONFIRMATION')
                .setDescription('**THIS ACTION CANNOT BE UNDONE!**\n\nYou are about to permanently delete:')
                .addFields([
                    { 
                        name: '🗑️ What will be deleted:', 
                        value: `• Character: **${character.name}** (Level ${character.level})\n` +
                               `• Faction: **${character.faction}**\n` +
                               `• All progress (${character.experience} XP, ${character.gold} Gold)\n` +
                               `• All stats (HP, ATK, DEF, SPD)\n` +
                               `• Complete inventory\n` +
                               `• All quest progress\n` +
                               `• **EVERYTHING will be permanently lost**`,
                        inline: false 
                    },
                    { 
                        name: '⚡ After reset:', 
                        value: 'You will need to use `/create` to start over completely.',
                        inline: false 
                    }
                ])
                .setFooter({ text: 'Cross Realm Chronicles • Character Reset' })
                .setTimestamp();
            
            // Create confirmation buttons
            const confirmButton = new ButtonBuilder()
                .setCustomId(`reset_confirm_${userId}`)
                .setLabel('🗑️ YES, DELETE EVERYTHING')
                .setStyle(ButtonStyle.Danger);
            
            const cancelButton = new ButtonBuilder()
                .setCustomId(`reset_cancel_${userId}`)
                .setLabel('❌ Cancel')
                .setStyle(ButtonStyle.Secondary);
            
            const row = new ActionRowBuilder()
                .addComponents(confirmButton, cancelButton);
            
            await interaction.reply({ 
                embeds: [confirmEmbed], 
                components: [row],
                ephemeral: true 
            });
            
        } catch (error) {
            console.error('Reset command error:', error);
            const embed = createEmbed('Reset Error', 
                'An error occurred while processing the reset request. Please try again.', 
                '#ff6b6b');
            interaction.reply({ embeds: [embed] });
        }
    },
    
    async handleButtonInteraction(interaction) {
        const customId = interaction.customId;
        
        // Check if this is a reset button and if the user is authorized
        if (!customId.startsWith('reset_')) return false;
        
        const [action, type, authorizedUserId] = customId.split('_');
        
        if (interaction.user.id !== authorizedUserId) {
            const embed = createEmbed('❌ Unauthorized', 
                'You can only reset your own character!', 
                '#ff6b6b');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        
        try {
            if (type === 'confirm') {
                // Perform the reset
                const result = await deleteCharacterData(authorizedUserId);
                
                if (result.success && result.deletedCharacter) {
                    const successEmbed = new EmbedBuilder()
                        .setColor('#00ff00')
                        .setTitle('✅ Character Reset Complete')
                        .setDescription('Your character and all data have been permanently deleted.')
                        .addFields([
                            { 
                                name: '🎮 Start Fresh', 
                                value: 'Use `/create` to create a new character and begin your journey again!',
                                inline: false 
                            }
                        ])
                        .setFooter({ text: 'Cross Realm Chronicles • Fresh Start' })
                        .setTimestamp();
                    
                    await interaction.update({ 
                        embeds: [successEmbed], 
                        components: [] 
                    });
                } else {
                    const embed = createEmbed('Reset Error', 
                        'Failed to delete character data. Please try again.', 
                        '#ff6b6b');
                    await interaction.update({ 
                        embeds: [embed], 
                        components: [] 
                    });
                }
                
            } else if (type === 'cancel') {
                const cancelEmbed = new EmbedBuilder()
                    .setColor('#6b7280')
                    .setTitle('❌ Reset Cancelled')
                    .setDescription('Your character data is safe. No changes were made.')
                    .setFooter({ text: 'Cross Realm Chronicles • Reset Cancelled' })
                    .setTimestamp();
                
                await interaction.update({ 
                    embeds: [cancelEmbed], 
                    components: [] 
                });
            }
            
            return true;
            
        } catch (error) {
            console.error('Reset button interaction error:', error);
            const embed = createEmbed('Reset Error', 
                'An error occurred while processing the reset. Please try again.', 
                '#ff6b6b');
            await interaction.update({ 
                embeds: [embed], 
                components: [] 
            });
            return true;
        }
    }
};