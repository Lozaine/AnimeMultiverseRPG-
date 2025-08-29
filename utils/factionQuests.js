const FACTION_QUESTS = {
    one_piece: [
        // Beginner Arc (1-10)
        {
            title: "Setting Sail: Your First Crew",
            description: "Every great pirate needs a crew! You've found a ragtag group of misfits at the local tavern. Time to convince them to join your adventure with promises of treasure and glory!",
            rewards: { xp: 15, coins: 25 },
            itemChance: 10,
            possibleItems: [{ name: 'Recruitment Poster', description: 'Attracts new crew members faster.', type: 'tool' }],
            questType: 'story',
            difficulty: 1
        },
        {
            title: "The Stolen Map Fragment",
            description: "A mysterious stranger approaches you in the dead of night. They claim to have stolen a piece of a legendary treasure map from the Marines, but now they're being hunted. Help them escape!",
            rewards: { xp: 20, coins: 35 },
            itemChance: 15,
            possibleItems: [{ name: 'Map Fragment #1', description: 'One piece of a legendary treasure map.', type: 'quest_item' }],
            questType: 'story',
            difficulty: 1
        },
        {
            title: "Baratie Brawl",
            description: "You've stopped at the famous floating restaurant Baratie for a meal, but things got heated when someone insulted your crew's dream. Time to defend your honor in a classic restaurant brawl!",
            rewards: { xp: 25, coins: 40 },
            itemChance: 20,
            possibleItems: [{ name: 'Chef\'s Special', description: 'Restores HP during battles.', type: 'consumable' }],
            questType: 'combat',
            difficulty: 2
        },
        {
            title: "Devil Fruit Rumors",
            description: "Word on the street is that a Devil Fruit has washed ashore on a nearby island. Race against other pirates to claim this incredible power before someone else does!",
            rewards: { xp: 40, coins: 60 },
            itemChance: 35,
            possibleItems: [
                { name: 'Mystery Devil Fruit', description: 'A Devil Fruit with unknown powers. Consume at your own risk!', type: 'consumable' },
                { name: 'Devil Fruit Encyclopedia Page', description: 'Learn about Devil Fruit powers.', type: 'book' }
            ],
            questType: 'exploration',
            difficulty: 2
        },
        {
            title: "Marine Base Infiltration",
            description: "Intelligence suggests the Marines are holding one of your crew's old friends prisoner. Sneak into their base, avoid the guards, and execute a daring rescue mission!",
            rewards: { xp: 50, coins: 75 },
            itemChance: 40,
            possibleItems: [
                { name: 'Marine Uniform', description: 'Perfect for disguises and infiltration.', type: 'armor' },
                { name: 'Prison Keys', description: 'Useful for future jail breaks.', type: 'tool' }
            ],
            questType: 'stealth',
            difficulty: 3
        },
        {
            title: "The Kraken's Challenge",
            description: "Your ship has entered the territory of a massive Sea King known as the Kraken. It's challenging you to prove your worth as a pirate crew. Will you fight, flee, or find a clever third option?",
            rewards: { xp: 65, coins: 90 },
            itemChance: 50,
            possibleItems: [
                { name: 'Kraken Tentacle', description: 'Powerful crafting material from a legendary sea beast.', type: 'material' },
                { name: 'Sea King\'s Respect', description: 'Grants safe passage through dangerous waters.', type: 'buff' }
            ],
            questType: 'boss_fight',
            difficulty: 4
        },
        {
            title: "Loguetown Showdown",
            description: "You've arrived at Loguetown, the town where the Pirate King was executed. As you pay your respects, Marine Captain Smoker appears with backup. Time for an epic escape!",
            rewards: { xp: 80, coins: 110 },
            itemChance: 60,
            possibleItems: [
                { name: 'Pirate King\'s Legacy', description: 'A mysterious item left behind at the execution platform.', type: 'artifact' },
                { name: 'Smoker\'s Cigars', description: 'Intimidates weaker enemies.', type: 'consumable' }
            ],
            questType: 'boss_fight',
            difficulty: 5
        },
        {
            title: "Grand Line Entry Exam",
            description: "The entrance to the Grand Line is treacherous. Navigate Reverse Mountain's deadly currents while avoiding whirlpools, sea monsters, and competing pirate crews!",
            rewards: { xp: 100, coins: 150 },
            itemChance: 70,
            possibleItems: [
                { name: 'Log Pose', description: 'Essential navigation tool for the Grand Line.', type: 'tool' },
                { name: 'Weather Prediction Manual', description: 'Helps predict Grand Line\'s chaotic weather.', type: 'book' }
            ],
            questType: 'exploration',
            difficulty: 6
        },
        {
            title: "Whiskey Peak Welcome",
            description: "You've landed on Whiskey Peak, where the locals are throwing you an amazing party! But something feels off... Are these friendly townspeople hiding a dangerous secret?",
            rewards: { xp: 120, coins: 180 },
            itemChance: 75,
            possibleItems: [
                { name: 'Baroque Works Intel', description: 'Information about a secret criminal organization.', type: 'intel' },
                { name: 'Bounty Hunter\'s Weapon', description: 'A weapon taken from defeated bounty hunters.', type: 'weapon' }
            ],
            questType: 'mystery',
            difficulty: 6
        },
        {
            title: "The Drum Kingdom Crisis",
            description: "The Drum Kingdom is in chaos! The tyrant king Wapol has returned, and the people need a hero. Help defend the castle and prove that pirates can be forces for good!",
            rewards: { xp: 150, coins: 200 },
            itemChance: 80,
            possibleItems: [
                { name: 'Royal Drum Crown', description: 'Symbol of authority in the Drum Kingdom.', type: 'accessory' },
                { name: 'Medical Supplies', description: 'Rare healing items from Dr. Kureha.', type: 'consumable' }
            ],
            questType: 'story',
            difficulty: 7
        }
    ],

    naruto: [
        // Academy to Genin Arc (1-10)
        {
            title: "Academy Graduation Exam",
            description: "It's time for your final exam at the Ninja Academy! Master the Clone Jutsu, show your shuriken skills, and prove you're ready to become a Genin!",
            rewards: { xp: 15, coins: 20 },
            itemChance: 10,
            possibleItems: [{ name: 'Genin Headband', description: 'Symbol of your ninja village.', type: 'accessory' }],
            questType: 'exam',
            difficulty: 1
        },
        {
            title: "Team Formation Drama",
            description: "You've been assigned to a three-person squad, but your teammates seem... difficult. One's an overachiever, the other barely speaks. Time to build some team chemistry!",
            rewards: { xp: 20, coins: 25 },
            itemChance: 15,
            possibleItems: [{ name: 'Team Photo', description: 'Boosts morale when fighting alongside allies.', type: 'memento' }],
            questType: 'social',
            difficulty: 1
        },
        {
            title: "Bell Test Survival",
            description: "Your Jonin sensei has given you an impossible task: steal two bells from them before noon, but there are three of you. Is this really about the bells, or something deeper?",
            rewards: { xp: 30, coins: 35 },
            itemChance: 25,
            possibleItems: [
                { name: 'Sensei\'s Bell', description: 'A reminder of an important lesson about teamwork.', type: 'memento' },
                { name: 'Basic Strategy Manual', description: 'Improves success on team missions.', type: 'book' }
            ],
            questType: 'test',
            difficulty: 2
        },
        {
            title: "Mission: Tora the Cat",
            description: "Your first official mission is to catch the Fire Daimyo's escaped cat, Tora. Sounds simple? This cat has ninja-level evasion skills and a serious attitude problem!",
            rewards: { xp: 25, coins: 40 },
            itemChance: 20,
            possibleItems: [
                { name: 'Cat Treats', description: 'Useful for taming aggressive animals.', type: 'tool' },
                { name: 'Scratched Headband', description: 'Battle scars from your encounter with Tora.', type: 'trophy' }
            ],
            questType: 'capture',
            difficulty: 2
        },
        {
            title: "Bandit Camp Cleanup",
            description: "A group of bandits has been terrorizing local merchants. Your team is tasked with driving them off. Remember: ninjas prefer stealth and strategy over brute force!",
            rewards: { xp: 45, coins: 55 },
            itemChance: 30,
            possibleItems: [
                { name: 'Bandit\'s Map', description: 'Shows locations of hidden treasures.', type: 'tool' },
                { name: 'Improvised Kunai', description: 'Crude but effective throwing weapon.', type: 'weapon' }
            ],
            questType: 'combat',
            difficulty: 3
        },
        {
            title: "The Chunin Exams Invitation",
            description: "You've been recommended for the Chunin Exams! But first, you need to prove yourself worthy by completing a dangerous B-rank mission in the Forest of Death.",
            rewards: { xp: 60, coins: 70 },
            itemChance: 40,
            possibleItems: [
                { name: 'Forest Survival Kit', description: 'Essential gear for surviving dangerous environments.', type: 'tool' },
                { name: 'Giant Centipede Poison', description: 'Potent toxin for coating weapons.', type: 'consumable' }
            ],
            questType: 'survival',
            difficulty: 4
        },
        {
            title: "Written Exam Mind Games",
            description: "The first phase of the Chunin Exams is a written test, but it's really about information gathering and cheating without getting caught. Use your ninja skills to succeed!",
            rewards: { xp: 50, coins: 80 },
            itemChance: 35,
            possibleItems: [
                { name: 'Hidden Camera', description: 'Perfect for reconnaissance missions.', type: 'tool' },
                { name: 'Invisible Ink', description: 'For secret messages and communication.', type: 'consumable' }
            ],
            questType: 'infiltration',
            difficulty: 4
        },
        {
            title: "Forest of Death Survival",
            description: "Welcome to the Forest of Death! You have 5 days to reach the center with both Heaven and Earth scrolls. But every team wants what you have, and the forest itself is trying to kill you!",
            rewards: { xp: 80, coins: 100 },
            itemChance: 50,
            possibleItems: [
                { name: 'Heaven Scroll', description: 'Required for advancing in the Chunin Exams.', type: 'quest_item' },
                { name: 'Earth Scroll', description: 'Pairs with Heaven Scroll for exam advancement.', type: 'quest_item' }
            ],
            questType: 'survival',
            difficulty: 5
        },
        {
            title: "Preliminary Round Battles",
            description: "Too many teams passed the second exam! Time for one-on-one elimination matches. Show off your unique jutsu and prove you deserve to advance to the finals!",
            rewards: { xp: 100, coins: 120 },
            itemChance: 60,
            possibleItems: [
                { name: 'Signature Jutsu Scroll', description: 'Contains your personal fighting technique.', type: 'skill' },
                { name: 'Medical Ninja\'s Kit', description: 'For treating injuries between battles.', type: 'consumable' }
            ],
            questType: 'tournament',
            difficulty: 6
        },
        {
            title: "The Invasion Begins",
            description: "The Chunin Exam finals have been interrupted by an invasion! Enemy ninjas are attacking the village. Will you help defend your home or pursue personal goals?",
            rewards: { xp: 150, coins: 180 },
            itemChance: 75,
            possibleItems: [
                { name: 'Village Defender Badge', description: 'Proof of your loyalty during the crisis.', type: 'medal' },
                { name: 'Emergency Ration Pills', description: 'Restores chakra in desperate situations.', type: 'consumable' }
            ],
            questType: 'war',
            difficulty: 7
        }
    ],

    jujutsu_kaisen: [
        // First Year Sorcerer Arc (1-10)
        {
            title: "Curse Detection Training",
            description: "As a new first-year at Tokyo Jujutsu High, you're learning to see Cursed Spirits. Your assignment: spend a night in the supposedly haunted school library and document any supernatural activity.",
            rewards: { xp: 15, coins: 25 },
            itemChance: 10,
            possibleItems: [{ name: 'Spirit Detection Glasses', description: 'Makes weak curses easier to spot.', type: 'tool' }],
            questType: 'investigation',
            difficulty: 1
        },
        {
            title: "First Exorcism Jitters",
            description: "Gojo-sensei thinks you're ready for your first real mission! A Grade 4 curse has been terrorizing a local convenience store. Time to put your training to the test!",
            rewards: { xp: 25, coins: 30 },
            itemChance: 20,
            possibleItems: [
                { name: 'Cursed Energy Residue', description: 'Raw material for creating cursed tools.', type: 'material' },
                { name: 'Convenience Store Coupon', description: 'Free snacks! (Restores a small amount of HP)', type: 'consumable' }
            ],
            questType: 'exorcism',
            difficulty: 2
        },
        {
            title: "Cursed Womb Investigation",
            description: "A Cursed Womb has been detected at a local detention center. You and your classmates are sent to investigate, but you're warned: do NOT engage if it's above Grade 2!",
            rewards: { xp: 40, coins: 50 },
            itemChance: 30,
            possibleItems: [
                { name: 'Detention Center Keys', description: 'Useful for infiltration missions.', type: 'tool' },
                { name: 'Emergency Flare', description: 'Calls for backup when in danger.', type: 'consumable' }
            ],
            questType: 'investigation',
            difficulty: 3
        },
        {
            title: "Special Grade Emergency",
            description: "The Cursed Womb has matured into a Special Grade Cursed Spirit! You're trapped inside with civilians to protect. Survive until help arrives, and try not to become curse food!",
            rewards: { xp: 60, coins: 80 },
            itemChance: 40,
            possibleItems: [
                { name: 'Finger of Sukuna', description: 'Incredibly dangerous cursed object with immense power.', type: 'cursed_object' },
                { name: 'Protective Charm', description: 'Reduces damage from cursed techniques.', type: 'accessory' }
            ],
            questType: 'survival',
            difficulty: 4
        },
        {
            title: "The King of Curses Awakens",
            description: "In a desperate moment, you consumed Sukuna's finger to save your friends. Now the King of Curses has awakened inside you. Can you maintain control, or will you become a threat to everyone?",
            rewards: { xp: 80, coins: 100 },
            itemChance: 50,
            possibleItems: [
                { name: 'Sukuna\'s Mark', description: 'Proof of your connection to the King of Curses.', type: 'curse_mark' },
                { name: 'Binding Vow Contract', description: 'Allows you to make powerful spiritual contracts.', type: 'tool' }
            ],
            questType: 'internal_conflict',
            difficulty: 5
        },
        {
            title: "Kyoto Sister School Exchange",
            description: "It's time for the annual exchange event with Kyoto Jujutsu High! Compete in team battles and prove that Tokyo's first-years are the strongest generation yet!",
            rewards: { xp: 70, coins: 90 },
            itemChance: 45,
            possibleItems: [
                { name: 'Exchange Trophy', description: 'Proof of victory over Kyoto students.', type: 'trophy' },
                { name: 'Team Spirit Badge', description: 'Boosts performance when fighting with allies.', type: 'accessory' }
            ],
            questType: 'competition',
            difficulty: 4
        },
        {
            title: "Cursed Technique Development",
            description: "Under Gojo's guidance, you're developing your unique Cursed Technique. Training is intense, and you must push your limits to unlock your true potential!",
            rewards: { xp: 90, coins: 110 },
            itemChance: 60,
            possibleItems: [
                { name: 'Personal CT Manual', description: 'Documentation of your unique Cursed Technique.', type: 'skill' },
                { name: 'Training Weights', description: 'Increases physical conditioning.', type: 'training_gear' }
            ],
            questType: 'training',
            difficulty: 5
        },
        {
            title: "The Shibuya Incident Begins",
            description: "Cursed Spirits have trapped hundreds of civilians in Shibuya station, demanding Gojo Satoru's presence. You're part of the rescue team, but this feels like a trap...",
            rewards: { xp: 120, coins: 150 },
            itemChance: 70,
            possibleItems: [
                { name: 'Shibuya Station Map', description: 'Detailed layout of the incident area.', type: 'tool' },
                { name: 'Civilian Rescue Kit', description: 'Equipment for saving trapped people.', type: 'tool' }
            ],
            questType: 'rescue',
            difficulty: 6
        },
        {
            title: "Domain Expansion Training",
            description: "You're attempting to learn Domain Expansion, the pinnacle of Jujutsu sorcery. Create your own pocket dimension where your cursed technique reigns supreme!",
            rewards: { xp: 140, coins: 180 },
            itemChance: 75,
            possibleItems: [
                { name: 'Domain Core', description: 'The foundation for your personal Domain Expansion.', type: 'domain_fragment' },
                { name: 'Reality Marble Theory', description: 'Advanced text on dimensional manipulation.', type: 'book' }
            ],
            questType: 'ultimate_training',
            difficulty: 7
        },
        {
            title: "The Culling Game Invitation",
            description: "You've been marked as a player in the Culling Game, a deadly tournament where sorcerers must kill each other to survive. The rules are simple: kill or be killed.",
            rewards: { xp: 200, coins: 250 },
            itemChance: 85,
            possibleItems: [
                { name: 'Player Marker', description: 'Identifies you as a Culling Game participant.', type: 'cursed_object' },
                { name: 'Game Rules Manual', description: 'Contains the complete rules of the Culling Game.', type: 'book' }
            ],
            questType: 'death_game',
            difficulty: 8
        }
    ],

    demon_slayer: [
        // Demon Slayer Corps Initiation (1-10)
        {
            title: "Final Selection Preparation",
            description: "You've trained for two years and now it's time for Final Selection on Mount Fujikasane. Survive seven days among demons trapped by wisteria flowers. Only the strong will become Demon Slayers!",
            rewards: { xp: 20, coins: 25 },
            itemChance: 15,
            possibleItems: [{ name: 'Wisteria Charm', description: 'Provides minor protection against weak demons.', type: 'accessory' }],
            questType: 'survival_exam',
            difficulty: 1
        },
        {
            title: "First Demon Encounter",
            description: "On your first night of Final Selection, you encounter a grotesque demon feeding on a fellow candidate. Your Nichirin Blade trembles in your hands. Can you overcome your fear?",
            rewards: { xp: 30, coins: 35 },
            itemChance: 25,
            possibleItems: [
                { name: 'Demon Blood Sample', description: 'Could be useful for Tamayo\'s research.', type: 'material' },
                { name: 'Broken Mask Fragment', description: 'Reminder of your first demon kill.', type: 'memento' }
            ],
            questType: 'first_kill',
            difficulty: 2
        },
        {
            title: "The Hand Demon's Challenge",
            description: "A massive Hand Demon blocks your path, boasting about the 13 apprentices of Sakonji it has devoured. This isn't just about survival anymore - it's about justice for the fallen!",
            rewards: { xp: 50, coins: 60 },
            itemChance: 40,
            possibleItems: [
                { name: 'Hand Demon\'s Mask', description: 'Trophy from defeating a powerful demon.', type: 'trophy' },
                { name: 'Sakonji\'s Blessing', description: 'Increases success rate on difficult missions.', type: 'blessing' }
            ],
            questType: 'boss_battle',
            difficulty: 3
        },
        {
            title: "Ore Selection Ceremony",
            description: "You've survived Final Selection! Now choose the ore for your Nichirin Blade. The color will reveal your breathing style compatibility. What destiny awaits?",
            rewards: { xp: 40, coins: 70 },
            itemChance: 60,
            possibleItems: [
                { name: 'Black Nichirin Ore', description: 'Rare ore that creates unpredictable blade colors.', type: 'material' },
                { name: 'Kasugai Crow', description: 'Your personal messenger and mission coordinator.', type: 'companion' }
            ],
            questType: 'ceremony',
            difficulty: 2
        },
        {
            title: "First Mission: The Kidnapping Demon",
            description: "Your first official mission: a demon has been kidnapping young girls in a nearby town. Track it down, save the victims, and prove yourself as a Demon Slayer!",
            rewards: { xp: 60, coins: 80 },
            itemChance: 35,
            possibleItems: [
                { name: 'Rescue Rope', description: 'Essential gear for saving trapped victims.', type: 'tool' },
                { name: 'Town Gratitude Letter', description: 'Proof of your good deeds.', type: 'memento' }
            ],
            questType: 'rescue_mission',
            difficulty: 3
        },
        {
            title: "Tsuzumi Mansion Horror",
            description: "You're investigating a mansion where the rooms constantly shift and drums echo through the halls. A powerful demon controls this maze, and you're not alone - other slayers need your help!",
            rewards: { xp: 75, coins: 100 },
            itemChance: 45,
            possibleItems: [
                { name: 'Tsuzumi Drum', description: 'Allows limited spatial manipulation.', type: 'artifact' },
                { name: 'Mansion Floorplan', description: 'Maps out the shifting room patterns.', type: 'tool' }
            ],
            questType: 'labyrinth',
            difficulty: 4
        },
        {
            title: "Natagumo Mountain Investigation",
            description: "Mount Natagumo is crawling with spider demons and their web of terror. Your fellow slayers are being controlled like puppets. Cut the strings and free them!",
            rewards: { xp: 90, coins: 120 },
            itemChance: 50,
            possibleItems: [
                { name: 'Spider Silk Thread', description: 'Incredibly strong material for crafting.', type: 'material' },
                { name: 'Puppet Control Antidote', description: 'Cures mind control effects.', type: 'consumable' }
            ],
            questType: 'infiltration',
            difficulty: 5
        },
        {
            title: "Lower Moon Encounter",
            description: "You've encountered Rui, Lower Moon Five of the Twelve Kizuki! His blood demon art creates nearly unbreakable threads. You'll need to unlock your full potential to survive!",
            rewards: { xp: 120, coins: 150 },
            itemChance: 65,
            possibleItems: [
                { name: 'Kizuki Blood Sample', description: 'Extremely rare demon blood from a Twelve Kizuki.', type: 'rare_material' },
                { name: 'Thread-Cutting Technique', description: 'Special sword technique for cutting demon threads.', type: 'skill' }
            ],
            questType: 'kizuki_battle',
            difficulty: 6
        },
        {
            title: "Hashira Training Camp",
            description: "You've been selected for special training with the Hashira! Each pillar will test your limits in different ways. Survive their brutal training regimens!",
            rewards: { xp: 140, coins: 180 },
            itemChance: 70,
            possibleItems: [
                { name: 'Hashira Recommendation', description: 'Official endorsement from a Pillar.', type: 'certificate' },
                { name: 'Advanced Breathing Manual', description: 'Contains techniques from multiple breathing styles.', type: 'skill_book' }
            ],
            questType: 'intensive_training',
            difficulty: 6
        },
        {
            title: "Mugen Train Mission",
            description: "Forty passengers have disappeared on the Mugen Train. You're joining the Flame Hashira Rengoku on this investigation. But something feels wrong about this endless night journey...",
            rewards: { xp: 200, coins: 250 },
            itemChance: 80,
            possibleItems: [
                { name: 'Flame Breathing Scroll', description: 'Contains Rengoku\'s flame breathing techniques.', type: 'legendary_skill' },
                { name: 'Train Conductor\'s Lantern', description: 'Illuminates hidden truths and illusions.', type: 'artifact' }
            ],
            questType: 'major_mission',
            difficulty: 7
        }
    ]
};

