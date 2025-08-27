const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show help information and available commands'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#4f46e5')
            .setTitle('⚔️ Cross Realm Chronicles - Help')
            .setDescription('Welcome to the multiverse anime RPG! Choose your faction and embark on epic adventures.')
            .addFields([
                {
                    name: '🌟 Getting Started',
                    value: '`/create` - Create your character and choose a faction\n`/profile` - View your character information',
                    inline: false
                },
                {
                    name: '⚔️ Adventure Commands',
                    value: '`/quest list` - View available quests\n`/quest start` - Start a specific quest',
                    inline: false
                },
                {
                    name: '🏴‍☠️ Available Factions',
                    value: '**1. One Piece Pirates** 🏴‍☠️\n**2. Naruto Shinobi** 🥷\n**3. Jujutsu Sorcerers** 👁️\n**4. Demon Slayers** ⚔️',
                    inline: false
                },
                {
                    name: '🎮 How to Play',
                    value: '• Create a character with `/create`\n• Choose your faction for unique abilities\n• Complete quests to gain experience and gold\n• Level up to unlock harder quests\n• Each faction has unique perks and abilities!',
                    inline: false
                },
                {
                    name: '💡 Tips',
                    value: '• Higher level characters have better quest success rates\n• Each faction has different quest types\n• Complete quests to unlock special abilities\n• Check your profile regularly to track progress',
                    inline: false
                }
            ])
            .setFooter({ text: 'Cross Realm Chronicles • Multiverse Anime RPG' })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
};
