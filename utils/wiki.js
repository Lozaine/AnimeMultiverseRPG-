// Cross Realm Chronicles Wiki System
// Comprehensive in-depth documentation for advanced game mechanics

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const WIKI_CATEGORIES = {
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
🍖 Sea King Meat (2x), 🗺️ Treasure Map Fragment (1x)

**Advanced Mechanics:**
**Treasure Hunter's Instinct:** Pirates have a unique relationship with valuable items and hidden treasures. This manifests as:
- +15% base item discovery rate on all quests
- Special "treasure sense" during exploration quests
- Ability to detect hidden treasure caches in quest descriptions
- Enhanced critical hit rate (+10%) representing unpredictable fighting style

**Maritime Mastery:** Pirates excel in water-based environments and navigation:
- Complete immunity to water-based debuffs and environmental hazards
- Enhanced success rates on delivery quests involving sea travel
- Special naval combat bonuses when facing sea-based enemies

**Devil Fruit Compatibility:** As pirates progress, they develop compatibility with supernatural powers:
- Level 18+ unlocks Devil Fruit power integration
- Unique Devil Fruit abilities based on character personality and playstyle
- Trade-offs between different Devil Fruit categories (Paramecia, Zoan, Logia)
- Advanced users can "awaken" their Devil Fruit for exponential power growth`
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
💊 Soldier Pill (3x), 💨 Smoke Bomb (2x)

**Advanced Mechanics:**
**Chakra System:** Shinobi possess an internal energy system that affects all abilities:
- Chakra pool increases with level and determines technique usage
- Perfect chakra control grants +3 to all base stats
- Elemental chakra nature determines jutsu effectiveness
- Advanced practitioners can combine multiple elements

**Stealth and Infiltration:** Masters of covert operations:
- +20% base stealth success rate on all stealth-based activities
- Ability to avoid combat encounters through superior stealth
- Information gathering bonuses during protection and delivery quests
- Shadow Clone training allows double XP gain from training activities

**Village Loyalty System:** Shinobi strength comes from their village connections:
- Protection quest bonuses reflect duty to protect civilians
- Access to village-specific techniques and equipment
- Potential for promotion within village hierarchy
- Special collaboration bonuses when multiple shinobi work together

**Sage Arts Mastery:** High-level shinobi can tap into natural energy:
- Sage Mode grants +35% to all combat statistics
- Enhanced perception allows prediction of enemy attacks
- Natural energy manipulation for environmental advantages
- Risk/reward system - improper sage training can be dangerous`
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
💉 Cursed Energy Serum (2x), 🛡️ Protective Charm (1x)

**Advanced Mechanics:**
**Cursed Energy Fundamentals:** The core power system of all sorcerer abilities:
- Cursed energy is generated from negative emotions and spiritual pressure
- +25% damage bonus against cursed spirits and supernatural enemies
- Ability to see and interact with normally invisible cursed spirits
- Energy efficiency improves with level and training

**Cursed Technique Development:** Each sorcerer develops a unique supernatural ability:
- Personal cursed techniques reflect character personality and experiences
- Techniques evolve and grow stronger through practice and understanding
- Advanced practitioners can develop "Maximum" versions of their techniques
- Some techniques have hereditary or clan-based variations

**Domain Theory:** The pinnacle of jujutsu sorcery:
- Simple Domain creates basic defensive barriers
- Full Domain Expansion creates a personal reality space
- Inside a domain, the user's cursed technique becomes "sure-hit"
- Domain battles involve complex interactions between competing realities

**Reverse Cursed Technique:** Advanced healing and energy manipulation:
- Convert negative cursed energy into positive healing energy
- Remove curses and debuffs from self and allies
- Extremely difficult technique requiring precise energy control
- Masters can heal others and even reverse fatal injuries`
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
💊 Recovery Pill (2x), 🌅 Sunlight Essence (1x)

**Advanced Mechanics:**
**Breathing Technique Mastery:** The foundation of all Demon Slayer combat abilities:
- Precise breathing patterns enhance physical capabilities beyond human limits
- +4 ATK, +3 DEF, and +15% stamina efficiency from proper breathing
- Each breathing style has unique forms and combat applications
- Advanced practitioners can maintain enhanced breathing constantly

**Nichirin Blade Specialization:** Demon Slayers wield specially forged anti-demon weapons:
- Nichirin blades change color based on wielder's breathing style
- Enhanced effectiveness against supernatural and demonic enemies
- Blade techniques become more powerful with increased swordsmanship skill
- Master swordsmiths can create personalized blade variations

**Demon Slayer Mark System:** Physical manifestation of peak human potential:
- Appears as unique tattoo-like markings during intense combat
- +50% increase to all physical statistics while active
- Unlocks access to "See-Through World" enhanced perception
- Comes with significant physical costs and potential health risks

**Corps Structure and Mission System:** Demon Slayers operate within organized hierarchy:
- Mission assignments based on skill rank (Mizunoto to Hashira)
- Access to Corps resources, including specialized equipment and training
- Collaboration bonuses when working with other Corps members
- Special recognition system for exceptional demon-slaying achievements`
            }
        ]
    },
    combat: {
        title: '⚔️ Combat Guide',
        description: 'Master the art of battle and enemy encounters',
        sections: [
            {
                name: 'Combat Fundamentals',
                content: `**Core Combat Statistics:**

**HP (Health Points)** - Your life force and combat endurance
• Determines how much damage you can absorb before defeat
• Restored through rest, items, and certain faction abilities
• Some abilities and equipment can temporarily increase maximum HP
• Reaching 0 HP results in defeat but not permanent character loss

**ATK (Attack Power)** - Your offensive capability and damage output  
• Primary factor in determining damage dealt to enemies
• Enhanced by equipment, faction bonuses, and level progression
• Some enemies have resistances that reduce your effective ATK
• Critical hits multiply your ATK damage by 1.5x

**DEF (Defense Rating)** - Your ability to mitigate incoming damage
• Reduces damage received from enemy attacks
• High DEF can completely negate weak attacks
• Some enemy attacks bypass DEF through special abilities
• Defensive stances and abilities can temporarily boost DEF

**SPD (Speed Factor)** - Your agility and reaction time in combat
• Affects dodge chance and critical hit probability
• Determines combat turn order in complex battles
• High SPD difference can result in multiple attacks per turn
• Essential for certain advanced combat techniques

**Critical Hit Mechanics:**
• Base critical hit chance: 5% for all characters
• SPD differential bonus: +1% per 5 SPD difference over enemy
• Faction bonuses: Some factions have inherent crit bonuses
• Equipment effects: Certain items and abilities increase crit chance
• Critical hits deal 150% damage and cannot be reduced by enemy abilities

**Damage Calculation Formula:**
Base Damage = (ATK × Random Multiplier[0.8-1.2]) - Enemy DEF
Final Damage = Base Damage × Critical Multiplier × Weakness/Resistance Modifiers`
            },
            {
                name: 'Enemy Classification System',
                content: `**Combat Style Categories:**

🛡️ **Tank Enemies** - Defensive powerhouses
• High HP (150-300% normal) and DEF (+40% base defense)
• Low SPD (-30% base speed) making them predictable
• Powerful but infrequent attacks that can devastate unprepared opponents
• Strategy: Use hit-and-run tactics, focus on speed and critical hits

🏃 **Agile Enemies** - Speed demons and dodge specialists  
• High SPD (+50% base speed) and enhanced dodge rates
• Low DEF (-40% base defense) making them fragile when hit
• Multiple quick attacks per turn cycle
• Strategy: Tank their attacks and capitalize on their low defense

⚔️ **Aggressive Enemies** - Relentless attackers
• High ATK (+35% base attack) with enhanced critical hit rates
• Rushdown tactics focusing on overwhelming offense
• Moderate stats in other areas
• Strategy: Prioritize defense and counter-attack opportunities

🛡️ **Defensive Enemies** - Fortress-style opponents
• Extremely high DEF (+60% base defense) and damage reduction
• Turtle-like combat style with patient, methodical attacks
• Often possess damage reflection or retaliation abilities
• Strategy: Use armor-piercing abilities or outlast through superior resources

💨 **Evasive Enemies** - Masters of hit-and-run
• Extreme SPD (+70% base speed) with enhanced escape abilities
• Very low DEF (-50% base defense) but difficult to pin down
• Guerrilla warfare tactics with surprise attacks
• Strategy: Use area-of-effect abilities or predict their movement patterns

🐝 **Swarm Enemies** - Strength in numbers
• Multiple entities acting as single combat encounter
• Individual components are weak but collectively dangerous
• Overwhelming through sheer number of attacks per turn
• Strategy: Area-of-effect abilities or divide-and-conquer tactics

🎲 **Erratic Enemies** - Unpredictable chaos fighters
• Random stat fluctuations each turn cycle
• Abilities that change mid-combat without warning
• Impossible to predict or strategize against consistently
• Strategy: Adaptability and quick reaction to changing circumstances

🏹 **Hit-and-Run Enemies** - Tactical strikers
• Balanced stats with emphasis on tactical positioning
• Strike hard then retreat to defensive positions
• Often possess terrain manipulation or mobility abilities
• Strategy: Control the battlefield and limit their movement options`
            },
            {
                name: 'Advanced Combat Mechanics',
                content: `**Elemental Weakness and Resistance System:**

**Weakness Interactions (+30% damage):**
• Fire vs Ice/Plant enemies (melting/burning effects)
• Water vs Fire/Earth enemies (extinguishing/erosion effects)
• Lightning vs Water/Metal enemies (conductivity enhancement)
• Light vs Dark/Undead enemies (purification effects)
• Physical vs Magical constructs (dispelling effects)

**Resistance Interactions (-30% damage):**
• Fire vs Fire enemies (natural immunity)
• Water vs Water enemies (elemental harmony)
• Dark vs Light attacks (opposing force neutralization)
• Physical vs Incorporeal enemies (reduced physical interaction)
• Magic vs Anti-magic enemies (spell resistance)

**Status Effects and Conditions:**

**Positive Status Effects:**
• **Blessed:** +20% all stats, +10% critical hit rate
• **Haste:** +2 actions per turn, +15% dodge chance
• **Fortified:** +50% DEF, immunity to status debuffs
• **Focused:** +30% ATK, guaranteed critical on next attack

**Negative Status Effects:**
• **Poisoned:** -5 HP per turn, -10% all stats
• **Cursed:** -20% all stats, -15% accuracy
• **Stunned:** Skip next turn, -50% DEF
• **Blinded:** -40% accuracy, -20% dodge chance

**Environmental Combat Factors:**

**Terrain Advantages:**
• High Ground: +15% ATK, +10% dodge chance
• Water Combat: Bonus for Water-aligned abilities
• Confined Spaces: -20% SPD, enhanced defensive positioning
• Open Areas: +25% SPD, enhanced mobility options

**Weather and Atmospheric Conditions:**
• Rain: -10% accuracy, +20% Lightning damage
• Fog: -25% accuracy for both sides, enhanced stealth
• Sunlight: +15% Holy damage, -20% Dark abilities
• Night: +20% Dark abilities, -10% accuracy without darkvision

**Combat Encounter Probability Formula:**
Base Rate (30%) + Quest Category Modifier + Level Scaling + Random Variation
• Hunting Quests: +15% encounter rate
• Protection Quests: +12% encounter rate
• Training Quests: +20% encounter rate
• Gathering Quests: +5% encounter rate
• Community Work: -8% encounter rate
• Simple Errands: -5% encounter rate
• Level Scaling: +2% per level above 1
• Final range: 10% minimum, 55% maximum encounter rate`
            },
            {
                name: 'Enemy Bestiary',
                content: `**Forest and Nature Enemies:**

**🌲 Forest Goblin** (Levels 1-3)
• Combat Style: Swarm + Erratic
• HP: 25-35, ATK: 8-12, DEF: 3-5, SPD: 12-18
• Special Ability: Pack Tactics (15% chance) - Call reinforcements
• Weakness: Fire damage (+30%), Light magic (+20%)
• Resistance: Nature magic (-20%)
• Drops: Goblin Ear, Forest Herbs, Small Coins

**🐺 Forest Wolf** (Levels 2-5)
• Combat Style: Aggressive + Hit-and-Run
• HP: 40-60, ATK: 15-22, DEF: 8-12, SPD: 20-28
• Special Ability: Pack Howl (20% chance) - +25% ATK for 3 turns
• Weakness: Silver weapons (+40%), Fire damage (+25%)
• Resistance: Physical damage (-15% when in pack)
• Drops: Wolf Pelt, Fang, Beast Essence

**🕷️ Cave Spider** (Levels 3-7)
• Combat Style: Evasive + Defensive
• HP: 30-45, ATK: 12-18, DEF: 15-22, SPD: 25-35
• Special Ability: Web Shot (25% chance) - Reduce enemy SPD by 50% for 2 turns
• Weakness: Fire damage (+35%), Crushing weapons (+20%)
• Resistance: Poison damage (-40%), Piercing weapons (-25%)
• Drops: Spider Silk, Venom Sac, Cave Minerals

**🐗 Wild Boar** (Levels 4-8)
• Combat Style: Tank + Aggressive
• HP: 80-120, ATK: 20-28, DEF: 18-25, SPD: 8-15
• Special Ability: Tusked Charge (18% chance) - Double damage attack, +50% crit
• Weakness: Spear weapons (+30%), Lightning damage (+25%)
• Resistance: Blunt weapons (-20%), Earth damage (-30%)
• Drops: Boar Hide, Tusk, Wild Meat

**💧 Water Slime** (Levels 1-4)
• Combat Style: Defensive + Erratic
• HP: 35-50, ATK: 6-10, DEF: 20-30, SPD: 5-12
• Special Ability: Split (12% chance) - Create smaller copy when damaged
• Weakness: Lightning damage (+40%), Salt-based attacks (+50%)
• Resistance: Physical damage (-35%), Water damage (-60%)
• Drops: Slime Core, Purified Water, Gelatinous Substance

**Humanoid Enemies:**

**🗡️ Bandit Scout** (Levels 3-6)
• Combat Style: Hit-and-Run + Agile
• HP: 45-65, ATK: 16-24, DEF: 10-15, SPD: 22-30
• Special Ability: Sneak Attack (22% chance) - Ignore DEF, +100% crit chance
• Weakness: Holy damage (+25%), Area-of-effect attacks (+20%)
• Resistance: Stealth detection (-30%)
• Drops: Bandit Blade, Leather Armor, Stolen Goods

**🛡️ Guard Captain** (Levels 5-9)
• Combat Style: Tank + Defensive
• HP: 100-140, ATK: 18-26, DEF: 25-35, SPD: 12-18
• Special Ability: Rally Cry (15% chance) - +30% all stats for 3 turns
• Weakness: Armor-piercing attacks (+35%), Magic damage (+20%)
• Resistance: Physical damage (-25%), Fear effects (-50%)
• Drops: Captain's Sword, Chain Mail, Authority Badge

**Magical and Supernatural Enemies:**

**✨ Will-o'-Wisp** (Levels 4-8)
• Combat Style: Evasive + Erratic
• HP: 25-40, ATK: 14-20, DEF: 5-10, SPD: 35-45
• Special Ability: Phase (30% chance) - Become incorporeal, immune to physical
• Weakness: Light magic (+40%), Iron weapons (+30%)
• Resistance: All elemental damage (-20%), Physical when phased (-90%)
• Drops: Wisp Essence, Ethereal Fragment, Spectral Light

**🎃 Animated Scarecrow** (Levels 6-10)
• Combat Style: Defensive + Swarm
• HP: 70-100, ATK: 15-22, DEF: 22-30, SPD: 8-15
• Special Ability: Confuse (20% chance) - Enemy attacks random target for 2 turns
• Weakness: Fire damage (+45%), Dispel magic (+35%)
• Resistance: Physical damage (-30%), Mental effects (-40%)
• Drops: Enchanted Straw, Magic Binding, Harvest Charm

**🗿 Stone Golem** (Levels 8-15)
• Combat Style: Tank + Defensive
• HP: 150-250, ATK: 25-35, DEF: 40-55, SPD: 5-10
• Special Ability: Stone Skin (25% chance) - +100% DEF for 3 turns
• Weakness: Lightning damage (+30%), Hammer weapons (+40%)
• Resistance: All physical damage (-40%), Earth damage (-60%)
• Drops: Golem Core, Enchanted Stone, Earth Essence`
            }
        ]
    },
    progression: {
        title: '📈 Character Progression',
        description: 'Level up, unlock abilities, and grow stronger',
        sections: [
            {
                name: 'Experience and Leveling System',
                content: `**XP Requirements and Scaling:**

**Level Progression Formula:**
• Level 1 → 2: 100 XP
• Level 2 → 3: 200 XP  
• Level 3 → 4: 300 XP
• Pattern: Each level requires (Current Level × 100) XP
• Example: Level 10 → 11 requires 1,000 XP

**Cumulative XP Requirements:**
• Level 5: 1,500 total XP
• Level 10: 5,500 total XP
• Level 15: 12,000 total XP
• Level 20: 21,000 total XP
• Level 25: 32,500 total XP
• Level 30: 46,500 total XP

**Level Up Statistical Bonuses:**
Every level advancement grants consistent growth:
• **+10 HP** (both current and maximum HP)
• **+2 ATK** (base attack power increase)
• **+1 DEF** (base defense rating increase)
• **+1 SPD** (base speed factor increase)

**Example Character Progression:**
Level 1 Base: 50 HP, 10 ATK, 5 DEF, 8 SPD
Level 10: 140 HP, 28 ATK, 14 DEF, 17 SPD
Level 20: 240 HP, 48 ATK, 24 DEF, 27 SPD

**XP Source Categories and Values:**

**Quest Completion XP:**
• Gathering Quests: 50-150 base XP
• Hunting Quests: 100-300 base XP
• Delivery Quests: 75-200 base XP
• Protection Quests: 120-250 base XP
• Training Quests: 150-400 base XP
• Community Quests: 80-180 base XP
• Errand Quests: 40-120 base XP

**Combat Victory Bonuses:**
• Enemy defeat: 10-50 XP based on enemy strength
• Perfect victory (no damage taken): +25% bonus
• Weakness exploitation: +15% bonus
• Critical hit finish: +10% bonus

**Faction Multiplier Effects:**
XP gains are modified by faction affinity with quest types:
• One Piece Pirates: +20% on Gathering, +30% on Delivery
• Naruto Shinobi: +40% on Protection, +50% on Training  
• Jujutsu Sorcerers: +40% on Hunting, +30% on Training
• Demon Slayers: +50% on Hunting, +40% on Training

**Special XP Sources:**
• Item Usage: XP Potions provide 25-100 instant XP
• Achievement Completion: Major milestones grant 200-500 XP
• First-time quest type completion: +50% bonus XP
• Consecutive quest success streaks: Cumulative +5% per quest (max +50%)`
            },
            {
                name: 'Faction Ability Unlock System',
                content: `**Ability Unlock Requirements:**
Faction abilities require BOTH level thresholds AND specific achievement conditions.

**🏴‍☠️ One Piece Pirates Unlock Conditions:**

**Level 3 - Sea Legs:**
• Requirements: Complete 5 Delivery quests, defeat 3 water-based enemies
• Effect: Immunity to water debuffs, +10% swimming speed
• Advanced: Can walk on water surfaces during certain quests

**Level 7 - Treasure Sense:**
• Requirements: Find 10 rare items, complete 15 Gathering quests
• Effect: +25% item discovery rate, detect hidden treasures
• Advanced: Treasure maps reveal additional secret locations

**Level 12 - Haki Awakening:**
• Requirements: Win 20 combat encounters, complete "Willpower Trial" quest
• Effect: Observation Haki (+15% dodge), Armament Haki (+10% ATK/DEF)
• Advanced: Can sense enemy intentions and hidden enemies

**Level 18 - Devil Fruit Resonance:**
• Requirements: Consume rare Devil Fruit item, master all basic abilities
• Effect: Gain unique Devil Fruit power based on character personality
• Advanced: Power awakening unlocks at Level 25

**Level 25 - Conqueror's Will:**
• Requirements: Defeat 50 enemies, lead successful group activities
• Effect: Intimidate weaker enemies (25% chance to flee), leadership bonuses
• Advanced: Can knock out multiple weak enemies instantly

**🥷 Naruto Shinobi Unlock Conditions:**

**Level 4 - Shadow Clone Technique:**
• Requirements: Complete 10 Training quests, achieve stealth success streak of 5
• Effect: Double XP from training activities, create tactical duplicates
• Advanced: Multiple clones for complex multi-tasking

**Level 8 - Elemental Affinity:**
• Requirements: Master chakra control exercises, defeat 15 elemental enemies
• Effect: Choose primary element (Fire/Water/Earth/Wind/Lightning), +20% elemental damage
• Advanced: Can combine elements for advanced jutsu

**Level 13 - Advanced Ninjutsu:**
• Requirements: Learn 20 different techniques, complete village ranking exam
• Effect: Enhanced stealth (+30%), jutsu combination attacks
• Advanced: Can create custom techniques combining multiple elements

**Level 19 - Sage Mode Training:**
• Requirements: Perfect harmony with nature, complete "Toad Sage Trial"
• Effect: +35% all combat stats, enhanced perception, nature energy manipulation
• Advanced: Can maintain sage mode for extended periods

**Level 28 - Tailed Beast Partnership:**
• Requirements: Prove worthy through trials, establish spiritual connection
• Effect: Massive chakra boost, transformation abilities, shared consciousness
• Advanced: Perfect Jinchūriki status with complete beast cooperation`
            },
            {
                name: 'Advanced Progression Mechanics',
                content: `**Stat Growth Optimization Strategies:**

**Natural vs Enhanced Growth:**
• Base growth: Standard +10 HP, +2 ATK, +1 DEF, +1 SPD per level
• Faction bonuses apply to base stats at character creation
• Training quests can provide temporary or permanent stat boosts
• Equipment and abilities provide multiplicative bonuses to base stats

**Faction Synergy Optimization:**
Each faction has optimal stat distributions and ability combinations:
• **Pirates:** Focus on ATK and SPD for treasure hunting and combat
• **Shinobi:** Balanced approach with emphasis on SPD and stealth techniques
• **Sorcerers:** High ATK with DEF balance for supernatural combat
• **Demon Slayers:** Maximum ATK and HP for direct demon confrontation

**Advanced Training Systems:**

**Specialized Training Quests:**
• **Endurance Training:** +2 extra HP per level for next 5 levels
• **Combat Drills:** +1 extra ATK per level for next 3 levels
• **Defense Practice:** +1 extra DEF per level for next 4 levels
• **Agility Training:** +1 extra SPD per level for next 3 levels

**Master Training Programs:**
Available at level 15+ with faction-specific masters:
• **Pirate Captains:** Advanced navigation and treasure hunting techniques
• **Ninja Academies:** Specialized jutsu and stealth training programs
• **Sorcery Schools:** Cursed technique refinement and domain theory
• **Demon Slayer Corps:** Breathing technique mastery and blade forging

**Equipment and Ability Scaling:**

**Equipment Effectiveness Formula:**
Base Effectiveness × (Character Level / Item Level Requirement) × Faction Compatibility

**Ability Power Scaling:**
• Level 1-10: Basic ability effects, fundamental power development
• Level 11-20: Enhanced abilities, intermediate power manifestation
• Level 21-30: Advanced abilities, master-level power demonstration
• Level 31+: Legendary abilities, transcendent power achievement

**Prestige and Advancement Systems:**

**Faction Ranking Progression:**
Each faction has internal hierarchy with advancement requirements:
• **Pirates:** Crew positions from Cabin Boy to Pirate King
• **Shinobi:** Village ranks from Academy Student to Hokage
• **Sorcerers:** School grades from Third Grade to Special Grade
• **Demon Slayers:** Corps ranks from Mizunoto to Hashira

**Cross-Faction Recognition:**
High-level characters gain recognition across all factions:
• Respect bonuses when interacting with other faction members
• Access to neutral territories and cross-faction collaboration quests
• Ability to learn basic techniques from other factions (limited)
• Special "Legend" status affecting game world dynamically

**Achievement and Milestone Systems:**

**Progressive Achievement Categories:**
• Combat Achievements: Enemy defeats, perfect victories, combat style mastery
• Exploration Achievements: Area discovery, treasure finding, quest variety
• Social Achievements: Faction loyalty, cross-faction cooperation, leadership
• Mastery Achievements: Ability unlocks, technique perfection, legendary status

**Milestone Rewards:**
Major achievements unlock permanent character enhancements:
• Stat point allocation bonuses for reaching level milestones
• Unique titles and recognition affecting NPC interactions
• Access to legendary equipment and rare ability modifications
• Influence over game world events and story progression paths`
            }
        ]
    },
    quests: {
        title: '🎯 Quest System',
        description: 'Advanced quest mechanics and optimization strategies',
        sections: [
            {
                name: 'Quest Category Deep Dive',
                content: `**🌿 Gathering Quests - Resource Collection Adventures**

**Mechanical Structure:**
• Base success rate: 70% + (Character Level × 2%)
• Primary stats: SPD for efficiency, ATK for resource extraction
• Environmental factors: Weather, season, and location affect yields
• Competition: Other characters may be gathering in same areas

**Faction Bonuses:**
• **One Piece Pirates:** +30% success rate, +50% rare item chance (treasure hunting instinct)
• **Naruto Shinobi:** +20% success rate, +25% stealth bonus for rare resources
• **Jujutsu Sorcerers:** +15% success rate, can detect cursed materials (+40% supernatural items)
• **Demon Slayers:** +10% success rate, +35% herb and medicinal material yields

**Advanced Gathering Mechanics:**
• **Resource Depletion:** Popular areas become less productive over time
• **Seasonal Availability:** Certain materials only available during specific times
• **Tool Dependency:** Specialized equipment greatly improves gathering efficiency
• **Knowledge Systems:** Previous experience in area improves future success rates

**⚔️ Hunting Quests - Combat-Focused Missions**

**Target Categories:**
• **Monster Elimination:** Single powerful enemy with high reward
• **Pest Control:** Multiple weak enemies requiring efficiency
• **Bounty Hunting:** Intelligent enemies with unique behaviors
• **Investigation Hunting:** Track and study enemies before confrontation

**Faction Specializations:**
• **Demon Slayers:** +50% success rate, +40% damage vs supernatural enemies
• **Jujutsu Sorcerers:** +40% success rate, +60% effectiveness vs cursed enemies
• **Naruto Shinobi:** +25% success rate, +30% stealth kill bonuses
• **One Piece Pirates:** +20% success rate, +25% treasure drops from defeated enemies

**Advanced Hunting Systems:**
• **Enemy Behavior Patterns:** Learning enemy routines improves success rates
• **Preparation Phase:** Scouts can provide intel for tactical advantages
• **Environmental Usage:** Terrain and weather can be used strategically
• **Group Coordination:** Multi-character hunts available at higher levels

**📦 Delivery Quests - Transportation and Logistics**

**Delivery Complexity Factors:**
• **Distance:** Longer routes provide higher rewards but increased risk
• **Cargo Sensitivity:** Time-sensitive or fragile goods require careful handling
• **Route Danger:** Hostile territory increases combat encounter chances
• **Client Reputation:** Established clients provide better base rewards

**Navigation and Speed Bonuses:**
• **One Piece Pirates:** +30% delivery success, +20% navigation in water areas
• **Naruto Shinobi:** +25% delivery success, +35% stealth movement bonuses
• **Demon Slayers:** +15% delivery success, +25% protection against highway bandits
• **Jujutsu Sorcerers:** +10% delivery success, +30% sensing dangerous routes

**🛡️ Protection Quests - Guardian and Defense Missions**

**Protection Scenarios:**
• **VIP Escort:** Protect important individuals during travel
• **Settlement Defense:** Guard villages against raids and attacks
• **Caravan Protection:** Escort merchant groups through dangerous territory
• **Event Security:** Maintain safety during festivals and gatherings

**Defensive Strategy Elements:**
• **Threat Assessment:** Identify potential dangers before they manifest
• **Positioning:** Optimal placement for maximum protection coverage
• **Resource Management:** Balance offense and defense over extended periods
• **Crisis Response:** React quickly to unexpected threat escalations

**Faction Guard Specializations:**
• **Naruto Shinobi:** +40% protection success, +50% threat detection bonuses
• **Demon Slayers:** +35% protection success, +45% vs supernatural threats
• **Jujutsu Sorcerers:** +30% protection success, +40% vs cursed spirit attacks
• **One Piece Pirates:** +20% protection success, +25% against naval threats`
            },
            {
                name: 'Faction Quest System',
                content: `**📖 Story Quests - Epic Faction Narratives**

**Comprehensive Storyline Framework:**
Faction story quests represent the pinnacle of narrative-driven gameplay, offering deep, multi-chapter adventures that explore each faction's unique mythology, characters, and philosophical foundations.

**Story Quest Structure:**
• **Chapter-Based Progression:** 10+ unique story chapters per faction
• **Progressive Difficulty:** Each chapter increases in challenge and rewards
• **Faction Ability Unlocks:** Story completion unlocks powerful faction-specific abilities
• **Lore Integration:** Deep exploration of anime universe backstories and characters

**Faction Story Themes:**
• **🏴‍☠️ One Piece Pirates:** Adventure, freedom, friendship, and the pursuit of dreams across the Grand Line
• **🥷 Naruto Shinobi:** Honor, village protection, ninja way philosophy, and mastering chakra techniques
• **👁️ Jujutsu Sorcerers:** Curse exorcism, supernatural combat, domain theory, and protecting humanity
• **⚔️ Demon Slayers:** Dedication, breathing mastery, demon hunting, and protecting innocent lives

**Story Quest Rewards:**
• **Massive XP Gains:** 200-500 XP per chapter completion
• **Unique Faction Items:** Equipment and consumables exclusive to story progression
• **Ability Unlocks:** Progressive faction abilities tied to story milestones
• **Lore Bonuses:** Deep character development and faction understanding

**📅 Daily Quests - Consistent Progression Training**

**Daily Quest Mechanics:**
Daily quests provide consistent, reliable character progression with a 24-hour cooldown system designed to encourage regular engagement while respecting player time.

**Daily Quest Generation:**
• **Level-Scaled Content:** Quest difficulty automatically adjusts to character level
• **Faction-Themed Training:** Each day's quest reflects your faction's training philosophy
• **Reward Scaling:** Higher-level characters receive proportionally better rewards
• **Cooldown Management:** Precisely 24 hours from last completion

**Daily Quest Categories:**
• **💪 Training Routines:** Stat improvement and technique practice
• **🗺️ Exploration Tasks:** Area discovery and reconnaissance missions
• **🤝 Social Interactions:** Community building and relationship development
• **⚔️ Combat Drills:** Battle readiness and tactical preparation

**Daily Reward Structure:**
• **Reliable XP:** 100-300 XP scaled to character level
• **Consistent Gold:** 50-150 gold for equipment and item purchases
• **Engagement Bonus:** Special rewards for consecutive daily completions
• **No Penalty System:** Missing days doesn't punish players, just postpones next opportunity

**🎲 Random Missions - Endless Adventure Variety**

**Procedural Quest Generation:**
Random missions use advanced procedural generation to create unlimited variety in side quest content, ensuring fresh experiences for every player.

**Generation Algorithm Components:**
• **Location Variety:** 12+ unique location types from abandoned warehouses to ancient temples
• **Enemy Diversity:** 8+ enemy archetypes with unique behavioral patterns
• **Objective Combinations:** 8+ quest objectives that combine dynamically
• **Complication Systems:** 8+ challenge modifiers that add strategic depth

**Random Mission Categories:**
• **📝 Side Missions:** Self-contained adventures with unique story elements
• **🔍 Investigation Tasks:** Mystery-solving with clues and deduction elements
• **🚨 Emergency Responses:** Time-sensitive crisis situations requiring quick action
• **🎯 Bounty Contracts:** Target elimination with strategic planning requirements

**Dynamic Difficulty Scaling:**
• **Adaptive Challenge:** Difficulty adjusts based on character level and performance
• **Risk/Reward Balance:** Higher difficulty missions offer proportionally better rewards
• **Reroll System:** Players can regenerate missions if current options don't appeal
• **Variety Guarantee:** Algorithm ensures diverse mission types over time

**Random Mission Rewards:**
• **Variable XP:** 75-250 XP based on difficulty and execution quality
• **Surprise Elements:** Unexpected item drops and bonus rewards
• **Exploration Bonuses:** Unique encounters and discoveries not available elsewhere
• **Skill Development:** Challenges that encourage creative problem-solving

**📊 Quest Status and Progress Tracking**

**Comprehensive Progress Monitoring:**
The faction quest status system provides detailed analytics on your quest journey, helping optimize progression strategies and celebrate achievements.

**Status Dashboard Information:**
• **Story Progress:** Current chapter, completed missions, remaining content
• **Daily Quest History:** Streak tracking, total completions, next availability
• **Random Mission Statistics:** Total completed, favorite types, success rates
• **Overall Progress Metrics:** Total faction quests completed, XP earned, time invested

**Progress Milestones:**
• **Chapter Completion Rewards:** Special bonuses for finishing story segments
• **Daily Streak Benefits:** Escalating rewards for consecutive daily quest completion
• **Mission Variety Bonuses:** Extra rewards for completing diverse random mission types
• **Mastery Recognition:** Titles and recognition for extensive faction quest engagement

**Strategic Planning Tools:**
• **Cooldown Timers:** Precise countdown to next daily quest availability
• **Difficulty Recommendations:** Suggested quest types based on current character capabilities
• **Reward Projections:** Estimated progression benefits from different quest choices
• **Faction Comparison:** See how your progress compares to other faction members

**Advanced Quest Integration:**

**Synergy with Main Quest System:**
Faction quests integrate seamlessly with the main quest system, providing complementary progression paths that enhance rather than replace traditional adventuring.

**Cross-System Benefits:**
• **Stat Synergy:** Faction quest stat gains apply to all quest types
• **Equipment Integration:** Faction quest items enhance performance in main quests
• **Experience Diversity:** Varied progression paths prevent monotonous grinding
• **Strategic Choice:** Players can optimize their advancement through quest type selection

**Endgame Faction Content:**
• **Weekly Boss Rotations:** High-level faction-specific raid content
• **Legendary Quest Chains:** Ultra-challenging story continuations for max-level characters
• **Faction Leadership Paths:** Progression toward faction-specific leadership roles
• **Cross-Faction Collaboration:** Special quests requiring cooperation between different factions`
            },
            {
                name: 'Quest Rewards and Economy',
                content: `**Base Reward Scaling System:**

**Experience Point Calculations:**
• **Base Formula:** (Quest Difficulty × 25) + (Character Level × 15) + Success Bonus
• **Difficulty Ranges:** Easy (×1.0), Normal (×1.5), Hard (×2.0), Extreme (×3.0)
• **Success Bonuses:** Perfect execution (+25%), Creative solutions (+15%), Speed completion (+10%)
• **Faction Multipliers:** Applied after base calculation for preferred quest types

**Gold Reward Economics:**
• **Base Gold:** (Quest Difficulty × 20) + (Character Level × 8) + Market Conditions
• **Market Fluctuations:** Supply and demand affect quest payments by ±30%
• **Client Wealth:** Rich clients pay 50-200% base rates, poor clients pay 30-80%
• **Reputation Bonuses:** High-reputation characters receive 10-40% payment bonuses

**Item Reward Probability Matrix:**

**Common Items (60-80% chance):**
• Basic consumables: Health potions, stat boosters, common materials
• Standard equipment: Weapons and armor appropriate to character level
• Utility items: Tools, maps, information sources

**Uncommon Items (15-25% chance):**
• Enhanced consumables: Greater potions, specialized stat boosters
• Improved equipment: Above-average weapons and armor with minor bonuses
• Faction materials: Items specifically useful for faction ability development

**Rare Items (4-8% chance):**
• Powerful consumables: Master-grade potions, permanent stat enhancers
• Exceptional equipment: High-quality gear with significant bonuses
• Unique materials: Components for legendary equipment crafting

**Legendary Items (0.5-2% chance):**
• Game-changing consumables: Items that unlock new abilities or possibilities
• Legendary equipment: Best-in-class gear with transformative effects
• Artifact materials: Components for faction-specific legendary equipment

**Dynamic Reward Adjustment Systems:**

**Performance-Based Scaling:**
• **Exceeds Expectations:** +50% to all rewards, rare item chance doubled
• **Meets Expectations:** Standard reward calculation
• **Below Expectations:** -25% to all rewards, no rare item rolls
• **Failure with Effort:** 25% XP and gold, no item rewards

**Economic Integration:**
• **Supply and Demand:** Gathering quest rewards affected by resource scarcity
• **Faction Politics:** Protection quest payments influenced by political situations
• **Seasonal Events:** Holiday periods increase all quest rewards by 25-75%
• **World Events:** Major story developments can dramatically affect quest economy

**Advanced Reward Mechanics:**

**Faction Reputation Systems:**
• Completing faction-preferred quests builds reputation within that community
• High reputation unlocks exclusive quest types with premium rewards
• Cross-faction reputation affects available quest options and NPC interactions
• Master reputation levels grant access to legendary quest lines

**Achievement Integration:**
• First-time quest type completion: +50% XP bonus
• Quest category mastery (50 completed): Permanent +10% success rate
• Perfect streak achievements: Consecutive perfect completions unlock titles
• Legendary achievements: Major milestones grant unique rewards and recognition

**Long-term Progression Rewards:**
• **Quest Journal Mastery:** Completing quest types unlocks advanced variants
• **Regional Expertise:** Repeated success in areas grants local knowledge bonuses
• **Client Relationships:** Building trust with quest givers improves future rewards
• **Legacy Building:** High-level characters leave impacts affecting future character rewards`
            },
            {
                name: 'Advanced Quest Strategies',
                content: `**Optimal Quest Selection Algorithms:**

**Faction-Based Optimization:**
Each faction should prioritize specific quest types for maximum efficiency:

**One Piece Pirates Optimal Rotation:**
1. **Primary:** Gathering (50% of quests) - Maximum treasure hunting bonus utilization
2. **Secondary:** Delivery (30% of quests) - Strong navigation and speed bonuses
3. **Tertiary:** Hunting (20% of quests) - Combat training and treasure from defeats

**Naruto Shinobi Optimal Rotation:**
1. **Primary:** Protection (45% of quests) - Highest faction bonus and honor
2. **Secondary:** Training (35% of quests) - Double XP from shadow clone technique
3. **Tertiary:** Delivery (20% of quests) - Stealth and speed advantages

**Jujutsu Sorcerers Optimal Rotation:**
1. **Primary:** Hunting (50% of quests) - Superior supernatural enemy bonuses
2. **Secondary:** Training (30% of quests) - Cursed technique development
3. **Tertiary:** Protection (20% of quests) - Practice against cursed threats

**Demon Slayers Optimal Rotation:**
1. **Primary:** Hunting (55% of quests) - Maximum demon elimination bonuses
2. **Secondary:** Training (25% of quests) - Breathing technique refinement
3. **Tertiary:** Protection (20% of quests) - Guardian duty and corp honor

**Level-Based Quest Progression:**

**Early Game (Levels 1-5):** Foundation Building
• Focus on easy and normal difficulty quests for consistent success
• Prioritize faction bonus quests to build core abilities quickly
• Avoid extreme difficulty quests that risk failure and wasted time
• Balance XP gain with gold accumulation for equipment upgrades

**Mid Game (Levels 6-15):** Specialization Development
• Begin taking hard difficulty quests for improved rewards
• Start faction ability unlock quest chains
• Develop expertise in 2-3 preferred quest categories
• Build reputation with key NPC clients for better future rewards

**Late Game (Levels 16-25):** Mastery and Leadership
• Focus on extreme difficulty quests for maximum progression
• Lead group quests and mentor lower-level characters
• Complete legendary quest chains for unique rewards
• Influence world events through high-impact mission choices

**End Game (Levels 26+):** Legacy and Innovation
• Create custom quest content through game master mechanics
• Establish new quest routes and client relationships
• Mentor entire factions and shape game world development
• Pioneer new quest types and advanced mechanical systems

**Risk Management Strategies:**

**Quest Failure Mitigation:**
• **Preparation Phase:** Use intelligence gathering to assess quest difficulty
• **Equipment Matching:** Ensure gear appropriate for expected challenges
• **Backup Planning:** Always have exit strategies for dangerous situations
• **Resource Budgeting:** Never commit all resources to single quest attempt

**Combat Encounter Preparation:**
• **Enemy Research:** Learn enemy types common to quest areas
• **Tactical Planning:** Prepare strategies for most likely encounter scenarios
• **Item Stocking:** Carry healing and buff items appropriate to threat levels
• **Escape Routes:** Memorize retreat paths from dangerous quest locations

**Advanced Collaboration Techniques:**

**Multi-Character Quest Coordination:**
• **Role Specialization:** Assign specific responsibilities based on faction strengths
• **Resource Sharing:** Pool resources for enhanced success probabilities
• **Knowledge Exchange:** Share intelligence and experience for mutual benefit
• **Risk Distribution:** Spread dangerous tasks across multiple capable characters

**Cross-Faction Cooperation:**
• **Complementary Skills:** Combine different faction abilities for unique advantages
• **Cultural Exchange:** Learn basic techniques from other factions through collaboration
• **Diplomatic Missions:** Represent factions in inter-faction political situations
• **Unity Campaigns:** Participate in major events requiring all-faction cooperation`
            }
        ]
    },
    items: {
        title: '🎒 Items & Inventory',
        description: 'Complete guide to item systems and inventory management',
        sections: [
            {
                name: 'Item Usage Mechanics',
                content: `**Advanced Item Effect Systems:**

**Pattern Recognition for Item Effects:**
The item system uses intelligent parsing to understand various effect descriptions:

**HP Restoration Patterns:**
• "heal", "restore", "health", "HP" → Direct HP restoration
• "regeneration", "recovery", "mend" → Heal over time effects
• "max health", "maximum HP", "health boost" → Temporary HP increases
• "vitality", "life force", "constitution" → Permanent HP bonuses

**MP/Energy/Chakra Restoration:**
• "mana", "MP", "magic" → Magical energy restoration
• "chakra", "chi", "spiritual energy" → Ninja energy systems
• "cursed energy", "curse power" → Sorcerer energy restoration
• "stamina", "endurance", "breath" → Physical energy systems

**Stat Enhancement Patterns:**
• "strength", "power", "might", "ATK" → Attack power bonuses
• "defense", "armor", "protection", "DEF" → Defensive improvements
• "speed", "agility", "quickness", "SPD" → Speed enhancements
• "all stats", "everything", "comprehensive" → Universal stat boosts

**Gold and Currency Effects:**
• "gold", "coins", "money", "currency" → Direct gold addition
• "treasure", "wealth", "riches" → Variable gold amounts
• "fortune", "prosperity" → Gold multiplier effects

**Experience and Progression:**
• "experience", "XP", "learning" → Direct experience point gain
• "wisdom", "knowledge", "insight" → Enhanced XP from future activities
• "training", "practice", "study" → Skill-specific progression boosts

**Item Usage Intelligence:**

**Quantity Optimization:**
• **Healing Items:** System calculates optimal usage to avoid waste
• **Stat Buffs:** Prevents redundant stacking of identical effects
• **XP Items:** Optimizes timing relative to level-up thresholds
• **Currency Items:** Considers market conditions for maximum value

**Timing Recommendations:**
• **Pre-Quest Buffs:** Suggests optimal timing for temporary stat boosts
• **Emergency Usage:** Prioritizes life-saving items during critical situations
• **Efficiency Maxing:** Recommends usage patterns for maximum benefit
• **Resource Conservation:** Balances current needs with future requirements

**Faction-Specific Item Interactions:**

**One Piece Pirates:**
• **Sea King Meat:** +75 HP, +10 ATK for 3 quests, enhanced treasure sense
• **Rum Bottle:** +15 SPD, +20% critical hit rate, +5% treasure finding
• **Treasure Map:** Reveals hidden quest locations with premium rewards
• **Devil Fruit (Rare):** Grants unique permanent ability based on character

**Naruto Shinobi:**
• **Soldier Pill:** +30 chakra, removes fatigue, +25% stealth for 2 quests
• **Ramen Bowl:** +50 HP, +10% XP gain for next 3 completed quests
• **Chakra Paper:** Tests and enhances elemental affinity development
• **Forbidden Scroll:** Unlocks advanced jutsu techniques (high level required)

**Jujutsu Sorcerers:**
• **Cursed Energy Serum:** +40 cursed energy, cleanses curses, +20% technique power
• **Protective Charm:** Immunity to curse effects for 4 quest attempts
• **Ancient Talisman:** +25% damage vs supernatural enemies, curse resistance
• **Domain Fragment:** Temporary domain expansion ability (master level)

**Demon Slayers:**
• **Recovery Pill:** +20 HP per turn for 5 turns, poison immunity
• **Wisteria Incense:** Repels demons, +30% success rate on hunting quests
• **Sunlight Essence:** +50% damage vs demons for 1 combat encounter
• **Nichirin Stone:** Enhances blade effectiveness, +15% critical hit rate

**Item Interaction Systems:**
• **Faction Synergy:** Some items have enhanced effects for specific factions
• **Timing Strategy:** Buff items are best used before anticipated challenges
• **Inventory Management:** Items have stack limits and inventory space considerations
• **Quest Integration:** Some items are specifically designed for certain quest types`
            },
            {
                name: 'Comprehensive Item Categories',
                content: `**💊 Consumable Items - Complete Catalog:**

**Basic Restoration Items:**
• **Small Health Potion** - 25 HP, common quest reward
• **Health Potion** - 50 HP, standard healing item  
• **Greater Health Potion** - 100 HP, rare healing item
• **Master Health Elixir** - 200 HP + removes all debuffs, very rare
• **Mana Restoration Draught** - Restores all MP/chakra/cursed energy
• **Rejuvenation Tonic** - 50 HP + 25 MP + removes fatigue

**Experience Enhancement Items:**
• **Experience Crystal (Tiny)** - 10 XP, common drop
• **Experience Crystal (Small)** - 25 XP, uncommon reward
• **Experience Crystal (Medium)** - 50 XP, rare quest completion
• **Experience Crystal (Large)** - 100 XP, very rare achievement
• **Master's Tome** - 150 XP + unlocks technique hint
• **Ancient Scroll** - 200 XP + reveals hidden quest location

**Combat Enhancement Items:**
• **Warrior's Draught** - +10 ATK for 3 combat encounters
• **Warrior's Elixir** - +15 ATK for 3 combat encounters
• **Berserker's Fury** - +25 ATK, -10 DEF for 2 encounters
• **Guardian's Blessing** - +20 DEF for 3 combat encounters
• **Iron Skin Potion** - +30 DEF, -5 SPD for 4 encounters
• **Speed Enhancer** - +10 SPD for 5 quests
• **Lightning Reflexes** - +15 SPD, +20% dodge for 2 encounters

**Faction-Specific Consumables:**
• **Sea King Meat (Pirates)** - 75 HP + 10 ATK for 3 quests + treasure sense boost
• **Soldier Pill (Shinobi)** - 30 chakra + removes fatigue + stealth bonus
• **Cursed Energy Serum (Sorcerers)** - 40 cursed energy + curse cleansing + technique power
• **Recovery Pill (Demon Slayers)** - 20 HP per turn for 5 turns + poison immunity
• **Sunlight Essence (Demon Slayers)** - +50% damage vs demons for 1 encounter

**⚔️ Equipment System (Current and Planned):**

**Weapon Categories:**
• **Swords:** High ATK, balanced stats, critical hit bonuses
• **Axes:** Very high ATK, low SPD, armor penetration
• **Spears:** Medium ATK, high reach, defensive bonuses
• **Daggers:** Low ATK, very high SPD, stealth bonuses
• **Ranged Weapons:** Medium ATK, SPD bonuses, range advantages

**Armor Categories:**
• **Heavy Armor:** Very high DEF, -SPD penalty, physical resistance
• **Medium Armor:** Balanced DEF/SPD, moderate resistances
• **Light Armor:** Low DEF, +SPD bonus, mobility advantages
• **Robes:** Low DEF, +MP bonus, magical resistances
• **Specialized Gear:** Faction-specific equipment with unique bonuses

**Accessory Categories:**
• **Rings:** Small stat bonuses, special passive abilities
• **Amulets:** Moderate stat bonuses, elemental resistances
• **Charms:** Utility effects, luck bonuses, faction synergies
• **Tools:** Quest-specific bonuses, exploration advantages

**🎁 Special and Quest Items:**

**Rare Material Components:**
• **Dragon Scale** - Crafting component for legendary armor
• **Moonstone Shard** - Magical enhancement material
• **Ancient Rune** - Weapon enchantment component
• **Demon Horn** - Specialized crafting material for demon slayer gear
• **Chakra Crystal** - Shinobi technique enhancement material

**Quest-Specific Items:**
• **Treasure Map Fragment** - Combine 5 for complete treasure map
• **Village Pass** - Access to restricted areas during missions
• **Demon Slayer Badge** - Proof of Corps membership, unlocks exclusive areas
• **Sage Medallion** - Required for advanced sage training quests
• **Cursed Talisman** - Dangerous but powerful sorcerer research material`
            }
        ]
    },
    commands: {
        title: '💻 Command Reference',
        description: 'Complete technical reference for all bot commands',
        sections: [
            {
                name: 'Character Management Commands',
                content: `**\`/create <faction> [character_name]\`**
Initialize your Cross Realm Chronicles character and begin your adventure.

**Parameters:**
• **faction (required):** Choose from four available options:
  - \`one_piece\` - Become a freedom-loving pirate with treasure hunting abilities
  - \`naruto\` - Join the shinobi ranks with stealth and chakra techniques
  - \`jujutsu_kaisen\` - Master cursed energy as a supernatural sorcerer
  - \`demon_slayer\` - Wield breathing techniques as a demon hunting warrior

• **character_name (optional):** Custom character identity
  - Maximum 32 characters including spaces and special characters
  - If omitted, uses your Discord username as character name
  - Examples: "Monkey D. Luffy", "Shadow Master", "Curse Breaker"

**Creation Effects:**
• Assigns faction-specific starting statistics and abilities
• Provides faction-appropriate starting equipment loadout
• Unlocks faction-specific quest bonuses and progression paths
• **WARNING:** Faction choice is permanent and cannot be changed without character reset

**Error Handling:**
• Invalid faction names display available options
• Character name too long prompts for shorter alternative
• Existing character prevents creation (use /reset first)

**\`/profile [user]\`**
Display comprehensive character information and progression statistics.

**Parameters:**
• **user (optional):** Discord user to view profile for
  - Defaults to command user if not specified
  - Can view any player's profile for comparison
  - Respects privacy settings if implemented

**Profile Information Displayed:**
• **Basic Identity:** Character name, faction affiliation, current level
• **Core Statistics:** HP, ATK, DEF, SPD with faction bonuses applied
• **Progression Data:** Current XP, XP required for next level, total XP earned
• **Wealth Status:** Current gold amount, lifetime gold earned
• **Achievement Progress:** Faction ability unlocks, quest milestones
• **Equipment Summary:** Currently equipped items and their bonuses

**Advanced Features:**
• Color-coded embeds matching faction themes
• Progress bars showing XP advancement
• Faction ability unlock preview for next milestones
• Quest completion statistics and success rates

**\`/reset\`**
Permanently delete current character and all associated progress.

**Safety Features:**
• Requires explicit confirmation button click to prevent accidental deletion
• Displays warning about permanent data loss
• Shows current character level and progress before deletion
• Cannot be undone - all progress, items, and achievements are lost

**Reset Process:**
1. Command displays current character summary and deletion warning
2. User must click confirmation button within 60 seconds
3. All character data is permanently removed from database
4. User can immediately create new character with /create command

**What Gets Deleted:**
• All character statistics and progression
• Complete inventory including rare and unique items
• All quest completion history and achievements
• Faction ability unlocks and training progress
• Gold, XP, and accumulated resources`
            },
            {
                name: 'Gameplay Commands',
                content: `**\`/quest\`**
Embark on procedurally generated adventures based on your character level and faction.

**Quest Generation System:**
• **Level Scaling:** Quest difficulty and rewards scale to character level
• **Faction Bonuses:** Preferred quest types appear more frequently
• **Success Calculation:** Based on character stats vs quest requirements
• **Reward Calculation:** XP, gold, and items modified by faction multipliers

**Quest Categories Available:**
• **Gathering:** Resource collection, treasure hunting, exploration
• **Hunting:** Monster elimination, bounty collection, combat missions
• **Delivery:** Package transport, message running, escort missions
• **Protection:** Settlement defense, VIP escort, caravan guarding
• **Training:** Skill development, ability practice, stat improvement
• **Community:** Village assistance, construction, social missions
• **Errands:** Simple tasks, information gathering, basic assistance

**Combat Integration:**
• Enemy encounters possible during any quest (30% base chance)
• Combat encounter rates vary by quest category and character level
• Victory in combat provides bonus XP and gold beyond quest rewards
• Defeat results in quest failure but character survives with minimal XP gain

**\`/factionquest <subcommand>\`**
Experience faction-specific storylines, daily training, and procedurally generated missions.

**Subcommand Options:**
• **story** - Continue your faction's epic narrative campaign
• **daily** - Complete faction training with 24-hour cooldown
• **random** - Take on procedurally generated side missions
• **status** - View comprehensive faction quest progress

**\`/factionquest story\`**
Progress through multi-chapter faction narratives with unique lore and powerful rewards.

**Story Quest Features:**
• **Chapter-Based Progression:** 10+ unique story chapters per faction
• **Epic Narratives:** Deep exploration of anime universe lore and characters
• **Progressive Difficulty:** Each chapter increases challenge and rewards
• **Ability Unlocks:** Story completion unlocks powerful faction-specific abilities
• **Massive Rewards:** 200-500 XP per chapter, unique items, and faction abilities

**\`/factionquest daily\`**
Complete faction-themed daily training missions with level-scaled rewards.

**Daily Quest System:**
• **24-Hour Cooldown:** Available once every 24 hours from last completion
• **Level Scaling:** Quest difficulty and rewards automatically adjust to character level
• **Faction Themes:** Training reflects your faction's philosophy and methods
• **Consistent Rewards:** 100-300 XP and 50-150 gold based on character level
• **No Penalty:** Missing days doesn't punish players, just postpones next opportunity

**\`/factionquest random\`**
Take on procedurally generated side missions with unlimited variety.

**Random Mission Generation:**
• **Procedural Content:** Advanced algorithms create unique mission combinations
• **Dynamic Difficulty:** Adjusts based on character level and recent performance
• **Variable Rewards:** 75-250 XP based on difficulty and execution quality
• **Reroll Option:** Can regenerate missions if current options don't appeal
• **Endless Variety:** Millions of possible quest combinations for unlimited replayability

**\`/factionquest status\`**
View comprehensive analytics on your faction quest journey and progress.

**Status Information:**
• **Story Progress:** Current chapter, completed missions, remaining content
• **Daily Quest History:** Streak tracking, total completions, next availability timer
• **Random Mission Statistics:** Total completed, success rates, favorite types
• **Progress Metrics:** Total faction quests completed, XP earned from faction quests
• **Milestone Tracking:** Upcoming rewards and achievement progress

**\`/inventory [page]\`**
Access organized display of all owned items with interactive usage options.

**Inventory Organization:**
• **Categories:** Consumables, Equipment, Quest Items, Materials
• **Sorting Options:** By type, rarity, quantity, recent acquisition
• **Pagination:** 12 items displayed per page with navigation controls
• **Search Function:** Filter items by name, type, or effect

**Interactive Features:**
• **Dropdown Selection:** Choose items directly from inventory display
• **Quantity Input:** Specify how many items to use via modal dialog
• **Refresh Button:** Update inventory display after item usage
• **Item Information:** Detailed tooltips showing item effects and descriptions

**Item Display Information:**
• Item name with rarity color coding
• Current quantity owned and stack limits
• Brief effect description and usage requirements
• Faction compatibility indicators where relevant

**\`/use <item> [quantity]\`**
Consume items from inventory with intelligent auto-completion and batch usage.

**Auto-Completion Features:**
• **Fuzzy Matching:** Partial names automatically completed
• **Smart Suggestions:** Only suggests actually owned items
• **Case Insensitive:** Works regardless of capitalization
• **Error Correction:** Suggests closest matches for typos

**Usage Examples:**
• \`/use Health Potion\` - Use 1 Health Potion
• \`/use health 3\` - Use 3 Health Potions (fuzzy matching)
• \`/use XP Crystal 5\` - Consume 5 XP Crystals simultaneously
• \`/use Sea King Meat\` - Use faction-specific item with multiple effects

**Batch Usage Rules:**
• Multiple identical items apply cumulative effects
• Stat buffs don't stack (strongest replaces weaker)
• Healing effects stack fully
• Duration buffs reset to maximum duration

**Error Handling:**
• Item not found suggests similar items owned
• Insufficient quantity displays current stock
• Invalid quantity (0, negative, too large) prompts correction
• Items with usage restrictions explain requirements`
            },
            {
                name: 'Information and Help Commands',
                content: `**\`/wiki [category]\`**
Access the comprehensive Cross Realm Chronicles encyclopedia with detailed game mechanics.

**Available Categories:**
• **factions** - In-depth faction guides, abilities, and optimization strategies
• **combat** - Battle mechanics, enemy types, and tactical combat systems
• **progression** - Leveling, stat growth, and character advancement systems
• **quests** - Quest types, faction bonuses, and advanced quest strategies
• **items** - Item categories, usage mechanics, and inventory management
• **commands** - Complete technical reference for all bot commands

**Navigation Features:**
• **Interactive Menus:** Dropdown selection for categories and sections
• **Button Navigation:** Previous/Next buttons for easy section browsing
• **Breadcrumb System:** Always know your current location in the wiki
• **Cross-References:** Links between related topics across categories

**Wiki Content Depth:**
• **Beginner Information:** Basic mechanics and getting started guides
• **Advanced Strategies:** Optimization techniques and min-maxing advice
• **Technical Details:** Exact formulas, probabilities, and mechanical breakdowns
• **Faction Specialization:** Deep dives into each faction's unique systems

**\`/help\`**
Complete beginner's guide specifically designed for new Cross Realm Chronicles players.

**Help Content Sections:**
• **Character Creation Guide:** Detailed faction selection and character naming
• **First Quest Adventure:** Step-by-step guide to the quest system
• **Essential Commands Mastery:** Core command usage and best practices

**Interactive Navigation:**
• **Section Buttons:** Jump directly to specific help topics
• **Progressive Learning:** Information presented in logical learning order
• **Quick Reference:** Essential information highlighted for easy scanning
• **Wiki Integration:** Seamless transition to detailed wiki sections for advanced topics

**Target Audience:**
• **New Players:** Never played Cross Realm Chronicles before
• **Returning Players:** Need refresher on basic mechanics
• **Quick Start:** Want to begin playing immediately with minimal reading
• **Foundation Building:** Preparing for advanced gameplay and optimization

**Content Philosophy:**
• **Practical Focus:** Emphasizes actionable information over theoretical details
• **Example-Heavy:** Shows actual command usage and real scenarios
• **Goal-Oriented:** Provides clear objectives and progression milestones
• **Encouragement:** Builds confidence for new players to explore independently

**Advanced Command Features:**

**Global Command Properties:**
• **Channel Agnostic:** All commands work in any Discord channel
• **Permission Respecting:** Honors Discord server permissions and roles
• **Rate Limited:** Prevents spam while allowing normal usage patterns
• **Error Recovery:** Graceful handling of network issues and timeouts

**Response Types:**
• **Ephemeral Responses:** Some error messages only visible to command user
• **Public Responses:** Game results and character information shared publicly
• **Interactive Components:** Buttons, dropdowns, and modals for enhanced UX
• **Embed Formatting:** Rich, colorful displays with faction-themed styling`
            }
        ]
    }
};

