// Phase 1 Enemy System
// Enemies that can be encountered during quests

const PHASE_1_ENEMIES = [
    {
        id: 'forest_goblin',
        name: 'Forest Goblin',
        emoji: '👺',
        description: 'A small, cunning goblin that lurks in the forest',
        baseStats: {
            hp: 80,
            atk: 15,
            def: 8,
            spd: 12
        },
        rewards: {
            xp: 12,
            coins: 8
        },
        habitat: ['gathering', 'community']
    },
    {
        id: 'wild_wolf',
        name: 'Wild Wolf',
        emoji: '🐺',
        description: 'A fierce wolf with sharp fangs and keen senses',
        baseStats: {
            hp: 90,
            atk: 18,
            def: 6,
            spd: 16
        },
        rewards: {
            xp: 15,
            coins: 10
        },
        habitat: ['hunting', 'training']
    },
    {
        id: 'bandit_thief',
        name: 'Bandit Thief',
        emoji: '🗡️',
        description: 'A desperate thief looking for easy targets',
        baseStats: {
            hp: 85,
            atk: 16,
            def: 10,
            spd: 14
        },
        rewards: {
            xp: 14,
            coins: 12
        },
        habitat: ['delivery', 'protection']
    },
    {
        id: 'cave_spider',
        name: 'Cave Spider',
        emoji: '🕷️',
        description: 'A large spider that spins webs in dark caves',
        baseStats: {
            hp: 70,
            atk: 14,
            def: 5,
            spd: 18
        },
        rewards: {
            xp: 10,
            coins: 6
        },
        habitat: ['gathering', 'hunting']
    },
    {
        id: 'angry_boar',
        name: 'Angry Boar',
        emoji: '🐗',
        description: 'A massive boar with tusks that can pierce armor',
        baseStats: {
            hp: 100,
            atk: 20,
            def: 12,
            spd: 10
        },
        rewards: {
            xp: 18,
            coins: 15
        },
        habitat: ['hunting', 'community']
    },
    {
        id: 'rogue_merchant',
        name: 'Rogue Merchant',
        emoji: '💰',
        description: 'A merchant who tries to cheat unsuspecting travelers',
        baseStats: {
            hp: 75,
            atk: 12,
            def: 8,
            spd: 15
        },
        rewards: {
            xp: 12,
            coins: 20
        },
        habitat: ['delivery', 'errand']
    },
    {
        id: 'training_dummy_golem',
        name: 'Training Dummy Golem',
        emoji: '🪨',
        description: 'An enchanted training dummy that came to life',
        baseStats: {
            hp: 95,
            atk: 10,
            def: 15,
            spd: 8
        },
        rewards: {
            xp: 16,
            coins: 5
        },
        habitat: ['training']
    },
    {
        id: 'marsh_slime',
        name: 'Marsh Slime',
        emoji: '🟢',
        description: 'A gooey creature that absorbs damage and strikes back',
        baseStats: {
            hp: 110,
            atk: 8,
            def: 3,
            spd: 6
        },
        rewards: {
            xp: 11,
            coins: 7
        },
        habitat: ['gathering', 'errand']
    }
];

// Function to get a random enemy based on quest category
function getRandomEnemyForCategory(category) {
    const availableEnemies = PHASE_1_ENEMIES.filter(enemy => 
        enemy.habitat.includes(category)
    );
    
    if (availableEnemies.length === 0) {
        // Fallback to any enemy if no category match
        return PHASE_1_ENEMIES[Math.floor(Math.random() * PHASE_1_ENEMIES.length)];
    }
    
    return availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
}

// Function to scale enemy stats to player level
function scaleEnemyToLevel(enemy, playerLevel) {
    const scaleFactor = playerLevel / 3; // Moderate scaling
    
    return {
        ...enemy,
        stats: {
            hp: Math.floor(enemy.baseStats.hp + (scaleFactor * 20)),
            maxHp: Math.floor(enemy.baseStats.hp + (scaleFactor * 20)),
            atk: Math.floor(enemy.baseStats.atk + (scaleFactor * 3)),
            def: Math.floor(enemy.baseStats.def + (scaleFactor * 2)),
            spd: Math.floor(enemy.baseStats.spd + (scaleFactor * 2))
        },
        rewards: {
            xp: Math.floor(enemy.rewards.xp + (scaleFactor * 3)),
            coins: Math.floor(enemy.rewards.coins + (scaleFactor * 2))
        }
    };
}

// Function to determine if an enemy encounter should occur (30% chance)
function shouldTriggerEnemyEncounter() {
    return Math.random() < 0.30;
}

// Combat calculation functions
function calculateDamage(attackerAtk, defenderDef) {
    const baseDamage = Math.max(1, attackerAtk - defenderDef);
    const variance = Math.random() * 0.4 + 0.8; // 80% to 120% damage
    return Math.floor(baseDamage * variance);
}

function calculateCritChance(attackerSpd, defenderSpd) {
    const speedDiff = attackerSpd - defenderSpd;
    const baseCrit = 0.05; // 5% base crit chance
    const speedBonus = Math.max(0, speedDiff * 0.01); // 1% per speed difference
    return Math.min(0.25, baseCrit + speedBonus); // Max 25% crit chance
}

function rollCriticalHit(critChance) {
    return Math.random() < critChance;
}

module.exports = {
    PHASE_1_ENEMIES,
    getRandomEnemyForCategory,
    scaleEnemyToLevel,
    shouldTriggerEnemyEncounter,
    calculateDamage,
    calculateCritChance,
    rollCriticalHit
};