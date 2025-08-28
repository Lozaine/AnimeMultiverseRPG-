const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('User guide and command index for Cross Realm Chronicles'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#4f46e5')
            .setTitle('📖 Cross Realm Chronicles - Player Manual')
            .setDescription('Your essential guide to commands and basic gameplay. Use `/wiki` for detailed game mechanics!')
            .addFields([
                {
                    name: '🚀 Essential Commands',
                    value: '`/create` - Create your character and choose a faction\n`/profile` - View your character stats and progress\n`/quest start` - Begin your adventure with quests\n`/inventory` - View your collected items\n`/use <item>` - Consume items for healing and effects',
                    inline: false
                },
                {
                    name: '🎮 Quick Start Guide',
                    value: '1️⃣ Create a character with `/create`\n2️⃣ Choose your anime faction (One Piece, Naruto, etc.)\n3️⃣ Start quests with `/quest start`\n4️⃣ Fight enemies and collect items\n5️⃣ Level up and get stronger!',
                    inline: false
                },
                {
                    name: '⚔️ Combat Basics',
                    value: '• 30% chance of enemy encounters during quests\n• Choose **Attack** to fight or **Flee** to escape\n• Victory gives bonus XP and rewards\n• Defeat restores you to 1 HP with small learning XP',
                    inline: false
                },
                {
                    name: '🏴‍☠️ Available Factions',
                    value: '**🏴‍☠️ One Piece Pirates** - Devil Fruit powers\n**🥷 Naruto Shinobi** - Chakra techniques\n**👁️ Jujutsu Sorcerers** - Cursed techniques\n**⚔️ Demon Slayers** - Breathing styles',
                    inline: false
                },
                {
                    name: '📦 Inventory System',
                    value: '• Collect items from quests and combat\n• Store up to 100 items total\n• Use consumables to heal and gain bonuses\n• Items stack automatically for easy management',
                    inline: false
                },
                {
                    name: '📚 Need More Info?',
                    value: 'Use `/wiki` to access the complete game encyclopedia with detailed guides on combat, leveling, factions, and more!',
                    inline: false
                }
            ])
            .setFooter({ text: 'Cross Realm Chronicles • New to the game? Start with /create!' })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
};
