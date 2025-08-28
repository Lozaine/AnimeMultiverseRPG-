const { SlashCommandBuilder } = require('discord.js');
const { getCategoryOverview, getCategoryMenu, getSectionContent } = require('../utils/wiki.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Access the comprehensive Cross Realm Chronicles game guide')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Choose a specific wiki category to view')
                .setRequired(false)
                .addChoices(
                    { name: '🚀 Getting Started', value: 'getting_started' },
                    { name: '⚡ Faction Guide', value: 'factions' },
                    { name: '⚔️ Combat Guide', value: 'combat' },
                    { name: '📈 Character Progression', value: 'progression' },
                    { name: '🎯 Quest System', value: 'quests' },
                    { name: '🎒 Items & Inventory', value: 'items' },
                    { name: '💻 Command Reference', value: 'commands' }
                )
        ),
    async execute(interaction) {
        try {
            // Check if interaction is still valid and not expired
            if (interaction.replied || interaction.deferred) {
                return;
            }

            const category = interaction.options.getString('category');

            if (category) {
                // Show specific category menu
                const categoryMenu = getCategoryMenu(category);
                if (categoryMenu) {
                    await interaction.reply(categoryMenu);
                } else {
                    await interaction.reply({ 
                        content: '❌ Invalid category specified. Use `/wiki` without parameters to see all available categories.',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
            } else {
                // Show main wiki overview
                const overview = getCategoryOverview();
                if (overview) {
                    await interaction.reply(overview);
                } else {
                    await interaction.reply({
                        content: '❌ Wiki system is currently unavailable. Please try again later.',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
            }
        } catch (error) {
            console.error('Wiki command error:', error);

            // Only try to reply if we haven't already responded and interaction is still valid
            try {
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({ 
                        content: '❌ An error occurred while loading the wiki. Please try again.',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
            } catch (replyError) {
                console.error('Failed to send error reply:', replyError);
            }
        }
    },
};