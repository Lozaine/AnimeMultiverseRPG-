const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { createWikiEmbed, getWikiSectionsList } = require('../utils/wiki');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show help information and available commands')
        .addStringOption(option =>
            option.setName('wiki')
                .setDescription('Access detailed wiki guides')
                .setRequired(false)
                .addChoices(
                    { name: '📚 Wiki Home', value: 'home' },
                    { name: '🌟 Getting Started', value: 'gettingStarted' },
                    { name: '⚔️ Combat System', value: 'combat' },
                    { name: '🗺️ Quest System', value: 'quests' },
                    { name: '📈 Level Progression', value: 'leveling' },
                    { name: '🏴‍☠️ Faction Details', value: 'factions' },
                    { name: '💻 Commands Reference', value: 'commands' }
                )),
    async execute(interaction) {
        const wikiOption = interaction.options.getString('wiki');
        
        if (wikiOption) {
            if (wikiOption === 'home') {
                // Show wiki section list
                const embed = new EmbedBuilder()
                    .setColor('#4f46e5')
                    .setTitle('📚 Cross Realm Chronicles Wiki')
                    .setDescription(getWikiSectionsList())
                    .setFooter({ text: 'Cross Realm Chronicles • Detailed guides for every aspect of the game' })
                    .setTimestamp();
                
                return interaction.reply({ embeds: [embed] });
            } else {
                // Show specific wiki section
                const wikiEmbed = createWikiEmbed(wikiOption);
                return interaction.reply({ embeds: [wikiEmbed] });
            }
        }
        
        // Default/basic help command
        const embed = new EmbedBuilder()
            .setColor('#4f46e5')
            .setTitle('⚔️ Cross Realm Chronicles - Help')
            .setDescription('Welcome to the multiverse anime RPG! Choose your faction and embark on epic adventures with combat encounters!')
            .addFields([
                {
                    name: '🌟 Getting Started',
                    value: '`/create` - Create your character and choose a faction\n`/profile` - View your character stats and progress',
                    inline: false
                },
                {
                    name: '⚔️ Adventure & Combat',
                    value: '`/quest start` - Start a random Phase 1 quest\n• **30% chance** of enemy encounters during quests!\n• Turn-based combat with Attack/Flee options\n• Defeat enemies for bonus rewards!',
                    inline: false
                },
                {
                    name: '🏴‍☠️ Available Factions',
                    value: '**🏴‍☠️ One Piece Pirates** - Devil Fruit powers\n**🥷 Naruto Shinobi** - Chakra techniques\n**👁️ Jujutsu Sorcerers** - Cursed techniques\n**⚔️ Demon Slayers** - Breathing styles',
                    inline: false
                },
                {
                    name: '🎮 How to Play',
                    value: '• Create a character with `/create`\n• Start quests to gain XP and gold\n• Fight enemies in turn-based combat\n• Level up to increase your combat stats\n• Higher levels = better quest success rates!',
                    inline: false
                },
                {
                    name: '📚 Detailed Guides',
                    value: '`/help wiki` - Access comprehensive guides\n`/help wiki combat` - Learn combat system\n`/help wiki gettingStarted` - New player guide\n`/help wiki leveling` - Level progression info',
                    inline: false
                },
                {
                    name: '💡 Combat Tips',
                    value: '• Combat gives bonus XP and gold when you win\n• Flee if low on health to avoid defeat\n• Enemies scale to your level for fair fights\n• Speed affects critical hit chances',
                    inline: false
                }
            ])
            .setFooter({ text: 'Cross Realm Chronicles • Use /help wiki for detailed guides' })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
};
