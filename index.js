const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { initializeDatabase } = require('./database/database');

// Create Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

// Command collection
client.commands = new Collection();

// Load commands
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

// Bot ready event
client.once('ready', async () => {
    console.log(`✅ Cross Realm Chronicles bot is online as ${client.user.tag}!`);
    
    // Initialize database
    try {
        await initializeDatabase();
        console.log('📊 Database initialized successfully!');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
    }
    
    // Register slash commands globally
    const rest = new REST().setToken(process.env.BOT_TOKEN);
    try {
        console.log('🔄 Refreshing slash commands...');
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );
        console.log('✅ Slash commands registered successfully!');
    } catch (error) {
        console.error('❌ Failed to register slash commands:', error);
    }
    
    // Set bot activity
    client.user.setActivity('⚔️ Cross Realm Chronicles | Use slash commands', { type: 'PLAYING' });
});

// Interaction handler (slash commands and buttons)
client.on('interactionCreate', async interaction => {
    // Handle slash commands
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('Command execution error:', error);
            
            const errorMessage = '❌ There was an error executing that command!';
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: errorMessage, ephemeral: true });
            } else {
                await interaction.reply({ content: errorMessage, ephemeral: true });
            }
        }
    }
    
    // Handle button interactions
    else if (interaction.isButton()) {
        try {
            const { getCharacter, updateCharacterProgress, addItemToInventory } = require('./database/database');
            const { checkLevelUp } = require('./utils/levelProgression');
            const { executePlayerAttack, executeEnemyAttack, createCombatEmbed, createCombatButtons, createVictoryEmbed, createDefeatEmbed, createFleeEmbed } = require('./utils/combat');
            const { getRandomPhase1Quest, calculatePhase1SuccessRate, rollForItem } = require('./utils/quests');
            const { EmbedBuilder } = require('discord.js');
            
            const userId = interaction.user.id;
            
            // Handle combat interactions
            if (interaction.customId.startsWith('combat_')) {
                const parts = interaction.customId.split('_');
                const action = parts[1]; // 'attack' or 'flee'
                const buttonUserId = parts[2];
                const enemyId = parts[3];
                
                // Check if the button interaction is from the original user
                if (buttonUserId !== userId) {
                    return interaction.reply({
                        content: '❌ You can only interact with your own combat buttons!',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                
                // Get combat data from global cache
                global.activeCombats = global.activeCombats || {};
                const combatKey = `${userId}_${enemyId}`;
                const combatData = global.activeCombats[combatKey];
                
                if (!combatData) {
                    return interaction.reply({
                        content: '❌ Combat session expired or not found!',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                
                // Get fresh character data
                const character = await getCharacter(userId);
                if (!character) {
                    return interaction.reply({
                        content: '❌ Character not found!',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                
                let { quest, enemy } = combatData;
                
                // Copy current character stats to combat character
                const combatCharacter = {
                    ...character,
                    hp: character.hp || character.max_hp
                };
                
                if (action === 'flee') {
                    // Player flees - reduced quest rewards
                    const reducedXp = Math.floor(quest.xpReward * 0.5);
                    const reducedCoins = Math.floor(quest.coinReward * 0.3);
                    
                    const newExp = character.experience + reducedXp;
                    const newGold = character.gold + reducedCoins;
                    
                    // Check for level up
                    const levelUpData = checkLevelUp(character.level, character.experience, newExp);
                    
                    // Update character
                    if (levelUpData.leveledUp) {
                        await updateCharacterProgress(
                            userId, 
                            newExp, 
                            newGold, 
                            levelUpData.newLevel,
                            levelUpData.newStats.hp,
                            levelUpData.newStats.maxHp,
                            levelUpData.newStats.atk,
                            levelUpData.newStats.def,
                            levelUpData.newStats.spd,
                            newExp
                        );
                    } else {
                        await updateCharacterProgress(userId, newExp, newGold, character.level);
                    }
                    
                    // Clean up combat data
                    delete global.activeCombats[combatKey];
                    
                    const fleeEmbed = createFleeEmbed(enemy, quest.xpReward, quest.coinReward);
                    return interaction.update({ embeds: [fleeEmbed], components: [] });
                }
                
                if (action === 'attack') {
                    // Player attacks
                    const attackResult = executePlayerAttack(combatCharacter, enemy);
                    let combatLog = `⚔️ You attack for ${attackResult.damage} damage${attackResult.isCrit ? ' (Critical Hit!)' : ''}!\n`;
                    
                    if (attackResult.enemyDefeated) {
                        // Enemy defeated - victory!
                        const questSuccess = Math.random() < calculatePhase1SuccessRate(character.level);
                        let questXp = quest.xpReward;
                        let questCoins = quest.coinReward;
                        let itemReceived = null;
                        
                        if (questSuccess) {
                            itemReceived = rollForItem(quest, character.level);
                            if (itemReceived) {
                                // Add item to inventory
                                await addItemToInventory(userId, itemReceived.name, itemReceived.description, itemReceived.type, 1, 'combat');
                                
                                // Handle special item effects for immediate rewards
                                if (itemReceived.type === 'currency') {
                                    questCoins += 10;
                                }
                                if (itemReceived.type === 'boost') {
                                    questXp += 3;
                                }
                            }
                        } else {
                            // Quest partially successful
                            questXp = Math.floor(questXp * 0.7);
                            questCoins = Math.floor(questCoins * 0.5);
                        }
                        
                        const totalXp = questXp + enemy.rewards.xp;
                        const totalCoins = questCoins + enemy.rewards.coins;
                        const finalNewExp = character.experience + totalXp;
                        const finalNewGold = character.gold + totalCoins;
                        
                        // Check for level up
                        const levelUpData = checkLevelUp(character.level, character.experience, finalNewExp);
                        
                        // Update character
                        if (levelUpData.leveledUp) {
                            await updateCharacterProgress(
                                userId, 
                                finalNewExp, 
                                finalNewGold, 
                                levelUpData.newLevel,
                                levelUpData.newStats.hp,
                                levelUpData.newStats.maxHp,
                                levelUpData.newStats.atk,
                                levelUpData.newStats.def,
                                levelUpData.newStats.spd,
                                finalNewExp
                            );
                        } else {
                            await updateCharacterProgress(userId, finalNewExp, finalNewGold, character.level);
                        }
                        
                        // Clean up combat data
                        delete global.activeCombats[combatKey];
                        
                        const victoryEmbed = createVictoryEmbed(combatCharacter, enemy, questXp, questCoins);
                        
                        if (levelUpData.leveledUp) {
                            victoryEmbed.addFields([
                                { 
                                    name: '🆙 LEVEL UP!', 
                                    value: `You are now level ${levelUpData.newLevel}!\n` +
                                           `+${levelUpData.hpGained} HP (${levelUpData.newStats.maxHp} total)\n` +
                                           `+${levelUpData.atkGained} ATK (${levelUpData.newStats.atk} total)\n` +
                                           `+${levelUpData.defGained} DEF (${levelUpData.newStats.def} total)\n` +
                                           `+${levelUpData.spdGained} SPD (${levelUpData.newStats.spd} total)`, 
                                    inline: false 
                                }
                            ]);
                        }
                        
                        return interaction.update({ embeds: [victoryEmbed], components: [] });
                    } else {
                        // Enemy still alive - enemy attacks back
                        const enemyAttackResult = executeEnemyAttack(enemy, combatCharacter);
                        combatLog += `${enemy.emoji} ${enemy.name} attacks for ${enemyAttackResult.damage} damage${enemyAttackResult.isCrit ? ' (Critical Hit!)' : ''}!`;
                        
                        if (enemyAttackResult.playerDefeated) {
                            // Player defeated
                            const defeatXp = 5; // Small learning XP
                            const newExp = character.experience + defeatXp;
                            const newGold = character.gold; // No coins gained
                            
                            // Check for level up (unlikely)
                            const levelUpData = checkLevelUp(character.level, character.experience, newExp);
                            
                            // Update character - restore HP to 1
                            if (levelUpData.leveledUp) {
                                await updateCharacterProgress(
                                    userId, 
                                    newExp, 
                                    newGold, 
                                    levelUpData.newLevel,
                                    1, // HP restored to 1
                                    levelUpData.newStats.maxHp,
                                    levelUpData.newStats.atk,
                                    levelUpData.newStats.def,
                                    levelUpData.newStats.spd,
                                    newExp
                                );
                            } else {
                                await updateCharacterProgress(userId, newExp, newGold, character.level, 1); // HP restored to 1
                            }
                            
                            // Clean up combat data
                            delete global.activeCombats[combatKey];
                            
                            const defeatEmbed = createDefeatEmbed(combatCharacter, enemy);
                            return interaction.update({ embeds: [defeatEmbed], components: [] });
                        } else {
                            // Combat continues - update combat data
                            global.activeCombats[combatKey] = {
                                ...combatData,
                                enemy: enemy,
                                character: combatCharacter
                            };
                            
                            // Create updated combat embed
                            const updatedCombatEmbed = createCombatEmbed(combatCharacter, enemy, combatLog, true);
                            const combatButtons = createCombatButtons(userId, enemyId);
                            
                            return interaction.update({ 
                                embeds: [updatedCombatEmbed], 
                                components: [combatButtons] 
                            });
                        }
                    }
                }
            }
            
            // Handle other button interactions (none currently)
            return interaction.reply({ 
                content: '❌ This button interaction is not currently supported!', 
                flags: [4096] // EPHEMERAL flag
            });
            
        } catch (error) {
            console.error('Button interaction error:', error);
            
            const errorMessage = '❌ There was an error processing your request!';
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: errorMessage, flags: [4096] });
            } else {
                await interaction.reply({ content: errorMessage, flags: [4096] });
            }
        }
    }
});

// Error handling
client.on('error', error => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Login with bot token
const BOT_TOKEN = process.env.BOT_TOKEN || 'your_bot_token_here';
client.login(BOT_TOKEN).catch(error => {
    console.error('❌ Failed to login:', error);
    
    if (error.message.includes('disallowed intents')) {
        console.error('');
        console.error('🔧 SETUP REQUIRED:');
        console.error('Please enable "Message Content Intent" in Discord Developer Portal:');
        console.error('1. Go to https://discord.com/developers/applications');
        console.error('2. Select your bot application');
        console.error('3. Go to Bot section');
        console.error('4. Enable "Message Content Intent" under Privileged Gateway Intents');
        console.error('5. Save and restart the bot');
        console.error('');
    }
    
    process.exit(1);
});
