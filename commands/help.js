const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Quick start guide for new players'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#00d4aa')
            .setTitle('🎮 Cross Realm Chronicles - Beginner Guide')
            .setDescription('**New to Cross Realm Chronicles? Start here!**\n\nThis is your quick start guide. Use `/wiki` for detailed game mechanics.')
            .addFields([
                {
                    name: '🚀 Getting Started (3 Easy Steps)',
                    value: '**1.** `/create <faction>` - Pick your anime faction and create your character\n**2.** `/quest` - Go on your first adventure to earn XP and gold\n**3.** `/profile` - Check your progress and see how strong you\'ve become!',
                    inline: false
                },
                {
                    name: '🌟 Choose Your Faction',
                    value: '🏴‍☠️ **one_piece** - Adventure-loving pirates with treasure hunting skills\n🥷 **naruto** - Stealthy shinobi with chakra techniques\n👁️ **jujutsu_kaisen** - Powerful sorcerers with cursed energy\n⚔️ **demon_slayer** - Skilled warriors with breathing techniques',
                    inline: false
                },
                {
                    name: '⚡ Essential Commands',
                    value: '`/quest` - Start adventures to level up\n`/inventory` - See what items you have\n`/use <item>` - Use potions and tools\n`/profile` - View your character stats',
                    inline: true
                },
                {
                    name: '📱 Quick Tips',
                    value: '• Each faction is good at different quest types\n• Use items to heal and boost your character\n• Combat can happen during quests - be ready!\n• Level up to unlock new faction abilities',
                    inline: true
                },
                {
                    name: '🆘 Need More Help?',
                    value: '**For detailed guides:** `/wiki`\n**Getting started:** `/wiki category:getting_started`\n**Faction details:** `/wiki category:factions`\n**Combat help:** `/wiki category:combat`',
                    inline: false
                },
                {
                    name: '🎯 Your First Goal',
                    value: 'Create a character, complete 3-5 quests, and reach level 3 to unlock your first faction ability. Good luck, adventurer!',
                    inline: false
                }
            ])
            .setFooter({ text: 'Cross Realm Chronicles • Use /wiki for in-depth game mechanics' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};