// Format long content strings to prevent Discord embed limits
function formatWikiContent(content) {
    // Discord embed description has a 4096 character limit
    const MAX_LENGTH = 4000;
    
    if (content.length <= MAX_LENGTH) {
        return content;
    }
    
    // Truncate and add continuation indicator
    const truncated = content.substring(0, MAX_LENGTH - 100);
    const lastNewline = truncated.lastIndexOf('\n');
    
    return truncated.substring(0, lastNewline) + '\n\n*... (content continues in next section)*';
}

// Main wiki overview - no longer includes getting_started
function getCategoryOverview() {
    const categoryOverviews = Object.entries(WIKI_CATEGORIES).map(([key, category]) => {
        return `**${category.title}**\n${category.description}`;
    }).join('\n\n');

    const embed = new EmbedBuilder()
        .setTitle('📚 Cross Realm Chronicles - Advanced Game Encyclopedia')
        .setDescription(`Welcome to the comprehensive Cross Realm Chronicles wiki system! This encyclopedia contains in-depth information about advanced game mechanics, optimization strategies, and detailed system explanations.

**🎯 For New Players:** Use \`/help\` for the complete beginner guide!

**📋 Advanced Wiki Categories:**

${categoryOverviews}

**🔍 How to Navigate:**
• Use the dropdown menu below to select a category
• Each category contains multiple detailed sections with deep mechanical explanations
• Use the Previous/Next buttons to navigate between sections
• All information is organized for reference and optimization planning

**💡 Pro Tip:** This wiki focuses on advanced mechanics - master the basics with \`/help\` first!`)
        .setColor(0x00AE86)
        .setFooter({ text: 'Cross Realm Chronicles Advanced Wiki • Select a category to explore detailed mechanics!' });

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('wiki_main_categories')
        .setPlaceholder('📂 Choose an advanced wiki category...')
        .addOptions(
            Object.entries(WIKI_CATEGORIES).map(([key, category]) => ({
                label: category.title,
                value: `wiki_category_${key}`,
                description: category.description.length > 100 
                    ? category.description.substring(0, 97) + '...' 
                    : category.description
            }))
        );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    return {
        embeds: [embed],
        components: [row]
    };
}

