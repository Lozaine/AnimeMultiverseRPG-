const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { createWikiEmbed, getWikiSectionsList } = require('../utils/wiki');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Access the Cross Realm Chronicles game encyclopedia')
        .addStringOption(option =>
            option.setName('section')
                .setDescription('Choose a wiki section to view')
                .setRequired(false)
                .addChoices(
                    { name: '🌟 Getting Started', value: 'gettingStarted' },
                    { name: '⚔️ Combat System', value: 'combat' },
                    { name: '🗺️ Quest System', value: 'quests' },
                    { name: '📈 Level Progression', value: 'leveling' },
                    { name: '🏴‍☠️ Faction Details', value: 'factions' },
                    { name: '💻 Commands Reference', value: 'commands' },
                    { name: '📦 Inventory & Items', value: 'inventory' }
                )),
    async execute(interaction) {
        const section = interaction.options.getString('section');
        
        if (section) {
            // Show specific wiki section
            const wikiEmbed = createWikiEmbed(section);
            return interaction.reply({ embeds: [wikiEmbed] });
        }
        
        // Default wiki home - show section list
        const embed = new EmbedBuilder()
            .setColor('#4f46e5')
            .setTitle('📚 Cross Realm Chronicles Wiki')
            .setDescription('**Welcome to the complete game encyclopedia!**\n\nChoose a section below to learn everything about the game mechanics, or use `/wiki section:<topic>` for quick access.')
            .addFields([
                {
                    name: '📖 Available Sections',
                    value: getWikiSectionsList(),
                    inline: false
                },
                {
                    name: '🎯 Quick Access',
                    value: '`/wiki section:gettingStarted` - New player guide\n`/wiki section:combat` - Learn combat mechanics\n`/wiki section:quests` - Quest system explained\n`/wiki section:leveling` - Level progression info\n`/wiki section:factions` - Detailed faction guides\n`/wiki section:inventory` - Items and inventory management',
                    inline: false
                },
                {
                    name: '💡 Pro Tip',
                    value: 'Use `/help` for basic commands and quick references. Use `/wiki` when you want to understand the deeper mechanics!',
                    inline: false
                }
            ])
            .setFooter({ text: 'Cross Realm Chronicles • Your complete game encyclopedia' })
            .setTimestamp();
        
        interaction.reply({ embeds: [embed] });
    }
};