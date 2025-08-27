// Level progression system for Cross Realm Chronicles

/**
 * Calculate experience required for a specific level
 * Level 1 → 100 XP, Level 2 → 200 XP, Level 3 → 300 XP, etc.
 */
function getExpRequiredForLevel(level) {
    return level * 100;
}

/**
 * Calculate total experience required to reach a level from level 1
 */
function getTotalExpForLevel(level) {
    let totalExp = 0;
    for (let i = 1; i < level; i++) {
        totalExp += getExpRequiredForLevel(i);
    }
    return totalExp;
}

/**
 * Calculate what level a character should be based on total experience
 */
function calculateLevelFromExp(totalExp) {
    let level = 1;
    let expUsed = 0;
    
    while (true) {
        const expNeeded = getExpRequiredForLevel(level);
        if (expUsed + expNeeded > totalExp) {
            break;
        }
        expUsed += expNeeded;
        level++;
    }
    
    return level;
}

/**
 * Calculate experience progress within current level
 */
function getExpProgressInLevel(totalExp, currentLevel) {
    const totalExpForCurrentLevel = getTotalExpForLevel(currentLevel);
    return totalExp - totalExpForCurrentLevel;
}

/**
 * Calculate base stats for a given level
 */
function getBaseStatsForLevel(level) {
    // Base stats at level 1: 100 HP, 20 ATK, 10 DEF, 15 SPD
    // Each level up: +10 HP, +2 ATK, +1 DEF, +1 SPD
    const baseHp = 100;
    const baseAtk = 20;
    const baseDef = 10;
    const baseSpd = 15;
    
    const hp = baseHp + ((level - 1) * 10);
    const atk = baseAtk + ((level - 1) * 2);
    const def = baseDef + ((level - 1) * 1);
    const spd = baseSpd + ((level - 1) * 1);
    
    return {
        hp: hp,
        maxHp: hp,
        atk: atk,
        def: def,
        spd: spd
    };
}

/**
 * Check if character should level up and return level-up data
 */
function checkLevelUp(currentLevel, currentExp, newExp) {
    const newLevel = calculateLevelFromExp(newExp);
    
    if (newLevel > currentLevel) {
        const newStats = getBaseStatsForLevel(newLevel);
        const levelsGained = newLevel - currentLevel;
        
        const oldStats = getBaseStatsForLevel(currentLevel);
        return {
            leveledUp: true,
            newLevel: newLevel,
            levelsGained: levelsGained,
            newStats: newStats,
            hpGained: newStats.maxHp - oldStats.maxHp,
            atkGained: newStats.atk - oldStats.atk,
            defGained: newStats.def - oldStats.def,
            spdGained: newStats.spd - oldStats.spd
        };
    }
    
    return {
        leveledUp: false,
        newLevel: currentLevel
    };
}

/**
 * Get experience needed for next level
 */
function getExpToNextLevel(currentLevel, currentExp) {
    const expForNextLevel = getExpRequiredForLevel(currentLevel + 1);
    const expInCurrentLevel = getExpProgressInLevel(currentExp, currentLevel);
    return expForNextLevel - expInCurrentLevel;
}

/**
 * Get progress percentage within current level
 */
function getLevelProgress(currentLevel, currentExp) {
    const expInCurrentLevel = getExpProgressInLevel(currentExp, currentLevel);
    const expNeededForCurrentLevel = getExpRequiredForLevel(currentLevel);
    return Math.min(100, Math.floor((expInCurrentLevel / expNeededForCurrentLevel) * 100));
}

module.exports = {
    getExpRequiredForLevel,
    getTotalExpForLevel,
    calculateLevelFromExp,
    getExpProgressInLevel,
    getBaseStatsForLevel,
    checkLevelUp,
    getExpToNextLevel,
    getLevelProgress
};