// Enhanced category menu creation
function getCategoryMenu(categoryKey) {
    const category = WIKI_CATEGORIES[categoryKey];
    if (!category) return null;

    const sectionList = category.sections.map((section, index) => {
        return `**${index + 1}.** ${section.name}`;
    }).join('\n');

    const embed = new EmbedBuilder()
        .setTitle(`${category.title} - Advanced Mechanics Guide`)
        .setDescription(`${category.description}

**📑 Detailed Sections Available:**

${sectionList}

**🔍 Navigation Instructions:**
• Use the dropdown menu below to select a specific section
• Each section contains detailed mechanical explanations and optimization strategies
• Use the "← Back to Categories" button to return to the main wiki menu
• Navigate between sections using Previous/Next buttons for comprehensive reading`)
        .setColor(0x00AE86)
        .setFooter({ text: `Cross Realm Chronicles Advanced Wiki • ${category.title}` });

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(`wiki_section_${categoryKey}`)
        .setPlaceholder('📄 Choose a detailed section...')
        .addOptions(
            category.sections.map((section, index) => ({
                label: section.name,
                value: `wiki_section_${categoryKey}_${index}`,
                description: `Advanced mechanics - Section ${index + 1} of ${category.sections.length}`
            }))
        );

    const backButton = new ButtonBuilder()
        .setCustomId('wiki_main_menu')
        .setLabel('← Back to Categories')
        .setStyle(ButtonStyle.Secondary);

    const row1 = new ActionRowBuilder().addComponents(selectMenu);
    const row2 = new ActionRowBuilder().addComponents(backButton);

    return {
        embeds: [embed],
        components: [row1, row2]
    };
}