// Quest generation utilities for variety
const QUEST_DESCRIPTORS = {
    locations: [
        "abandoned warehouse", "haunted shrine", "cursed forest", "underground tunnel",
        "floating island", "mysterious cave", "ancient temple", "demon's lair",
        "pirate ship graveyard", "ninja training ground", "sorcerer academy", "demon slayer corps HQ"
    ],
    enemies: [
        "rogue ninja", "cursed spirit", "bloodthirsty demon", "rival pirate crew",
        "corrupt marine", "bounty hunter", "possessed civilian", "ancient guardian"
    ],
    objectives: [
        "retrieve stolen artifact", "rescue captured ally", "investigate disappearances",
        "defend innocent civilians", "uncover conspiracy", "master new technique",
        "survive deadly trial", "defeat powerful enemy"
    ],
    complications: [
        "but it's a trap!", "while being hunted by enemies", "before time runs out",
        "without alerting the guards", "despite your injuries", "in complete darkness",
        "while protecting civilians", "with limited resources"
    ]
};

// Random quest generator for side missions
function generateRandomQuest(faction, difficulty = 1) {
    const location = QUEST_DESCRIPTORS.locations[Math.floor(Math.random() * QUEST_DESCRIPTORS.locations.length)];
    const enemy = QUEST_DESCRIPTORS.enemies[Math.floor(Math.random() * QUEST_DESCRIPTORS.enemies.length)];
    const objective = QUEST_DESCRIPTORS.objectives[Math.floor(Math.random() * QUEST_DESCRIPTORS.objectives.length)];
    const complication = QUEST_DESCRIPTORS.complications[Math.floor(Math.random() * QUEST_DESCRIPTORS.complications.length)];

    const baseRewards = { xp: 10 + (difficulty * 15), coins: 15 + (difficulty * 20) };
    const itemChance = Math.min(10 + (difficulty * 10), 75);

    return {
        title: `Side Mission: ${objective.charAt(0).toUpperCase() + objective.slice(1)}`,
        description: `Your mission takes you to a ${location} where you must ${objective}, ${complication}`,
        rewards: baseRewards,
        itemChance,
        possibleItems: [], // Would be populated based on faction
        questType: 'side_mission',
        difficulty
    };
}

