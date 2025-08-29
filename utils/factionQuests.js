// utils/factionQuests.js

const FACTION_QUESTS = {
    one_piece: [
        {
            title: "Chapter 1: The Journey Begins",
            description: "You've heard whispers of a legendary treasure map, said to be hidden on a nearby island. Your first step is to acquire a seaworthy vessel and gather some basic supplies.",
            rewards: { xp: 20, coins: 30 },
            itemChance: 0,
            possibleItems: []
        },
        {
            title: "Chapter 2: The Whispering Cove",
            description: "With your ship ready, you set sail towards the Whispering Cove. You must navigate treacherous waters and avoid marine patrols to find the hidden grotto where the map piece is said to be.",
            rewards: { xp: 30, coins: 40 },
            itemChance: 0,
            possibleItems: []
        },
        {
            title: "Chapter 3: The Grotto's Guardian",
            description: "Inside the grotto, you find the map piece, but it's guarded by a territorial Sea King. You must fight it off to claim your prize.",
            rewards: { xp: 45, coins: 60 },
            itemChance: 30,
            possibleItems: [{ name: 'Sea King Scale', description: 'A rare crafting material.', type: 'material' }]
        },
        {
            title: "Chapter 4: Race Against the Marines",
            description: "You've got the map piece, but the Marines have been tipped off! You must outmaneuver their lead ship and escape the cove before they blockade the exit.",
            rewards: { xp: 60, coins: 80 },
            itemChance: 50,
            possibleItems: [{ name: 'Marine Spyglass', description: 'Increases success on delivery quests.', type: 'tool' }]
        },
        {
            title: "Chapter 5: The Dawn of a Legend",
            description: "You've escaped the Marines and secured the first piece of the legendary map. This victory solidifies your reputation as a promising new pirate on the Grand Line.",
            rewards: { xp: 100, coins: 100 },
            itemChance: 100,
            possibleItems: [{ name: 'Log Pose', description: 'An essential tool for navigating the Grand Line.', type: 'tool' }]
        }
    ],
    naruto: [
        {
            title: "Chapter 1: The Genin Test",
            description: "Your first official mission as a Shinobi is a test from your village elders. You must discreetly gather intelligence from a neighboring town without being detected.",
            rewards: { xp: 20, coins: 25 },
            itemChance: 0,
            possibleItems: []
        },
        {
            title: "Chapter 2: The Forest of Shadows",
            description: "The intelligence you gathered points to a group of rogue ninja using the Forest of Shadows as a hideout. You must travel through the forest, setting up perimeter traps.",
            rewards: { xp: 30, coins: 35 },
            itemChance: 0,
            possibleItems: []
        },
        {
            title: "Chapter 3: First Encounter",
            description: "While setting traps, you're ambushed by a scout from the rogue ninja group. You must defeat them and protect your mission's secrecy.",
            rewards: { xp: 45, coins: 55 },
            itemChance: 30,
            possibleItems: [{ name: 'Rogue Ninja Headband', description: 'A trophy from your first real battle.', type: 'trophy' }]
        },
        {
            title: "Chapter 4: The Infiltration",
            description: "Using the information from the scout, you must infiltrate the rogue ninja's camp to uncover their leader's identity and ultimate goal.",
            rewards: { xp: 60, coins: 80 },
            itemChance: 50,
            possibleItems: [{ name: 'Secret Scroll', description: 'Contains a new Ninjutsu technique.', type: 'book' }]
        },
        {
            title: "Chapter 5: A Shinobi's Will",
            description: "You've successfully identified the leader and their plans. You report back to your village, earning the respect of your superiors and proving your worth as a true Shinobi.",
            rewards: { xp: 100, coins: 100 },
            itemChance: 100,
            possibleItems: [{ name: 'Chunin Vest', description: 'A symbol of your growing rank and skill.', type: 'armor' }]
        }
    ],
    jujutsu_kaisen: [
        {
            title: "Chapter 1: The Cursed Presence",
            description: "A wave of negative energy has been detected at a local abandoned school. As a new Jujutsu Sorcerer, you are tasked with investigating the source.",
            rewards: { xp: 20, coins: 25 },
            itemChance: 0,
            possibleItems: []
        },
        {
            title: "Chapter 2: The Lingering Curse",
            description: "You arrive at the school and find it teeming with low-grade Cursed Spirits. You must exorcise them while searching for the source of the curse.",
            rewards: { xp: 30, coins: 40 },
            itemChance: 0,
            possibleItems: []
        },
        {
            title: "Chapter 3: The Cursed Object",
            description: "You discover the source: a Cursed Object radiating immense negative energy. As you try to secure it, a powerful Cursed Spirit manifests to protect it.",
            rewards: { xp: 45, coins: 60 },
            itemChance: 30,
            possibleItems: [{ name: 'Cursed Finger Sheath', description: 'A container for dangerous cursed objects.', type: 'tool' }]
        },
        {
            title: "Chapter 4: Sealing the Malevolence",
            description: "After defeating the spirit, you must use your Jujutsu to create a barrier and seal the Cursed Object before its energy attracts even more dangerous curses.",
            rewards: { xp: 60, coins: 80 },
            itemChance: 50,
            possibleItems: [{ name: 'Talisman of Sealing', description: 'A powerful one-time use sealing charm.', type: 'consumable' }]
        },
        {
            title: "Chapter 5: A Sorcerer's Duty",
            description: "You successfully seal the Cursed Object and return it to Jujutsu High. Your skill and bravery have been noted, marking you as a sorcerer with great potential.",
            rewards: { xp: 100, coins: 100 },
            itemChance: 100,
            possibleItems: [{ name: 'Black Flash Amulet', description: 'Increases critical hit chance by 20%.', type: 'accessory' }]
        }
    ],
    demon_slayer: [
        {
            title: "Chapter 1: The First Scent of Blood",
            description: "A village has reported a demon lurking nearby. As a new member of the Demon Slayer Corps, you are dispatched to investigate and confirm the threat.",
            rewards: { xp: 20, coins: 30 },
            itemChance: 0,
            possibleItems: []
        },
        {
            title: "Chapter 2: Tracking the Demon",
            description: "You find traces of the demon's presence. You must track it through a dense forest, using your senses to follow its trail while remaining unnoticed.",
            rewards: { xp: 30, coins: 35 },
            itemChance: 0,
            possibleItems: []
        },
        {
            title: "Chapter 3: The Demon's Lair",
            description: "The trail leads to a dark cave. Inside, you confront the demon. It's a swift and cunning creature, and you must use your Breathing Style to fight it.",
            rewards: { xp: 45, coins: 55 },
            itemChance: 30,
            possibleItems: [{ name: 'Demon Blood Sample', description: 'Used for research and crafting.', type: 'material' }]
        },
        {
            title: "Chapter 4: The Sun Rises",
            description: "You've wounded the demon, but it's incredibly resilient. You must hold it off until dawn, as the sunlight is the only thing that can truly destroy it.",
            rewards: { xp: 60, coins: 80 },
            itemChance: 50,
            possibleItems: [{ name: 'Wisteria Poison', description: 'A potent toxin for Nichirin Blades.', type: 'consumable' }]
        },
        {
            title: "Chapter 5: A Promise Kept",
            description: "As the sun's rays vanquish the demon, you stand victorious. You have saved the village and fulfilled your duty, taking your first major step as a Demon Slayer.",
            rewards: { xp: 100, coins: 100 },
            itemChance: 100,
            possibleItems: [{ name: 'Engraved Nichirin Guard', description: 'A custom hilt for your blade, increasing ATK.', type: 'upgrade' }]
        }
    ]
};

module.exports = { FACTION_QUESTS };