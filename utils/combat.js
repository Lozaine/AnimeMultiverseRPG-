// Combat System for Phase 1 Encounters
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { calculateDamage, calculateCritChance, rollCriticalHit } = require('./enemies');

// Create combat embed
function createCombatEmbed(player, enemy, combatLog = '', isPlayerTurn = true) {
    const playerHpPercent = Math.floor((player.hp / player.max_hp) * 100);
    const enemyHpPercent = Math.floor((enemy.stats.hp / enemy.stats.max_hp) * 100);
    
    const playerHpBar = createHealthBar(playerHpPercent);
    const enemyHpBar = createHealthBar(enemyHpPercent);
    
    const embed = new EmbedBuilder()
        .setColor('#ff6b35')
        .setTitle(`⚔️ Combat Encounter!`)
        .setDescription(`You encountered a ${enemy.emoji} **${enemy.name}**!\n${enemy.description}`)
        .addFields([
            {
                name: `👤 ${player.name} (Level ${player.level})`,
                value: `HP: ${player.hp}/${player.max_hp} ${playerHpBar}\nATK: ${player.atk} | DEF: ${player.def} | SPD: ${player.spd}`,
                inline: true
            },
            {
                name: `${enemy.emoji} ${enemy.name}`,
                value: `HP: ${enemy.stats.hp}/${enemy.stats.max_hp} ${enemyHpBar}\nATK: ${enemy.stats.atk} | DEF: ${enemy.stats.def} | SPD: ${enemy.stats.spd}`,
                inline: true
            }
        ]);
    
    if (combatLog) {
        embed.addFields([
            { name: '📜 Combat Log', value: combatLog, inline: false }
        ]);
    }
    
    if (isPlayerTurn) {
        embed.addFields([
            { name: '⏰ Your Turn', value: 'Choose your action:', inline: false }
        ]);
    } else {
        embed.addFields([
            { name: '⏰ Enemy Turn', value: 'The enemy is preparing to attack...', inline: false }
        ]);
    }
    
    embed.setFooter({ text: 'Combat System - Phase 1' })
        .setTimestamp();
    
    return embed;
}

// Create health bar visualization
function createHealthBar(percentage) {
    const barLength = 10;
    const filledBars = Math.floor((percentage / 100) * barLength);
    const emptyBars = barLength - filledBars;
    
    let healthBar = '';
    for (let i = 0; i < filledBars; i++) {
        healthBar += '🟩';
    }
    for (let i = 0; i < emptyBars; i++) {
        healthBar += '⬜';
    }
    
    return `${healthBar} ${percentage}%`;
}

// Create combat action buttons
function createCombatButtons(userId, enemyId, canFlee = true) {
    const actionRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`combat_attack_${userId}_${enemyId}`)
                .setLabel('⚔️ Attack')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId(`combat_flee_${userId}_${enemyId}`)
                .setLabel('🏃 Flee')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(!canFlee)
        );
    
    return actionRow;
}

// Execute player attack
function executePlayerAttack(player, enemy) {
    const critChance = calculateCritChance(player.spd, enemy.stats.spd);
    const isCrit = rollCriticalHit(critChance);
    let damage = calculateDamage(player.atk, enemy.stats.def);
    
    if (isCrit) {
        damage = Math.floor(damage * 1.5);
    }
    
    enemy.stats.hp = Math.max(0, enemy.stats.hp - damage);
    
    return {
        damage,
        isCrit,
        enemyDefeated: enemy.stats.hp <= 0
    };
}

// Execute enemy attack
function executeEnemyAttack(enemy, player) {
    const critChance = calculateCritChance(enemy.stats.spd, player.spd);
    const isCrit = rollCriticalHit(critChance);
    let damage = calculateDamage(enemy.stats.atk, player.def);
    
    if (isCrit) {
        damage = Math.floor(damage * 1.5);
    }
    
    player.hp = Math.max(0, player.hp - damage);
    
    return {
        damage,
        isCrit,
        playerDefeated: player.hp <= 0
    };
}