// Daily quest templates
const DAILY_QUESTS = {
    training: [
        "Complete your daily training routine",
        "Practice your signature technique",
        "Spar with a fellow warrior",
        "Meditate to strengthen your spirit"
    ],
    exploration: [
        "Explore a new area of the world map",
        "Search for hidden treasures",
        "Map out unknown territory",
        "Investigate mysterious phenomena"
    ],
    social: [
        "Help a fellow guild member",
        "Share stories at the tavern",
        "Write a letter to family",
        "Attend a village festival"
    ],
    combat: [
        "Defeat 5 enemies in battle",
        "Win a duel against another player",
        "Successfully complete a raid",
        "Protect civilians from danger"
    ]
};

// Quest reward calculation based on difficulty and type
function calculateRewards(difficulty, questType, playerLevel = 1) {
    const baseXP = 15 + (difficulty * 10) + (playerLevel * 2);
    const baseCoins = 20 + (difficulty * 15) + (playerLevel * 3);

    const typeMultipliers = {
        'story': 1.2,
        'boss_fight': 1.5,
        'kizuki_battle': 2.0,
        'death_game': 2.5,
        'major_mission': 1.8,
        'side_mission': 0.8,
        'daily': 0.5
    };

    const multiplier = typeMultipliers[questType] || 1.0;

    return {
        xp: Math.floor(baseXP * multiplier),
        coins: Math.floor(baseCoins * multiplier)
    };
}

