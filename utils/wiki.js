const { EmbedBuilder } = require('discord.js');

const WIKI_SECTIONS = {
    gettingStarted: {
        title: '🌟 Getting Started Guide',
        content: `**Welcome to Cross Realm Chronicles!**
        
This multiverse anime RPG lets you experience adventures from One Piece, Naruto, Jujutsu Kaisen, and Demon Slayer!

**First Steps:**
1. Use \`/create\` to create your character
2. Choose from 4 anime factions:
   • 🏴‍☠️ **One Piece Pirates** - Devil Fruit powers & treasure hunts
   • 🥷 **Naruto Shinobi** - Chakra techniques & village missions  
   • 👁️ **Jujutsu Sorcerers** - Cursed techniques & exorcism
   • ⚔️ **Demon Slayers** - Breathing styles & demon hunting

3. Use \`/profile\` to check your character stats
4. Start your first quest with \`/quest start\`

**Character Stats:**
• **Level** - Your overall power (starts at 1)
• **HP** - Health points for combat (100 base + 10 per level)
• **ATK** - Attack power (20 base + 2 per level)
• **DEF** - Defense against attacks (10 base + 1 per level)
• **SPD** - Speed for critical hits (15 base + 1 per level)
• **Experience** - Progress toward next level
• **Gold** - Currency for future features`,
        color: '#4f46e5'
    },

    combat: {
        title: '⚔️ Combat System Guide',
        content: `**Enemy Encounters:**
        
During quests, you have a **30% chance** to encounter enemies! Combat is turn-based and strategic.

**Combat Flow:**
1. **Enemy Appears** - Shows enemy stats and your options
2. **Your Turn** - Choose to Attack or Flee
3. **Enemy Turn** - If alive, enemy attacks back
4. **Repeat** - Until victory, defeat, or escape

**Combat Actions:**
• **⚔️ Attack** - Deal damage based on your ATK vs enemy DEF
• **🏃 Flee** - Escape safely but get reduced rewards (50% XP, 30% coins)

**Combat Mechanics:**
• **Critical Hits** - Higher SPD gives better crit chance
• **Damage Formula** - Your ATK minus enemy DEF (minimum 1)
• **Level Scaling** - Enemies match your level for balanced fights

**Combat Outcomes:**
• **Victory** - Get quest rewards + combat bonus XP/coins
• **Defeat** - Lose the fight but gain 5 learning XP, HP restored to 1
• **Flee** - Safe escape with reduced quest rewards

**Tips:**
• Combat rewards are worth the risk!
• Level up to face stronger enemies
• Each enemy type has unique stats and rewards`,
        color: '#dc2626'
    },

    quests: {
        title: '🗺️ Quest System Guide',
        content: `**Phase 1 Universal Quests:**
        
All factions can participate in these beginner-friendly quests!

**Quest Categories:**
• **🏃 Physical** - Strength and endurance challenges
• **🧠 Mental** - Puzzles and strategy tests  
• **🎭 Social** - Interaction and persuasion tasks
• **🔍 Investigation** - Mystery solving and research
• **🎯 Skill** - Technique and precision challenges

**Quest Mechanics:**
• **Success Rate** - Higher level = better success chance
• **Base Rate**: 60% + (level × 2%)
• **Level 1**: 62% success rate
• **Level 10**: 80% success rate
• **Level 20**: 100% success rate

**Quest Rewards:**
• **Experience Points** - 8-15 XP per quest
• **Gold Coins** - 5-12 coins per quest
• **Bonus Items** - Special rewards on success
• **Combat Bonus** - Extra rewards if you defeat enemies

**Quest Types Examples:**
• Deliver urgent messages across town
• Solve mysterious disappearances
• Test your skills in competitions
• Help local merchants with problems
• Investigate strange phenomena`,
        color: '#059669'
    },

    leveling: {
        title: '📈 Level Progression Guide',
        content: `**Experience & Leveling:**
        
Level up to become stronger and unlock new content!

**XP Requirements:**
• **Level 1 → 2**: 100 XP
• **Level 2 → 3**: 200 XP  
• **Level 3 → 4**: 300 XP
• **Pattern**: Each level needs (level × 100) XP

**Level Up Bonuses:**
• **+10 HP** (and +10 Max HP)
• **+2 ATK** (attack power)
• **+1 DEF** (defense)
• **+1 SPD** (speed/critical chance)

**Benefits of Leveling:**
• Higher quest success rates
• Face stronger enemies for better rewards
• Future content will have level requirements
• Better stats for combat survival

**XP Sources:**
• **Quest Success**: 8-15 XP
• **Quest Failure**: 3-7 XP (reduced)
• **Combat Victory**: Bonus XP from enemies
• **Combat Defeat**: 5 learning XP
• **Flee from Combat**: Reduced quest XP

**Progress Tracking:**
Use \`/profile\` to see:
• Current level and XP
• XP needed for next level  
• Progress percentage
• All your combat stats`,
        color: '#7c3aed'
    },

    factions: {
        title: '🏴‍☠️ Faction Details Guide',
        content: `**Choose Your Anime Universe:**

**🏴‍☠️ One Piece Pirates**
• **Theme**: Treasure hunting and sea adventures
• **Abilities**: Devil Fruit powers (Paramecia, Logia, Zoan)
• **Style**: Bold, adventurous, freedom-loving
• **Future Content**: Ship battles, treasure maps, crew building

**🥷 Naruto Shinobi**  
• **Theme**: Village missions and ninja techniques
• **Abilities**: Chakra Nature (Fire, Water, Earth, Air, Lightning)
• **Style**: Strategic, honorable, team-focused
• **Future Content**: Jutsu learning, village ranks, team missions

**👁️ Jujutsu Sorcerers**
• **Theme**: Exorcising curses and protecting people  
• **Abilities**: Cursed Techniques (unique supernatural powers)
• **Style**: Modern, intense, duty-driven
• **Future Content**: Domain expansions, curse hunting, school missions

**⚔️ Demon Slayers**
• **Theme**: Hunting demons and protecting humanity
• **Abilities**: Breathing Styles (Water, Flame, Stone, Wind, Thunder, etc.)
• **Style**: Traditional, disciplined, protective
• **Future Content**: Breathing mastery, demon hunting ranks, corp missions

**Faction Benefits:**
• Each faction will have unique quest types
• Special abilities and power progression
• Faction-specific storylines and content
• Different combat styles and techniques

**Current Status:**
Phase 1 quests are universal, but faction-specific content is coming in future updates!`,
        color: '#ea580c'
    },

    commands: {
        title: '💻 Commands Reference',
        content: `**Essential Commands:**

**Character Management:**
• \`/create\` - Create your character and choose faction
• \`/profile\` - View character stats, level, and progress

**Quest System:**
• \`/quest start\` - Begin a random Phase 1 quest
• More quest options coming in future updates!

**Information:**
• \`/help\` - Show basic help information
• \`/help wiki\` - Access this detailed wiki system

**Combat:**
• Combat uses button interactions during quests
• **⚔️ Attack** - Fight the enemy
• **🏃 Flee** - Escape combat safely

**Tips for Commands:**
• All commands use Discord's slash command system
• Type \`/\` to see available commands
• Commands are case-sensitive
• Most commands work in any channel where the bot has permissions

**Future Commands:**
• \`/inventory\` - Manage items and equipment
• \`/shop\` - Buy items with gold
• \`/pvp\` - Player vs player combat
• \`/guild\` - Join or create guilds with other players`,
        color: '#0891b2'
    }
};

function createWikiEmbed(section) {
    if (!WIKI_SECTIONS[section]) {
        return new EmbedBuilder()
            .setColor('#ef4444')
            .setTitle('❌ Wiki Section Not Found')
            .setDescription('Available sections: gettingStarted, combat, quests, leveling, factions, commands')
            .setTimestamp();
    }

    const wikiSection = WIKI_SECTIONS[section];
    return new EmbedBuilder()
        .setColor(wikiSection.color)
        .setTitle(wikiSection.title)
        .setDescription(wikiSection.content)
        .setFooter({ text: 'Cross Realm Chronicles Wiki • Use /help wiki [section] for specific guides' })
        .setTimestamp();
}

function getWikiSectionsList() {
    return `**📚 Available Wiki Sections:**

• \`gettingStarted\` - New player setup and basics
• \`combat\` - Enemy encounters and turn-based fighting
• \`quests\` - Quest system and rewards
• \`leveling\` - XP system and character progression  
• \`factions\` - Detailed faction information
• \`commands\` - Complete command reference

**Usage:** \`/help wiki [section]\`
**Example:** \`/help wiki combat\``;
}

module.exports = {
    createWikiEmbed,
    getWikiSectionsList,
    WIKI_SECTIONS
};