// Enhanced section content display
function getSectionContent(categoryKey, sectionIndex) {
    const category = WIKI_CATEGORIES[categoryKey];
    if (!category || !category.sections[sectionIndex]) return null;

    const section = category.sections[sectionIndex];
    const formattedContent = formatWikiContent(section.content);

    const embed = new EmbedBuilder()
        .setTitle(`${category.title} - ${section.name}`)
        .setDescription(formattedContent)
        .setColor(0x00AE86)
        .setFooter({ 
            text: `Cross Realm Chronicles Advanced Wiki • ${category.title} • Section ${sectionIndex + 1} of ${category.sections.length}` 
        });

    // Navigation buttons
    const backButton = new ButtonBuilder()
        .setCustomId(`wiki_category_${categoryKey}`)
        .setLabel('← Back to Sections')
        .setStyle(ButtonStyle.Secondary);

    const homeButton = new ButtonBuilder()
        .setCustomId('wiki_main_menu')
        .setLabel('🏠 Categories')
        .setStyle(ButtonStyle.Primary);

    const components = [backButton, homeButton];

    // Previous section button
    if (sectionIndex > 0) {
        const prevButton = new ButtonBuilder()
            .setCustomId(`wiki_section_${categoryKey}_${sectionIndex - 1}`)
            .setLabel('⬅️ Previous')
            .setStyle(ButtonStyle.Secondary);
        components.unshift(prevButton);
    }

    // Next section button
    if (sectionIndex < category.sections.length - 1) {
        const nextButton = new ButtonBuilder()
            .setCustomId(`wiki_section_${categoryKey}_${sectionIndex + 1}`)
            .setLabel('Next ➡️')
            .setStyle(ButtonStyle.Secondary);
        components.push(nextButton);
    }

    // Discord has a limit of 5 components per row
    const rows = [];
    for (let i = 0; i < components.length; i += 5) {
        const row = new ActionRowBuilder().addComponents(components.slice(i, i + 5));
        rows.push(row);
    }

    return {
        embeds: [embed],
        components: rows
    };
}

// Helper functions for enhanced navigation
function createMainWikiEmbed() {
    return getCategoryOverview().embeds[0];
}

function createMainMenuNavigation() {
    return getCategoryOverview().components;
}

function createCategoryOverviewEmbed(categoryKey) {
    return getCategoryMenu(categoryKey).embeds[0];
}

function createCategoryNavigation(categoryKey) {
    return getCategoryMenu(categoryKey).components;
}

function createWikiEmbed(categoryKey, sectionIndex) {
    return getSectionContent(categoryKey, sectionIndex).embeds[0];
}

function createWikiNavigation(categoryKey, sectionIndex) {
    return getSectionContent(categoryKey, sectionIndex).components;
}

module.exports = {
    WIKI_CATEGORIES,
    getCategoryOverview,
    getCategoryMenu,
    getSectionContent,
    formatWikiContent,
    createMainWikiEmbed,
    createMainMenuNavigation,
    createCategoryOverviewEmbed,
    createCategoryNavigation,
    createWikiEmbed,
    createWikiNavigation
};