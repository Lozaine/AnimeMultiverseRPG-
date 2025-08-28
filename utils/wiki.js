// Cross Realm Chronicles Wiki System
// Comprehensive documentation and help system for the Discord RPG Bot

const { EmbedBuilder } = require('discord.js');

const WIKI_CATEGORIES = {
    getting_started: {
        title: '🚀 Getting Started',
        description: 'New to Cross Realm Chronicles? Start here!',
        sections: [
            {
                name: 'Creating Your Character',
                content: `Use \`/create <faction> [character_name]\` to begin your adventure!

**Available Factions:**
🏴‍☠️ **One Piece Pirates** - Adventure, treasure hunting, and Devil Fruit powers
🥷 **Naruto Shinobi** - Stealth, chakra techniques, and village protection  
👁️ **Jujutsu Sorcerers** - Cursed energy, domain expansion, and supernatural combat
⚔️ **Demon Slayers** - Breathing techniques, swordsmanship, and demon hunting

**Character Names:**
- You can specify a custom character name or use your Discord username
- Example: \`/create naruto Hokage_Warrior\` or just \`/create naruto\``
            },
            {
                name: 'Your First Quest',
                content: `After creating your character, use \`/quest\` to see available missions.

**Quest Categories:**
• **Gathering** - Collect resources and materials
• **Hunting** - Combat encounters and monster battles  
• **Delivery** - Transport items and messages
• **Protection** - Guard locations and people
• **Training** - Improve your skills and abilities
• **Community** - Help local communities
• **Errand** - Simple tasks and odd jobs`
            },
            {
                name: 'Basic Commands',
                content: `**Essential Commands:**
\`/profile\` - View your character stats and progress
\`/inventory\` - Check your items and equipment
\`/use <item>\` - Use consumable items for effects
\`/quest\` - Start new quests and adventures
\`/reset\` - Reset your character (WARNING: Permanent!)`
            }
        ]
    },
    factions: {
        title: '⚡ Faction Guide',
        description: 'Master your chosen faction\'s unique abilities and playstyle',
        sections: [
            {
                name: '🏴‍☠️ One Piece Pirates',
                content: `**Theme:** Adventure, Freedom, Treasure Hunting
**Starting Ability:** Pirate's Intuition (+15% item find rate, +10% crit chance)

**Stat Bonuses:** +5 HP, +3 ATK, +2 DEF, +5 SPD
**Best Quest Types:** Gathering, Delivery, Hunting

**Progressive Abilities:**
• **Lv 3:** Sea Legs - Immunity to water debuffs
• **Lv 7:** Treasure Sense - Enhanced item discovery
• **Lv 12:** Haki Awakening - Observation and Armament Haki
• **Lv 18:** Devil Fruit Resonance - Enhanced Devil Fruit powers
• **Lv 25:** Conqueror's Will - Intimidate weaker enemies

**Starting Equipment:**
🗡️ Cutlass, 🧥 Pirate Coat, 🧭 Navigator's Compass
🍖 Sea King Meat (2x), 🗺️ Treasure Map Fragment (1x)`
            },
            {
                name: '🥷 Naruto Shinobi',
                content: `**Theme:** Stealth, Ninjutsu, Village Protection
**Starting Ability:** Basic Chakra Control (+3 all stats, +20% stealth success)

**Stat Bonuses:** +4 HP, +4 ATK, +3 DEF, +8 SPD
**Best Quest Types:** Protection, Training, Delivery

**Progressive Abilities:**
• **Lv 4:** Shadow Clone Technique - Double training XP
• **Lv 8:** Elemental Affinity - Master Fire/Water/Earth/Wind/Lightning
• **Lv 13:** Advanced Ninjutsu - Enhanced stealth and jutsu combinations
• **Lv 19:** Sage Mode Training - +35% all combat stats
• **Lv 28:** Tailed Beast Partnership - Massive power boost

**Starting Equipment:**
🗡️ Kunai Set, 🥋 Ninja Gear, 📜 Chakra Paper
💊 Soldier Pill (3x), 💨 Smoke Bomb (2x)`
            },
            {
                name: '👁️ Jujutsu Sorcerers',
                content: `**Theme:** Supernatural Combat, Cursed Energy, Exorcism  
**Starting Ability:** Cursed Energy Manipulation (+25% vs cursed enemies)

**Stat Bonuses:** +3 HP, +6 ATK, +4 DEF, +6 SPD
**Best Quest Types:** Hunting, Protection, Training

**Progressive Abilities:**
• **Lv 5:** Cursed Technique Development - Unique personal ability
• **Lv 9:** Reverse Cursed Technique - Healing and curse removal
• **Lv 15:** Simple Domain - Defensive barrier technique
• **Lv 22:** Domain Expansion - Personal domain space
• **Lv 30:** Maximum Technique - Ultimate technique mastery

**Starting Equipment:**
⚔️ Cursed Tool (Basic), 👔 Sorcerer Uniform, 👁️ Cursed Energy Detector
💉 Cursed Energy Serum (2x), 🛡️ Protective Charm (1x)`
            },
            {
                name: '⚔️ Demon Slayers',
                content: `**Theme:** Swordsmanship, Breathing Techniques, Demon Hunting
**Starting Ability:** Basic Breathing Technique (+4 ATK, +3 DEF, +15% stamina)

**Stat Bonuses:** +6 HP, +7 ATK, +5 DEF, +4 SPD  
**Best Quest Types:** Hunting, Training, Protection

**Progressive Abilities:**
• **Lv 4:** Breathing Style Mastery - Choose Water/Thunder/Flame/Stone/Wind
• **Lv 8:** Enhanced Blade Techniques - Advanced swordsmanship
• **Lv 14:** Demon Slayer Mark - +50% all physical stats
• **Lv 20:** See-Through World - Enemy weakness detection
• **Lv 26:** Breathing Style Evolution - Create unique techniques

**Starting Equipment:**
⚔️ Nichirin Blade, 🥋 Demon Slayer Corps Uniform, 📿 Warding Charm
💊 Recovery Pill (2x), 🌅 Sunlight Essence (1x)`
            }
        ]
    },
    combat: {
        title: '⚔️ Combat Guide',
        description: 'Master the art of battle and enemy encounters',
        sections: [
            {
                name: 'Combat Basics',
                content: `**Combat Stats:**
• **HP** - Your health points, lose all and you're defeated
• **ATK** - Attack power, determines damage dealt  
• **DEF** - Defense, reduces incoming damage
• **SPD** - Speed, affects dodge chance and turn order

**Critical Hits:**
Base 5% chance, increased by speed difference and combat style
Critical hits deal 150% damage`
            },
            {
                name: 'Enemy Types & Combat Styles',
                content: `**Enemy Combat Styles:**
🛡️ **Tank** - High HP/DEF, low SPD, powerful attacks
🏃 **Agile** - High SPD, low DEF, dodge-focused
⚔️ **Aggressive** - High ATK, rushdown tactics
🛡️ **Defensive** - High DEF, turtle-style combat
💨 **Evasive** - Extreme SPD, very low DEF
🐝 **Swarm** - Multiple weak attacks, numbers advantage
🎲 **Erratic** - Unpredictable, random variations
🏹 **Hit-and-Run** - Quick strikes then retreat

**Special Abilities:**
Many enemies have unique abilities with chance-based activation:
• Pack Howl, Web Shot, Tusked Charge, Phase, Confuse, and more!`
            },
            {
                name: 'Weaknesses & Resistances',
                content: `**Weakness System:**
Enemies have specific vulnerabilities that deal +30% damage
Examples: Fire vs Forest Goblin, Light vs Will-o'-Wisp

**Resistance System:**  
Some enemies resist certain damage types for -30% damage
Examples: Cave Spider resists poison, Training Dummy resists physical

**Enemy Categories:**
🌲 **Forest/Nature:** Goblins, Wolves, Spiders, Boars, Slimes
👥 **Humanoid:** Bandits, Merchants, Guards
✨ **Magical:** Will-o'-Wisps, Animated Scarecrows
🔧 **Constructed:** Golems, Automatons  
🦅 **Flying:** Bat Swarms, Carrion Crows`
            },
            {
                name: 'Enemy Encounter Rates',
                content: `**Base Rate:** 30% chance per quest
**Category Modifiers:**
• Hunting quests: +15% encounter rate
• Protection quests: +12% encounter rate  
• Training quests: +20% encounter rate
• Gathering quests: +5% encounter rate
• Community work: -8% encounter rate
• Simple errands: -5% encounter rate

**Level Scaling:** +2% encounter rate per level above 1
**Final Range:** 10% minimum, 55% maximum encounter rate`
            }
        ]
    },
    progression: {
        title: '📈 Character Progression',
        description: 'Level up, unlock abilities, and grow stronger',
        sections: [
            {
                name: 'Experience & Leveling',
                content: `**XP Requirements:**
• Level 1 → 2: 100 XP
• Level 2 → 3: 200 XP  
• Level 3 → 4: 300 XP
• Pattern: Each level requires (Level × 100) XP

**Level Up Bonuses:**
Every level up grants:
• +10 HP (and max HP)
• +2 ATK
• +1 DEF  
• +1 SPD

**XP Sources:**
• Quest completion (varies by faction affinity)
• Combat victories  
• Special achievements
• Using certain items (XP Potions, etc.)`
            },
            {
                name: 'Faction Abilities',
                content: `**Unlocking Abilities:**
Faction abilities require both level AND specific unlock conditions:

**Unlock Conditions Examples:**
• Complete specific numbers of quest types
• Win certain numbers of combat encounters
• Reach relationship milestones
• Discover rare items or locations
• Demonstrate mastery of previous abilities

**Ability Effects:**
• Stat bonuses and multipliers
• New combat options and techniques  
• Enhanced success rates for activities
• Unique mechanics like healing, intimidation
• Access to advanced equipment and items`
            },
            {
                name: 'Item Usage & Effects',
                content: `**Item Types:**
🍖 **HP Recovery** - Restore health points
💙 **MP Recovery** - Restore magic/chakra/cursed energy  
⭐ **XP Boost** - Gain experience points
💰 **Gold** - Increase your wealth
🛡️ **Buffs** - Temporary stat increases
💨 **Utility** - Escape combat, stealth bonuses

**Using Items:**
\`/use <item_name> [quantity]\`
Items with multiple effects apply all benefits simultaneously
Some items trigger level ups if you gain enough XP!`
            },
            {
                name: 'Gold & Economy',
                content: `**Earning Gold:**
• Quest completion rewards
• Combat victory bonuses  
• Faction-specific multipliers
• Special treasure discoveries
• Item usage effects

**Future Gold Uses:**
• Equipment upgrades and purchases
• Faction-specific items and tools
• Training accelerators
• Special quest unlocks
• Marketplace trading (planned)`
            }
        ]
    },
    quests: {
        title: '🎯 Quest System',
        description: 'Embark on adventures and complete missions',
        sections: [
            {
                name: 'Quest Categories',
                content: `**🌿 Gathering Quests**
Collect herbs, minerals, and resources
• Good for: One Piece Pirates (treasure hunting)
• Rewards: Materials, moderate XP, good gold

**⚔️ Hunting Quests**  
Battle monsters and dangerous creatures
• Good for: Demon Slayers, Jujutsu Sorcerers
• Rewards: High XP, combat experience, rare materials

**📦 Delivery Quests**
Transport items and messages across distances  
• Good for: Naruto Shinobi, One Piece Pirates
• Rewards: Good XP, reliable gold, reputation

**🛡️ Protection Quests**
Guard locations, escort travelers, defend settlements
• Good for: Naruto Shinobi, Demon Slayers
• Rewards: High XP, community standing, equipment

**🏋️ Training Quests**
Practice techniques and improve abilities
• Good for: All factions (especially Naruto)
• Rewards: Massive XP bonuses, ability progress

**🏘️ Community Quests**
Help local communities with various needs
• Good for: Demon Slayers, some factions
• Rewards: Community reputation, steady rewards

**📋 Errand Quests**
Simple tasks and odd jobs
• Good for: All factions (reliable income)
• Rewards: Quick completion, steady gold`
            },
            {
                name: 'Faction Quest Bonuses',
                content: `**One Piece Pirates:**
• Gathering: +20% XP, +40% coins, +25% items
• Delivery: +30% XP, +20% coins, +10% items
• Community: -20% XP, -10% coins (outsiders)

**Naruto Shinobi:**
• Protection: +40% XP, +30% coins, +20% items  
• Training: +50% XP, +30% items (mission specialists)
• Delivery: +30% XP, +10% coins (excellent messengers)

**Jujutsu Sorcerers:**
• Hunting: +40% XP, +20% coins, +30% items
• Training: +30% XP, +40% items (technique development)
• Community: -10% XP, -20% coins (secretive)

**Demon Slayers:**
• Hunting: +50% XP, +30% coins, +40% items
• Training: +40% XP, +30% items (intensive culture)  
• Protection: +20% XP, +10% coins, +20% items`
            },
            {
                name: 'Enemy Encounters in Quests',
                content: `**When Enemies Appear:**
Encounters can happen during any quest based on:
• Quest category (hunting = more fights)
• Your character level (higher = more encounters)
• Random chance with category modifiers

**Enemy Scaling:**
Enemies scale to your level with combat style bonuses:
• Tank enemies get more HP and DEF
• Agile enemies get more SPD  
• Aggressive enemies get more ATK
• Defensive enemies get more DEF

**Combat Rewards:**
• Bonus XP for victory
• Additional gold from defeated enemies
• Possible rare item drops
• Progress toward faction ability unlocks`
            }
        ]
    },
    items: {
        title: '🎒 Items & Inventory',
        description: 'Manage your equipment and consumables',
        sections: [
            {
                name: 'Using Items',
                content: `**Item Usage Command:**
\`/use <item_name> [quantity]\`

**Auto-Complete:**
The bot will suggest items from your inventory as you type
Works with partial names and fuzzy matching

**Multiple Effects:**
Many items provide multiple benefits:
• **Health Potions:** Restore HP + MP
• **XP Items:** Grant experience + stat boosts  
• **Combat Items:** Attack bonus + critical chance
• **Utility Items:** Multiple situational effects

**Quantity Usage:**
Specify how many to use: \`/use Health Potion 3\`
Default is 1 if no quantity specified`
            },
            {
                name: 'Item Categories',
                content: `**💊 Consumables**
Single-use items that provide immediate benefits
• Health/MP restoration
• XP and stat boosts
• Combat enhancers
• Utility effects

**⚔️ Equipment** (Future)
Permanent gear that modifies your stats
• Weapons for attack bonuses
• Armor for defense increases  
• Accessories for special effects
• Faction-specific equipment

**🎁 Quest Items**
Special items obtained from quests
• Story progression items
• Rare materials and components
• Faction ability unlock requirements
• Trading and crafting materials

**💎 Rare Items**
Legendary equipment and consumables
• Unique stat combinations
• Powerful special effects
• Faction-exclusive benefits
• Achievement rewards`
            },
            {
                name: 'Starting Equipment by Faction',
                content: `**🏴‍☠️ One Piece Pirates:**
• 🗡️ Cutlass (weapon)  
• 🧥 Pirate Coat (armor)
• 🧭 Navigator's Compass (accessory)
• 🍖 Sea King Meat - 15 HP (2x)
• 🗺️ Treasure Map Fragment (1x)

**🥷 Naruto Shinobi:**
• 🗡️ Kunai Set (weapon)
• 🥋 Ninja Gear (armor)  
• 📜 Chakra Paper (accessory)
• 💊 Soldier Pill - 10 HP + stamina (3x)
• 💨 Smoke Bomb - escape combat (2x)

**👁️ Jujutsu Sorcerers:**
• ⚔️ Cursed Tool Basic (weapon)
• 👔 Sorcerer Uniform (armor)
• 👁️ Cursed Energy Detector (accessory)  
• 💉 Cursed Energy Serum (2x)
• 🛡️ Protective Charm - reduce curse damage (1x)

**⚔️ Demon Slayers:**
• ⚔️ Nichirin Blade (weapon)
• 🥋 Demon Slayer Corps Uniform (armor)
• 📿 Warding Charm (accessory)
• 💊 Recovery Pill - 20 HP over time (2x)  
• 🌅 Sunlight Essence - extra demon damage (1x)`
            }
        ]
    },
    commands: {
        title: '💻 Command Reference',
        description: 'Complete list of all available bot commands',
        sections: [
            {
                name: 'Character Management',
                content: `**\`/create <faction> [character_name]\`**
Create a new character in your chosen faction
• **faction:** one_piece, naruto, jujutsu_kaisen, demon_slayer
• **character_name:** Optional custom name (uses Discord name if not specified)

**\`/profile\`**
View your character stats, level, and progress
• Shows HP, ATK, DEF, SPD, XP progress
• Displays faction info and completed quests  
• Shows faction-specific attributes

**\`/reset\`**
Permanently delete your character and start over
• **WARNING:** This action cannot be undone!
• Requires confirmation button click
• Clears all progress, stats, and items`
            },
            {
                name: 'Gameplay Commands',
                content: `**\`/quest\`**
Start a random quest based on your level and faction
• Faction bonuses apply to rewards
• Enemy encounters possible during quests
• Various quest categories available

**\`/inventory\`**
View all your items and equipment  
• Shows consumables with quantities
• Displays equipment and gear
• Lists special and quest items

**\`/use <item> [quantity]\`**
Use consumable items from your inventory
• Auto-complete suggests available items
• Specify quantity or default to 1
• Multiple effects possible per item`
            },
            {
                name: 'Information Commands',
                content: `**\`/wiki [category]\`**
Access this comprehensive help system
• **getting_started** - New player guide
• **factions** - Detailed faction information
• **combat** - Battle mechanics and enemies  
• **progression** - Leveling and abilities
• **quests** - Quest system guide
• **items** - Inventory and item management
• **commands** - This command reference

**Command Tips:**
• All commands work in any Discord channel where the bot is present
• Use tab completion for faster command entry
• Most commands provide helpful error messages if something goes wrong`
            }
        ]
    }
};

