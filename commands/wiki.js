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
            const category = interaction.options.getString('category');

            if (category) {
                // Show specific category menu
                const categoryMenu = getCategoryMenu(category);
                if (categoryMenu) {
                    await interaction.reply(categoryMenu);
                } else {
                    await interaction.reply({ 
                        content: '❌ Invalid category specified. Use `/wiki` without parameters to see all available categories.',
                        ephemeral: true 
                    });
                }
            } else {
                // Show main wiki overview
                const overview = getCategoryOverview();
                await interaction.reply(overview);
            }
        } catch (error) {
            console.error('Wiki command error:', error);

            // Check if interaction was already replied to
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ 
                    content: '❌ An error occurred while loading the wiki. Please try again.',
                    ephemeral: true 
                });
            }
        }
    },
};