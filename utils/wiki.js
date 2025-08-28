// Cross Realm Chronicles Wiki System
// Comprehensive documentation and help system for the Discord RPG Bot

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const WIKI_CATEGORIES = {
    getting_started: {
        title: '🚀 Getting Started',
        description: 'New to Cross Realm Chronicles? Start here!',
        sections: [
            {
                name: 'Creating Your Character',
                content: `**Character Creation Guide**

Use \`/create <faction> [character_name]\` to begin your journey in Cross Realm Chronicles!

**📋 Faction Selection Process:**
When creating your character, you'll choose from four distinct anime universes, each offering unique gameplay experiences:

🏴‍☠️ **One Piece Pirates** 
- **Philosophy:** Freedom, adventure, and the pursuit of dreams
- **Playstyle:** Exploration-focused with treasure hunting mechanics
- **Special Features:** Devil Fruit powers, crew dynamics, and naval adventures
- **Starting Benefits:** +5 HP, +3 ATK, +2 DEF, +5 SPD
- **Unique Mechanics:** Pirate's Intuition (+15% item find, +10% crit chance)

🥷 **Naruto Shinobi**
- **Philosophy:** Protecting your village and mastering ninja arts
- **Playstyle:** Balanced approach with stealth and tactical advantages
- **Special Features:** Chakra manipulation, elemental jutsu, and clan abilities
- **Starting Benefits:** +4 HP, +4 ATK, +3 DEF, +8 SPD
- **Unique Mechanics:** Basic Chakra Control (+3 all stats, +20% stealth)

👁️ **Jujutsu Sorcerers**
- **Philosophy:** Exorcising curses and protecting humanity from supernatural threats
- **Playstyle:** High-risk, high-reward combat with powerful techniques
- **Special Features:** Cursed energy manipulation, domain expansion, reverse techniques
- **Starting Benefits:** +3 HP, +6 ATK, +4 DEF, +6 SPD
- **Unique Mechanics:** Cursed Energy Manipulation (+25% vs cursed enemies)

⚔️ **Demon Slayers**
- **Philosophy:** Dedication to protecting humanity through swordsmanship mastery
- **Playstyle:** Combat-focused with disciplined training progression
- **Special Features:** Breathing techniques, enhanced blade techniques, demon detection
- **Starting Benefits:** +6 HP, +7 ATK, +5 DEF, +4 SPD
- **Unique Mechanics:** Basic Breathing Technique (+4 ATK, +3 DEF, +15% stamina)

**🎭 Character Naming System:**
- **Custom Names:** Create unique character identities separate from Discord usernames
- **Examples:** \`/create one_piece "Monkey D. Adventure"\`, \`/create naruto "Shadow Clone Master"\`
- **Default Option:** Omit character name to use your Discord username
- **Name Rules:** Can include spaces, special characters, and up to 32 characters
- **Immersion Factor:** Your character name appears in all game interactions and profiles

**⚡ Post-Creation Tips:**
- Your faction choice is permanent - choose wisely based on your preferred playstyle
- Starting equipment and abilities are immediately available after creation
- Each faction has different XP and reward multipliers for various quest types
- You can view detailed faction information anytime with \`/wiki category:factions\`
- Your character begins at Level 1 with 100 XP needed to reach Level 2`
            },
            {
                name: 'Your First Quest Adventure',
                content: `**The Quest System - Your Path to Power**

After character creation, the quest system becomes your primary avenue for growth, rewards, and adventure. Understanding how quests work is crucial for optimal progression.

**🎯 Quest Mechanics Deep Dive:**

**Quest Generation System:**
- Quests are dynamically generated based on your character level, faction, and game progression
- Each quest attempt costs no resources but has a time commitment representing the adventure
- Success rates vary based on your stats, faction bonuses, and quest difficulty
- Higher-level characters unlock more challenging and rewarding quest types

**📊 Quest Categories Explained:**

🌿 **Gathering Quests** - Resource Collection Adventures
- **Objective:** Collect herbs, minerals, magical components, and rare materials
- **Difficulty:** Low to Medium risk, consistent rewards
- **Best For:** One Piece Pirates (treasure hunting instincts), steady income generation
- **Rewards:** Crafting materials, moderate XP (50-150), reliable gold (20-60)
- **Special Features:** Chance for rare material discoveries, environmental interaction

⚔️ **Hunting Quests** - Combat-Focused Missions
- **Objective:** Track and eliminate dangerous creatures, monsters, or threats
- **Difficulty:** Medium to High risk, high XP potential
- **Best For:** Demon Slayers and Jujutsu Sorcerers (combat specialists)
- **Rewards:** High XP (100-300), combat experience, rare equipment drops
- **Special Features:** Guaranteed enemy encounters, skill development opportunities

📦 **Delivery Quests** - Transportation Missions
- **Objective:** Transport items, messages, or people across distances safely
- **Difficulty:** Low to Medium risk, time-sensitive completion
- **Best For:** Naruto Shinobi (speed and stealth) and One Piece Pirates (navigation)
- **Rewards:** Consistent XP (75-200), relationship building, travel experience
- **Special Features:** Potential ambush encounters, reputation system integration

🛡️ **Protection Quests** - Guardian Missions
- **Objective:** Defend locations, escort travelers, or guard important events
- **Difficulty:** Medium risk, strategic thinking required
- **Best For:** All factions (especially Naruto Shinobi and Demon Slayers)
- **Rewards:** High XP (120-250), community standing, defensive skill development
- **Special Features:** Wave-based challenges, tactical decision points

🏋️ **Training Quests** - Skill Development Missions
- **Objective:** Practice techniques, spar with masters, or undergo trials
- **Difficulty:** Controlled risk, personal growth focused
- **Best For:** All factions (especially beneficial for ability unlocking)
- **Rewards:** Massive XP bonuses (150-400), stat improvements, ability prerequisites
- **Special Features:** Faction-specific training, mastery progression tracking

🏘️ **Community Quests** - Social Service Missions
- **Objective:** Help local communities with various needs and problems
- **Difficulty:** Low risk, relationship and reputation focused
- **Best For:** Demon Slayers (community protection ethos)
- **Rewards:** Community reputation, steady income, social connections
- **Special Features:** Unlocks special community-based rewards and recognition

📋 **Errand Quests** - Simple Task Missions
- **Objective:** Complete straightforward tasks and odd jobs
- **Difficulty:** Very low risk, quick completion
- **Best For:** All factions (reliable income source)
- **Rewards:** Quick XP (25-100), immediate gold, task completion satisfaction
- **Special Features:** Fast turnaround, no combat risk, beginner-friendly

**🎮 Your First Quest Strategy:**
1. **Start Simple:** Begin with Errand or Gathering quests to understand mechanics
2. **Faction Focus:** Choose quest types that align with your faction's bonuses
3. **Risk Management:** Balance safe quests with challenging ones for optimal growth
4. **Equipment Check:** Use items from your starting equipment to enhance success rates
5. **Experience Tracking:** Monitor XP gains to plan your leveling progression efficiently`
            },
            {
                name: 'Essential Commands Mastery',
                content: `**Complete Command Reference for New Players**

Understanding and mastering the command system is essential for effective gameplay in Cross Realm Chronicles. Each command serves specific purposes and has advanced features worth exploring.

**🔧 Core Gameplay Commands:**

**\`/profile\` - Character Information Hub**
- **Primary Function:** Displays comprehensive character statistics and progression
- **Information Shown:** Level, XP progress, HP/ATK/DEF/SPD stats, faction details
- **Advanced Features:** Shows completed quest count, faction-specific attributes, level-up progress
- **Pro Tips:** Use regularly to track stat growth and plan progression strategies
- **Hidden Details:** Reveals faction ability unlock requirements and progression milestones

**\`/inventory\` - Item Management Center**
- **Primary Function:** Complete overview of all owned items and equipment
- **Organization:** Items grouped by type (consumables, equipment, quest items, rare materials)
- **Advanced Features:** Quantity tracking, item descriptions, usage suggestions
- **Pro Tips:** Regular inventory management prevents item overflow and optimizes storage
- **Strategic Use:** Plan item usage based on upcoming quests and current needs

**\`/use <item> [quantity]\` - Item Consumption System**
- **Primary Function:** Activate consumable items for immediate effects
- **Advanced Usage:** Specify quantities for bulk consumption (\`/use Health Potion 3\`)
- **Auto-Complete:** Start typing item names for intelligent suggestions from your inventory
- **Effect Stacking:** Multiple items can be used in succession for cumulative benefits
- **Pro Tips:** Save powerful items for challenging quests, use basic items for regular maintenance
- **Emergency Usage:** Keep healing items ready for post-combat recovery

**\`/quest\` - Adventure Initiation System**
- **Primary Function:** Start new quest adventures for XP, gold, and item rewards
- **Quest Selection:** System automatically selects appropriate quests based on your level and faction
- **Faction Bonuses:** Receive enhanced rewards for quest types aligned with your faction
- **Risk Assessment:** Each quest displays difficulty and potential rewards before acceptance
- **Pro Tips:** Vary quest types to maximize different faction bonuses and experience variety
- **Advanced Strategy:** Plan quest sequences to optimize XP gain and resource accumulation

**\`/reset\` - Character Reset Function**
- **Primary Function:** Completely restart your character progression (PERMANENT ACTION)
- **Warning System:** Requires explicit confirmation to prevent accidental resets
- **Complete Deletion:** Removes all progress, items, stats, and faction abilities
- **Use Cases:** Starting over with different faction, correcting early game mistakes
- **Important Note:** This action cannot be undone - consider carefully before using
- **Alternative:** Contact support for specific issues before resorting to full reset

**🎯 Command Usage Strategy:**
1. **Daily Routine:** Check \`/profile\` → \`/inventory\` → \`/quest\` for optimal progression flow
2. **Item Management:** Use \`/inventory\` before and after quests to track gains and plan usage
3. **Resource Optimization:** Use \`/use\` strategically before difficult quests for stat boosts
4. **Progress Tracking:** Regular \`/profile\` checks help identify when to focus on specific quest types
5. **Safety First:** Never use \`/reset\` without careful consideration and understanding of consequences

**💡 Advanced Command Tips:**
- Commands work in any channel where the bot has permissions
- Most commands provide helpful error messages if used incorrectly
- Tab completion works for command parameters in most Discord clients
- Commands process immediately but quest results may involve combat encounters
- All commands are logged for progress tracking and support purposes`
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

// Function to create wiki embed with navigation
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
            text: `Page ${sectionIndex + 1}/${cat.sections.length} | Cross Realm Chronicles Wiki` 
        })
        .setTimestamp();

    return embed;
}

// Function to create navigation components
function createWikiNavigation(category, currentSection = 0) {
    const cat = WIKI_CATEGORIES[category];
    if (!cat) return [];

    const components = [];

    // Section selection dropdown
    if (cat.sections.length > 1) {
        const sectionOptions = cat.sections.map((section, index) => ({
            label: section.name,
            value: `wiki_section_${category}_${index}`,
            description: section.content.substring(0, 100).replace(/\*\*/g, '').trim() + '...',
            default: index === currentSection
        }));

        const sectionSelect = new StringSelectMenuBuilder()
            .setCustomId(`wiki_section_${category}`)
            .setPlaceholder('Select a section to read about...')
            .addOptions(sectionOptions);

        components.push(new ActionRowBuilder().addComponents(sectionSelect));
    }

    // Navigation buttons
    const buttons = [];
    
    // Previous section button
    if (currentSection > 0) {
        buttons.push(
            new ButtonBuilder()
                .setCustomId(`wiki_prev_${category}_${currentSection}`)
                .setLabel('◀ Previous')
                .setStyle(ButtonStyle.Secondary)
        );
    }

    // Back to category button
    buttons.push(
        new ButtonBuilder()
            .setCustomId(`wiki_category_${category}`)
            .setLabel('📚 Category Overview')
            .setStyle(ButtonStyle.Primary)
    );

    // Next section button
    if (currentSection < cat.sections.length - 1) {
        buttons.push(
            new ButtonBuilder()
                .setCustomId(`wiki_next_${category}_${currentSection}`)
                .setLabel('Next ▶')
                .setStyle(ButtonStyle.Secondary)
        );
    }

    // Main menu button
    buttons.push(
        new ButtonBuilder()
            .setCustomId('wiki_main_menu')
            .setLabel('🏠 Main Menu')
            .setStyle(ButtonStyle.Success)
    );

    if (buttons.length > 0) {
        components.push(new ActionRowBuilder().addComponents(buttons));
    }

    return components;
}

// Function to create category overview embed
function createCategoryOverviewEmbed(category) {
    const cat = WIKI_CATEGORIES[category];
    if (!cat) return null;

    let sectionList = cat.sections.map((section, index) => 
        `**${index + 1}.** ${section.name}\n*${section.content.substring(0, 80).replace(/\*\*/g, '').trim()}...*`
    ).join('\n\n');

    const embed = new EmbedBuilder()
        .setTitle(cat.title)
        .setDescription(`${cat.description}\n\n**Available Sections:**\n\n${sectionList}`)
        .setColor('#4a90e2')
        .setFooter({ text: 'Use the dropdown menu below to jump to any section' })
        .setTimestamp();

    return embed;
}

// Function to create category navigation
function createCategoryNavigation(category) {
    const cat = WIKI_CATEGORIES[category];
    if (!cat) return [];

    const components = [];

    // Section selection dropdown for category overview
    const sectionOptions = cat.sections.map((section, index) => ({
        label: section.name,
        value: `wiki_section_${category}_${index}`,
        description: section.content.substring(0, 100).replace(/\*\*/g, '').trim() + '...'
    }));

    const sectionSelect = new StringSelectMenuBuilder()
        .setCustomId(`wiki_section_${category}`)
        .setPlaceholder('Select a section to explore in detail...')
        .addOptions(sectionOptions);

    components.push(new ActionRowBuilder().addComponents(sectionSelect));

    // Main menu button
    const mainMenuButton = new ButtonBuilder()
        .setCustomId('wiki_main_menu')
        .setLabel('🏠 Back to Main Menu')
        .setStyle(ButtonStyle.Success);

    components.push(new ActionRowBuilder().addComponents(mainMenuButton));

    return components;
}

// Function to create main wiki menu embed
function createMainWikiEmbed() {
    let categoryList = Object.entries(WIKI_CATEGORIES).map(([key, cat]) => 
        `${cat.title}\n*${cat.description}*`
    ).join('\n\n');

    const embed = new EmbedBuilder()
        .setTitle('📚 Cross Realm Chronicles - Complete Game Encyclopedia')
        .setDescription(`Welcome to your comprehensive guide for mastering Cross Realm Chronicles! This wiki contains everything you need to become a legendary adventurer across the anime multiverse.\n\n**Available Categories:**\n\n${categoryList}\n\n*Select any category below to begin exploring detailed guides, strategies, and game mechanics.*`)
        .setColor('#4a90e2')
        .setFooter({ text: 'Cross Realm Chronicles Wiki • Your complete adventure companion' })
        .setTimestamp();

    return embed;
}

// Function to create main menu navigation
function createMainMenuNavigation() {
    const categoryOptions = Object.entries(WIKI_CATEGORIES).map(([key, cat]) => ({
        label: cat.title.replace(/[^\w\s]/g, '').trim(),
        value: `wiki_category_${key}`,
        description: cat.description,
        emoji: cat.title.split(' ')[0] // Extract emoji from title
    }));

    const categorySelect = new StringSelectMenuBuilder()
        .setCustomId('wiki_main_categories')
        .setPlaceholder('🔍 Choose a category to explore...')
        .addOptions(categoryOptions);

    return [new ActionRowBuilder().addComponents(categorySelect)];
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
    createWikiNavigation,
    createCategoryOverviewEmbed,
    createCategoryNavigation,
    createMainWikiEmbed,
    createMainMenuNavigation,
    getCategoryKeys,
    getCategoryInfo
};