// Function to create wiki embed
function createWikiEmbed(category, sectionIndex = 0) {
    const cat = WIKI_CATEGORIES[category];
    if (!cat) return null;

    const section = cat.sections[sectionIndex];
    if (!section) return null;

    const embed = new EmbedBuilder()
        .setTitle(`${cat.title} - ${section.name}`)
        .setDescription(section.content)
        .setColor('#4a90e2')
        .setFooter({ 
            text: `Page ${sectionIndex + 1}/${cat.sections.length} | Use /wiki ${category} to navigate` 
        })
        .setTimestamp();

    return embed;
}

// Function to create category overview embed
function createCategoryOverviewEmbed(category) {
    const cat = WIKI_CATEGORIES[category];
    if (!cat) return null;

    let sectionList = cat.sections.map((section, index) => 
        `**${index + 1}.** ${section.name}`
    ).join('\n');

    const embed = new EmbedBuilder()
        .setTitle(cat.title)
        .setDescription(`${cat.description}\n\n**Sections:**\n${sectionList}`)
        .setColor('#4a90e2')
        .setFooter({ text: 'Use the buttons below to navigate sections' })
        .setTimestamp();

    return embed;
}

// Function to create main wiki menu embed
function createMainWikiEmbed() {
    let categoryList = Object.entries(WIKI_CATEGORIES).map(([key, cat]) => 
        `${cat.title} - ${cat.description}`
    ).join('\n\n');

    const embed = new EmbedBuilder()
        .setTitle('📚 Cross Realm Chronicles Wiki')
        .setDescription(`Welcome to the comprehensive guide for Cross Realm Chronicles!\n\n**Categories:**\n\n${categoryList}`)
        .setColor('#4a90e2')
        .setFooter({ text: 'Use /wiki <category> to explore specific topics' })
        .setTimestamp();

    return embed;
}

// Function to get all category keys
function getCategoryKeys() {
    return Object.keys(WIKI_CATEGORIES);
}

// Function to get category info
function getCategoryInfo(category) {
    return WIKI_CATEGORIES[category] || null;
}

module.exports = {
    WIKI_CATEGORIES,
    createWikiEmbed,
    createCategoryOverviewEmbed, 
    createMainWikiEmbed,
    getCategoryKeys,
    getCategoryInfo
};