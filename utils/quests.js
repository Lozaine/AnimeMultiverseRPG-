const QUESTS = {
    one_piece: [
        {
            name: 'Treasure Map Discovery',
            description: 'Find an ancient treasure map in a local tavern',
            levelRequirement: 1,
            reward: { experience: 50, gold: 75 },
            successMessage: 'You discovered an old treasure map! The bartender tells you stories of legendary pirates.',
            failureMessage: 'The tavern was too crowded and you couldn\'t find any reliable information about treasures.'
        },
        {
            name: 'Marine Base Infiltration',
            description: 'Sneak into a Marine base to gather intelligence',
            levelRequirement: 3,
            reward: { experience: 100, gold: 150 },
            successMessage: 'You successfully infiltrated the Marine base and obtained valuable intelligence about Marine movements!',
            failureMessage: 'You were spotted by Marine guards and had to flee empty-handed!'
        },
        {
            name: 'Sea King Hunt',
            description: 'Battle a fearsome Sea King in the deep ocean',
            levelRequirement: 5,
            reward: { experience: 200, gold: 300 },
            successMessage: 'You defeated the massive Sea King! Its defeat echoes across the Grand Line.',
            failureMessage: 'The Sea King was too powerful and you barely escaped with your life!'
        },
        {
            name: 'Devil Fruit Search',
            description: 'Search for a legendary Devil Fruit on a mysterious island',
            levelRequirement: 8,
            reward: { experience: 350, gold: 500 },
            successMessage: 'You found a Devil Fruit! Its power now flows through you.',
            failureMessage: 'The island was protected by dangerous creatures and you couldn\'t reach the fruit.'
        }
    ],
    naruto: [
        {
            name: 'Village Patrol Mission',
            description: 'Patrol the village borders and report any suspicious activity',
            levelRequirement: 1,
            reward: { experience: 50, gold: 75 },
            successMessage: 'Your patrol was successful! You helped maintain village security.',
            failureMessage: 'You missed some suspicious activity during your patrol. More training needed.'
        },
        {
            name: 'Bandit Elimination',
            description: 'Eliminate a group of bandits threatening nearby merchants',
            levelRequirement: 3,
            reward: { experience: 100, gold: 150 },
            successMessage: 'You defeated the bandits and saved the merchants! They reward you generously.',
            failureMessage: 'The bandits were more skilled than expected and you had to retreat.'
        },
        {
            name: 'Chunin Exam Trial',
            description: 'Participate in a challenging Chunin Exam trial',
            levelRequirement: 5,
            reward: { experience: 200, gold: 300 },
            successMessage: 'You passed the Chunin Exam trial! Your ninja rank has improved.',
            failureMessage: 'The trial was too difficult and you failed to meet the requirements.'
        },
        {
            name: 'Akatsuki Investigation',
            description: 'Investigate mysterious Akatsuki activity in the region',
            levelRequirement: 8,
            reward: { experience: 350, gold: 500 },
            successMessage: 'You uncovered crucial information about Akatsuki plans! The village is grateful.',
            failureMessage: 'The Akatsuki members detected your presence and you had to abort the mission.'
        }
    ],
    jujutsu_kaisen: [
        {
            name: 'Curse Spirit Exorcism',
            description: 'Exorcise a low-grade curse spirit haunting a school',
            levelRequirement: 1,
            reward: { experience: 50, gold: 75 },
            successMessage: 'You successfully exorcised the curse spirit! The school is now safe.',
            failureMessage: 'The curse spirit was stronger than expected and managed to escape.'
        },
        {
            name: 'Cursed Object Retrieval',
            description: 'Retrieve a dangerous cursed object before it causes harm',
            levelRequirement: 3,
            reward: { experience: 100, gold: 150 },
            successMessage: 'You secured the cursed object! It\'s now safely contained.',
            failureMessage: 'The cursed object\'s influence was too strong and you couldn\'t approach it.'
        },
        {
            name: 'Special Grade Investigation',
            description: 'Investigate reports of a Special Grade curse manifestation',
            levelRequirement: 5,
            reward: { experience: 200, gold: 300 },
            successMessage: 'You gathered crucial intelligence on the Special Grade curse! Jujutsu High is impressed.',
            failureMessage: 'The Special Grade curse\'s presence was overwhelming and you had to retreat.'
        },
        {
            name: 'Domain Expansion Training',
            description: 'Train to develop your own Domain Expansion technique',
            levelRequirement: 8,
            reward: { experience: 350, gold: 500 },
            successMessage: 'You successfully manifested your Domain Expansion! Your cursed technique has evolved.',
            failureMessage: 'The Domain Expansion training was too intense and you couldn\'t maintain it.'
        }
    ],
    demon_slayer: [
        {
            name: 'Final Selection Trial',
            description: 'Survive the dangerous Final Selection on Mount Fujikasane',
            levelRequirement: 1,
            reward: { experience: 50, gold: 75 },
            successMessage: 'You survived the Final Selection! You are now officially a Demon Slayer.',
            failureMessage: 'The demons on the mountain were too numerous and you barely escaped.'
        },
        {
            name: 'Demon Hunt Mission',
            description: 'Hunt down a demon terrorizing a nearby village',
            levelRequirement: 3,
            reward: { experience: 100, gold: 150 },
            successMessage: 'You successfully slayed the demon! The village celebrates your heroism.',
            failureMessage: 'The demon was more cunning than expected and escaped into the night.'
        },
        {
            name: 'Breathing Technique Mastery',
            description: 'Master an advanced form of your breathing technique',
            levelRequirement: 5,
            reward: { experience: 200, gold: 300 },
            successMessage: 'You mastered a new breathing form! Your combat abilities have greatly improved.',
            failureMessage: 'The breathing technique was too complex and you couldn\'t maintain the proper form.'
        },
        {
            name: 'Twelve Kizuki Encounter',
            description: 'Face one of the powerful Twelve Kizuki demons',
            levelRequirement: 8,
            reward: { experience: 350, gold: 500 },
            successMessage: 'You defeated one of the Twelve Kizuki! Your name will be remembered among the Corps.',
            failureMessage: 'The Twelve Kizuki demon was incredibly powerful and you barely survived the encounter.'
        }
    ]
};

// Generate a random quest based on faction and level
function generateQuest(faction, level) {
    const factionQuests = QUESTS[faction];
    const availableQuests = factionQuests.filter(quest => quest.levelRequirement <= level);
    
    if (availableQuests.length === 0) {
        return null;
    }
    
    return availableQuests[Math.floor(Math.random() * availableQuests.length)];
}

// Calculate quest success rate based on character level and quest difficulty
function calculateSuccessRate(characterLevel, questLevel) {
    const baseDifficulty = 0.6;
    const levelDifference = characterLevel - questLevel;
    const successRate = baseDifficulty + (levelDifference * 0.1);
    
    return Math.max(0.1, Math.min(0.9, successRate));
}

module.exports = {
    QUESTS,
    generateQuest,
    calculateSuccessRate
};