// Enhanced quest types with special mechanics
const QUEST_TYPES = {
    story: { emoji: "📖", description: "Main storyline quest" },
    combat: { emoji: "⚔️", description: "Battle-focused mission" },
    stealth: { emoji: "🥷", description: "Requires sneaking and cunning" },
    exploration: { emoji: "🗺️", description: "Discover new locations" },
    survival: { emoji: "💀", description: "Endurance challenge" },
    boss_fight: { emoji: "👹", description: "Face a powerful enemy" },
    mystery: { emoji: "🔍", description: "Solve puzzles and uncover secrets" },
    rescue: { emoji: "🆘", description: "Save people in danger" },
    tournament: { emoji: "🏆", description: "Compete against others" },
    training: { emoji: "💪", description: "Improve your abilities" },
    side_mission: { emoji: "📝", description: "Optional side quest" },
    daily: { emoji: "📅", description: "Daily repeatable quest" }
};

// Faction-specific random events that can occur during quests
const FACTION_EVENTS = {
    one_piece: [
        { event: "Sea King Attack!", description: "A massive Sea King emerges from the depths!", effect: "combat_encounter" },
        { event: "Marine Ambush!", description: "Marine ships surround you!", effect: "chase_sequence" },
        { event: "Devil Fruit Discovery!", description: "You find a mysterious Devil Fruit!", effect: "rare_item" },
        { event: "Treasure Map Clue!", description: "You discover part of an ancient treasure map!", effect: "map_fragment" },
        { event: "Friendly Pirates!", description: "Another pirate crew offers to help!", effect: "temporary_ally" }
    ],
    naruto: [
        { event: "Ambush by Rogue Ninja!", description: "Enemy ninjas attack from the shadows!", effect: "stealth_combat" },
        { event: "Chakra Exhaustion!", description: "You've used too much chakra!", effect: "stamina_penalty" },
        { event: "Hidden Jutsu Scroll!", description: "You find an ancient technique!", effect: "new_skill" },
        { event: "Summon Animal Appears!", description: "A spirit animal offers its aid!", effect: "summon_ally" },
        { event: "Trap Detection!", description: "Your ninja training saves you from a trap!", effect: "avoid_damage" }
    ],
    jujutsu_kaisen: [
        { event: "Curse Surge!", description: "Cursed energy spikes dangerously!", effect: "cursed_debuff" },
        { event: "Domain Clash!", description: "Two domains collide!", effect: "reality_warp" },
        { event: "Sukuna Stirs!", description: "The King of Curses becomes restless!", effect: "power_boost_risk" },
        { event: "Cursed Tool Discovery!", description: "You find a powerful cursed weapon!", effect: "cursed_weapon" },
        { event: "Binding Vow Opportunity!", description: "You can make a deal for more power!", effect: "power_contract" }
    ],
    demon_slayer: [
        { event: "Demon Ambush!", description: "A demon attacks without warning!", effect: "surprise_combat" },
        { event: "Breathing Focus!", description: "Your breathing technique reaches a new level!", effect: "technique_boost" },
        { event: "Wisteria Blessing!", description: "Wisteria flowers provide protection!", effect: "demon_ward" },
        { event: "Injured Slayer!", description: "You find a wounded comrade!", effect: "rescue_opportunity" },
        { event: "Nichirin Resonance!", description: "Your blade glows with power!", effect: "weapon_enhancement" }
    ]
};