// Enhanced createVictoryEmbed function with faction bonus support
function createVictoryEmbed(player, enemy, questXp, questCoins, factionBonusInfo = null) {
    const totalXp = questXp + enemy.rewards.xp;
    const totalCoins = questCoins + enemy.rewards.coins;
    
    const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('🎉 Victory!')
        .setDescription(`${player.name} has triumphed over ${enemy.name}!`)
        .addFields([
            {
                name: '⚔️ Combat Results',
                value: `${enemy.emoji} **${enemy.name}** has been defeated!\nYour heroic victory brings peace to the area.`,
                inline: false
            },
            {
                name: '💰 Rewards Earned',
                value: `**Enemy Rewards:**\n• XP: +${enemy.rewards.xp}\n• Coins: +${enemy.rewards.coins}\n\n**Quest Rewards:**\n• XP: +${questXp}\n• Coins: +${questCoins}\n\n**Grand Total:** +${totalXp} XP, +${totalCoins} coins`,
                inline: false
            }
        ])
        .setTimestamp();
    
    return embed;
}

// Alternative detailed version that includes more combat details
function createDetailedVictoryEmbed(character, enemy, questXp, questCoins, combatStats = null) {
    const embed = new EmbedBuilder()
        .setTitle('🎉 Victory!')
        .setDescription(`${character.name} has triumphed over ${enemy.name}!`)
        .setColor('#10b981')
        .setThumbnail(enemy.image || null);
    
    // Combat summary
    let combatSummary = `${enemy.emoji} **${enemy.name}** has been defeated!`;
    if (combatStats) {
        combatSummary += `\n\n**Combat Summary:**`;
        combatSummary += `\n• Damage Dealt: ${combatStats.damageDealt || 'Unknown'}`;
        combatSummary += `\n• Damage Taken: ${combatStats.damageTaken || 'Unknown'}`;
        combatSummary += `\n• Critical Hits: ${combatStats.criticalHits || 0}`;
        combatSummary += `\n• Rounds: ${combatStats.rounds || 1}`;
    }
    
    embed.addFields([
        {
            name: '⚔️ Battle Results',
            value: combatSummary,
            inline: false
        }
    ]);
    
    // Rewards breakdown
    const rewardsBreakdown = `**Enemy Rewards:**\n` +
                           `• XP: +${enemy.rewards.xp}\n` +
                           `• Coins: +${enemy.rewards.coins}\n\n` +
                           `**Quest Rewards:**\n` +
                           `• XP: +${questXp}\n` +
                           `• Coins: +${questCoins}\n\n` +
                           `**Grand Total:** +${enemy.rewards.xp + questXp} XP, +${enemy.rewards.coins + questCoins} coins`;
    
    embed.addFields([
        {
            name: '💰 Rewards Earned',
            value: rewardsBreakdown,
            inline: false
        }
    ]);
    
    embed.setTimestamp();
    return embed;
}

// Create defeat embed
function createDefeatEmbed(player, enemy) {
    const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('💀 Defeat!')
        .setDescription(`The ${enemy.emoji} **${enemy.name}** defeated you...`)
        .addFields([
            {
                name: '💔 Consequences',
                value: 'You lost the battle but gained some experience from the encounter.\n\n+5 XP (Learning experience)\nNo coins gained',
                inline: false
            },
            {
                name: '🏥 Recovery',
                value: 'You managed to escape and recover. Your HP has been restored to 1.',
                inline: false
            }
        ])
        .setFooter({ text: 'Don\'t give up! Train more and try again.' })
        .setTimestamp();
    
    return embed;
}

// Create flee embed
function createFleeEmbed(enemy, questXp, questCoins) {
    const reducedXp = Math.floor(questXp * 0.5);
    const reducedCoins = Math.floor(questCoins * 0.3);
    
    const embed = new EmbedBuilder()
        .setColor('#ffa500')
        .setTitle('🏃 Fled from Combat!')
        .setDescription(`You successfully escaped from the ${enemy.emoji} **${enemy.name}**.`)
        .addFields([
            {
                name: '📉 Reduced Rewards',
                value: `Since you fled, you only gained partial quest rewards:\n+${reducedXp} XP\n+${reducedCoins} Coins`,
                inline: false
            }
        ])
        .setFooter({ text: 'Sometimes retreat is the better option.' })
        .setTimestamp();
    
    return embed;
}

module.exports = {
    createCombatEmbed,
    createHealthBar,
    createCombatButtons,
    executePlayerAttack,
    executeEnemyAttack,
    createVictoryEmbed,
    createDetailedVictoryEmbed,
    createDefeatEmbed,
    createFleeEmbed
};