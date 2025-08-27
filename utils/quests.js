// Phase 1 Universal Quest Pool
// Faction-neutral quests focused on introducing game mechanics

const PHASE_1_QUESTS = [
    // Gathering & Resource Quests
    {
        id: 'fishing_trip',
        name: 'Fishing Trip',
        description: 'Catch fish for a local vendor',
        category: 'gathering',
        xpReward: 10,
        coinReward: 20,
        itemChance: 25,
        possibleItems: [
            { name: '🐟 Fresh Fish', description: 'Restores 10 HP', type: 'food' }
        ],
        successMessage: 'You spent the day fishing and caught plenty of fish for the vendor. The peaceful time by the water was refreshing.',
        failureMessage: 'The fish weren\'t biting today. You caught very little, but the vendor appreciated your effort.'
    },
    {
        id: 'herbal_collection',
        name: 'Herbal Collection',
        description: 'Collect healing herbs from the forest',
        category: 'gathering',
        xpReward: 8,
        coinReward: 15,
        itemChance: 30,
        possibleItems: [
            { name: '🌿 Healing Herbs', description: 'Restores 8 HP and 5 MP', type: 'healing' }
        ],
        successMessage: 'You carefully gathered healing herbs from the forest. The local healer was grateful for your quality collection.',
        failureMessage: 'Some of the herbs you gathered were damaged, but you managed to collect a few usable ones.'
    },
    {
        id: 'wood_gathering',
        name: 'Wood Gathering',
        description: 'Chop and deliver firewood to a village',
        category: 'gathering',
        xpReward: 12,
        coinReward: 15,
        itemChance: 20,
        possibleItems: [
            { name: '🪵 Quality Wood', description: 'Basic crafting material', type: 'material' }
        ],
        successMessage: 'You chopped and delivered plenty of firewood to the village. The villagers were warm and grateful.',
        failureMessage: 'The wood was harder to chop than expected, but you managed to deliver enough for their needs.'
    },
    {
        id: 'ore_prospecting',
        name: 'Ore Prospecting',
        description: 'Mine basic ore from nearby caves',
        category: 'gathering',
        xpReward: 10,
        coinReward: 18,
        itemChance: 25,
        possibleItems: [
            { name: '⛰️ Iron Ore', description: 'Basic crafting material', type: 'material' }
        ],
        successMessage: 'You discovered a small vein of iron ore in the cave. The local blacksmith was pleased with your find.',
        failureMessage: 'The cave was mostly empty, but you managed to find some small ore fragments.'
    },

    // Hunting & Protection Quests
    {
        id: 'wild_boar_hunt',
        name: 'Hunt the Wild Boar',
        description: 'Defeat a rampaging boar threatening villagers',
        category: 'hunting',
        xpReward: 15,
        coinReward: 25,
        itemChance: 35,
        possibleItems: [
            { name: '🍖 Boar Meat', description: 'Restores 15 HP', type: 'food' }
        ],
        successMessage: 'You successfully defeated the wild boar! The village is safe and the grateful villagers celebrated your victory.',
        failureMessage: 'The boar was tougher than expected and managed to escape, but you scared it away from the village.'
    },
    {
        id: 'wolf_pack_trouble',
        name: 'Wolf Pack Trouble',
        description: 'Chase off a pack of wolves from farmland',
        category: 'hunting',
        xpReward: 15,
        coinReward: 22,
        itemChance: 30,
        possibleItems: [
            { name: '🐺 Wolf Hide', description: 'Basic crafting material', type: 'material' }
        ],
        successMessage: 'You successfully drove off the wolf pack! The farmers\' livestock are now safe and sound.',
        failureMessage: 'The wolves were more cunning than expected, but you managed to scare most of them away.'
    },
    {
        id: 'cave_bat_nest',
        name: 'Cave Bat Nest',
        description: 'Clear bats nesting in a cave',
        category: 'hunting',
        xpReward: 12,
        coinReward: 18,
        itemChance: 25,
        possibleItems: [
            { name: '🦇 Bat Wing', description: 'Alchemy ingredient', type: 'material' }
        ],
        successMessage: 'You cleared out the bat nest successfully! The cave is now safe for travelers to use as shelter.',
        failureMessage: 'The bats were more aggressive than expected, but you managed to clear out most of the nest.'
    },
    {
        id: 'guard_duty',
        name: 'Guard Duty',
        description: 'Protect a merchant cart on the road',
        category: 'protection',
        xpReward: 18,
        coinReward: 20,
        itemChance: 30,
        possibleItems: [
            { name: '💰 Extra Coin Pouch', description: 'Contains 10 extra coins', type: 'currency' }
        ],
        successMessage: 'You successfully protected the merchant cart from bandits! The grateful merchant rewarded you well.',
        failureMessage: 'The journey was uneventful, but your vigilant presence gave the merchant peace of mind.'
    },

    // Delivery & Errand Quests
    {
        id: 'letter_delivery',
        name: 'Letter Delivery',
        description: 'Deliver a message between two towns',
        category: 'delivery',
        xpReward: 10,
        coinReward: 15,
        itemChance: 15,
        possibleItems: [
            { name: '🍞 Fresh Bread', description: 'Restores 8 HP', type: 'food' }
        ],
        successMessage: 'You delivered the letter quickly and safely. Both towns appreciated your reliable service.',
        failureMessage: 'You got a bit lost on the way, but eventually delivered the letter successfully.'
    },
    {
        id: 'supply_run',
        name: 'Supply Run',
        description: 'Help carry goods to a market stall',
        category: 'delivery',
        xpReward: 8,
        coinReward: 12,
        itemChance: 20,
        possibleItems: [
            { name: '🍙 Rice Ball', description: 'Restores 6 HP', type: 'food' }
        ],
        successMessage: 'You helped transport all the goods safely to the market. The merchant was grateful for your strong back.',
        failureMessage: 'Some goods were damaged during transport, but the merchant appreciated your help nonetheless.'
    },
    {
        id: 'water_carrier',
        name: 'Water Carrier',
        description: 'Fetch buckets of water for villagers',
        category: 'errand',
        xpReward: 6,
        coinReward: 10,
        itemChance: 10,
        possibleItems: [
            { name: '💧 Pure Water', description: 'Restores 5 HP and 3 MP', type: 'healing' }
        ],
        successMessage: 'You carried water all day for the villagers. Though simple work, it was much appreciated.',
        failureMessage: 'You spilled some water along the way, but managed to help most of the villagers.'
    },
    {
        id: 'lost_item_hunt',
        name: 'Lost Item Hunt',
        description: 'Find a villager\'s lost trinket',
        category: 'errand',
        xpReward: 8,
        coinReward: 14,
        itemChance: 20,
        possibleItems: [
            { name: '🪙 Lucky Charm', description: '+5 temporary luck boost for next quest', type: 'charm' }
        ],
        successMessage: 'You found the lost trinket hidden under some bushes! The villager was overjoyed to have it back.',
        failureMessage: 'You couldn\'t find the exact item, but you found something similar that made the villager happy.'
    },

    // Social/Community Quests
    {
        id: 'help_farmer',
        name: 'Help the Farmer',
        description: 'Tend crops or scare crows away',
        category: 'community',
        xpReward: 10,
        coinReward: 16,
        itemChance: 25,
        possibleItems: [
            { name: '🥕 Fresh Vegetables', description: 'Restores 12 HP', type: 'food' }
        ],
        successMessage: 'You spent the day helping with farm work. The crops are healthier thanks to your care.',
        failureMessage: 'Some crops were damaged by pests, but your help saved most of the harvest.'
    },
    {
        id: 'repair_work',
        name: 'Repair Work',
        description: 'Fix fences or patch roofs in town',
        category: 'community',
        xpReward: 12,
        coinReward: 18,
        itemChance: 20,
        possibleItems: [
            { name: '🔧 Tool Set', description: 'Basic crafting tools', type: 'material' }
        ],
        successMessage: 'You successfully repaired the damaged structures. The town looks much better thanks to your work.',
        failureMessage: 'The repairs were trickier than expected, but you managed to fix the most important parts.'
    },
    {
        id: 'street_cleanup',
        name: 'Street Cleanup',
        description: 'Collect trash and clear debris',
        category: 'community',
        xpReward: 6,
        coinReward: 8,
        itemChance: 15,
        possibleItems: [
            { name: '✨ XP Boost Token', description: '+3 XP bonus', type: 'boost' }
        ],
        successMessage: 'You cleaned the streets thoroughly. The town looks much more welcoming now.',
        failureMessage: 'There was more trash than expected, but you made a noticeable difference.'
    },
    {
        id: 'festival_prep',
        name: 'Festival Prep',
        description: 'Help set up decorations for a local event',
        category: 'community',
        xpReward: 10,
        coinReward: 15,
        itemChance: 20,
        possibleItems: [
            { name: '🎫 Festival Token', description: 'Special commemorative item', type: 'token' }
        ],
        successMessage: 'You helped make the festival beautiful! The colorful decorations brought joy to everyone.',
        failureMessage: 'Some decorations didn\'t turn out as planned, but the festival spirit was still strong.'
    },

    // Training Quests
    {
        id: 'basic_sparring',
        name: 'Basic Sparring',
        description: 'Practice with a training dummy',
        category: 'training',
        xpReward: 10,
        coinReward: 5,
        itemChance: 15,
        possibleItems: [
            { name: '💪 Training Manual', description: 'Study guide for combat basics', type: 'book' }
        ],
        successMessage: 'Your sparring session went well! You can feel your combat skills improving.',
        failureMessage: 'The training dummy proved tougher than expected, but you learned from the challenge.'
    },
    {
        id: 'endurance_run',
        name: 'Endurance Run',
        description: 'Jog around the training grounds',
        category: 'training',
        xpReward: 8,
        coinReward: 3,
        itemChance: 15,
        possibleItems: [
            { name: '🏃 Stamina Potion', description: 'Restores stamina and energy', type: 'potion' }
        ],
        successMessage: 'You completed the endurance run! Your stamina and speed have improved.',
        failureMessage: 'You had to take a few breaks, but you finished the run and built some endurance.'
    },
    {
        id: 'weapon_polishing',
        name: 'Weapon Polishing',
        description: 'Sharpen or clean village armory weapons',
        category: 'training',
        xpReward: 10,
        coinReward: 8,
        itemChance: 20,
        possibleItems: [
            { name: '⚔️ Whetstone', description: 'Tool for weapon maintenance', type: 'tool' }
        ],
        successMessage: 'You polished the weapons to a brilliant shine! The armory keeper was impressed with your work.',
        failureMessage: 'Some weapons were rustier than expected, but you managed to improve most of them.'
    },
    {
        id: 'meditation_practice',
        name: 'Meditation Practice',
        description: 'Focus your spirit to strengthen resolve',
        category: 'training',
        xpReward: 12,
        coinReward: 0,
        itemChance: 15,
        possibleItems: [
            { name: '🧘 Focus Talisman', description: '+5 temporary MP boost', type: 'charm' }
        ],
        successMessage: 'Your meditation session brought inner peace and clarity. You feel mentally stronger.',
        failureMessage: 'It was hard to focus today, but you still gained some inner calm from the practice.'
    }
];

// Function to get a random Phase 1 quest
function getRandomPhase1Quest() {
    const randomIndex = Math.floor(Math.random() * PHASE_1_QUESTS.length);
    return PHASE_1_QUESTS[randomIndex];
}

// Function to calculate quest success rate (Phase 1 has high success rate)
function calculatePhase1SuccessRate(characterLevel) {
    // Base success rate of 70%, +5% per level, max 95%
    const baseRate = 0.70;
    const levelBonus = characterLevel * 0.05;
    return Math.min(baseRate + levelBonus, 0.95);
}

// Function to determine if player gets an item from quest
function rollForItem(quest, characterLevel) {
    const itemRoll = Math.random() * 100;
    const adjustedChance = quest.itemChance + (characterLevel * 2); // +2% per level
    
    if (itemRoll <= adjustedChance && quest.possibleItems.length > 0) {
        const randomItem = quest.possibleItems[Math.floor(Math.random() * quest.possibleItems.length)];
        return randomItem;
    }
    return null;
}

module.exports = {
    PHASE_1_QUESTS,
    getRandomPhase1Quest,
    calculatePhase1SuccessRate,
    rollForItem
};