// Weekly boss rotation for endgame content
const WEEKLY_BOSSES = {
    one_piece: [
        { name: "Crocodile", title: "Desert King", rewards: ["Logia Sand Powers", "Desert Spada Technique"] },
        { name: "Enel", title: "God of Skypiea", rewards: ["Lightning Abilities", "Mantra Observation"] },
        { name: "Rob Lucci", title: "CP9 Assassin", rewards: ["Rokushiki Techniques", "Zoan Transformation"] }
    ],
    naruto: [
        { name: "Orochimaru", title: "The Snake Sannin", rewards: ["Snake Summoning", "Forbidden Jutsu"] },
        { name: "Itachi Uchiha", title: "The Crow", rewards: ["Sharingan Techniques", "Genjutsu Mastery"] },
        { name: "Pain", title: "Leader of Akatsuki", rewards: ["Rinnegan Powers", "Six Paths Technique"] }
    ],
    jujutsu_kaisen: [
        { name: "Mahito", title: "Cursed Spirit", rewards: ["Soul Manipulation", "Domain Fragment"] },
        { name: "Jogo", title: "Disaster Curse", rewards: ["Volcanic Techniques", "Fire Immunity"] },
        { name: "Geto Suguru", title: "Curse User", rewards: ["Curse Manipulation", "Maximum Uzumaki"] }
    ],
    demon_slayer: [
        { name: "Akaza", title: "Upper Moon Three", rewards: ["Destructive Death", "Regeneration Boost"] },
        { name: "Doma", title: "Upper Moon Two", rewards: ["Ice Techniques", "Blood Art Mastery"] },
        { name: "Kokushibo", title: "Upper Moon One", rewards: ["Moon Breathing", "Transparent World"] }
    ]
};

module.exports = { 
    FACTION_QUESTS, 
    QUEST_DESCRIPTORS, 
    DAILY_QUESTS,
    QUEST_TYPES,
    FACTION_EVENTS,
    WEEKLY_BOSSES,
    generateRandomQuest,
    calculateRewards
};