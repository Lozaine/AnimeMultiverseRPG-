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
            const { getCharacter, updateCharacterProgress } = require('./database/database');
            const { FACTIONS } = require('./utils/factions');
            const { QUESTS } = require('./utils/quests');
            const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
            
            const userId = interaction.user.id;
            let character = await getCharacter(userId);
            
            if (!character) {
                return interaction.reply({ 
                    content: '❌ You need to create a character first! Use `/create`', 
                    flags: [4096] // EPHEMERAL flag
                });
            }
            
            const faction = FACTIONS[character.faction];
            
            // Handle quest selection buttons
            if (interaction.customId.startsWith('quest_')) {
                const questNumber = parseInt(interaction.customId.split('_')[1]);
                const quests = QUESTS[character.faction];
                
                if (!quests || !quests[questNumber - 1]) {
                    return interaction.reply({
                        content: `❌ Quest not found! Please try again.`,
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                
                const selectedQuest = quests[questNumber - 1];
                
                // Check level requirement
                if (character.level < selectedQuest.levelRequirement) {
                    return interaction.reply({
                        content: `❌ You need to be level ${selectedQuest.levelRequirement} to attempt this quest. You are currently level ${character.level}.`,
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                
                // Execute quest
                const successRate = Math.min(0.7 + (character.level * 0.05), 0.95);
                const success = Math.random() < successRate;
                
                if (success) {
                    // Quest successful
                    const { checkLevelUp } = require('./utils/levelProgression');
                    const newExp = character.experience + selectedQuest.reward.experience;
                    const newGold = character.gold + selectedQuest.reward.gold;
                    
                    // Check for level up
                    const levelUpData = checkLevelUp(character.level, character.experience, newExp);
                    
                    // Update character with new stats if leveled up
                    if (levelUpData.leveledUp) {
                        await updateCharacterProgress(
                            userId, 
                            newExp, 
                            newGold, 
                            levelUpData.newLevel,
                            levelUpData.newStats.hp,
                            levelUpData.newStats.maxHp,
                            levelUpData.newStats.atk
                        );
                    } else {
                        await updateCharacterProgress(userId, newExp, newGold, character.level);
                    }
                    
                    const embed = new EmbedBuilder()
                        .setColor('#00ff00')
                        .setTitle('🎉 Quest Completed Successfully!')
                        .setDescription(`**${selectedQuest.name}**\n${selectedQuest.successMessage}`)
                        .addFields([
                            { name: '💰 Gold Earned', value: selectedQuest.reward.gold.toString(), inline: true },
                            { name: '⭐ Experience Gained', value: selectedQuest.reward.experience.toString(), inline: true },
                            { name: '📊 Total Experience', value: newExp.toString(), inline: true }
                        ]);
                        
                    if (levelUpData.leveledUp) {
                        embed.addFields([
                            { 
                                name: '🆙 LEVEL UP!', 
                                value: `You are now level ${levelUpData.newLevel}!\n` +
                                       `+${levelUpData.hpGained} HP (${levelUpData.newStats.maxHp} total)\n` +
                                       `+${levelUpData.atkGained} ATK (${levelUpData.newStats.atk} total)`, 
                                inline: false 
                            }
                        ]);
                    }
                    
                    // Add repeat button
                    const actionRow = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`repeat_quest_${questNumber}`)
                                .setLabel('🔄 Repeat Quest')
                                .setStyle(ButtonStyle.Success)
                        );
                        
                    await interaction.reply({ embeds: [embed], components: [actionRow] });
                } else {
                    // Quest failed
                    const embed = new EmbedBuilder()
                        .setColor('#ff6b6b')
                        .setTitle('💥 Quest Failed!')
                        .setDescription(`**${selectedQuest.name}**\n${selectedQuest.failureMessage || 'You failed to complete the quest. Train harder and try again!'}`)
                        .setFooter({ text: 'Don\'t give up! Try again when you\'re stronger.' });
                        
                    // Add retry button
                    const actionRow = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`repeat_quest_${questNumber}`)
                                .setLabel('🔄 Try Again')
                                .setStyle(ButtonStyle.Danger)
                        );
                        
                    await interaction.reply({ embeds: [embed], components: [actionRow] });
                }
            }
            
            // Handle repeat quest buttons
            else if (interaction.customId.startsWith('repeat_quest_')) {
                const questNumber = parseInt(interaction.customId.split('_')[2]);
                
                // Get fresh character data for repeat quest
                character = await getCharacter(userId);
                const quests = QUESTS[character.faction];
                
                if (!quests || !quests[questNumber - 1]) {
                    return interaction.reply({
                        content: `❌ Quest not found! Please try again.`,
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                
                const selectedQuest = quests[questNumber - 1];
                
                // Execute quest again
                const successRate = Math.min(0.7 + (character.level * 0.05), 0.95);
                const success = Math.random() < successRate;
                
                if (success) {
                    // Quest successful
                    const { checkLevelUp } = require('./utils/levelProgression');
                    const newExp = character.experience + selectedQuest.reward.experience;
                    const newGold = character.gold + selectedQuest.reward.gold;
                    
                    // Check for level up
                    const levelUpData = checkLevelUp(character.level, character.experience, newExp);
                    
                    // Update character with new stats if leveled up
                    if (levelUpData.leveledUp) {
                        await updateCharacterProgress(
                            userId, 
                            newExp, 
                            newGold, 
                            levelUpData.newLevel,
                            levelUpData.newStats.hp,
                            levelUpData.newStats.maxHp,
                            levelUpData.newStats.atk
                        );
                    } else {
                        await updateCharacterProgress(userId, newExp, newGold, character.level);
                    }
                    
                    const embed = new EmbedBuilder()
                        .setColor('#00ff00')
                        .setTitle('🎉 Quest Completed Successfully!')
                        .setDescription(`**${selectedQuest.name}**\n${selectedQuest.successMessage}`)
                        .addFields([
                            { name: '💰 Gold Earned', value: selectedQuest.reward.gold.toString(), inline: true },
                            { name: '⭐ Experience Gained', value: selectedQuest.reward.experience.toString(), inline: true },
                            { name: '📊 Total Experience', value: newExp.toString(), inline: true }
                        ]);
                        
                    if (levelUpData.leveledUp) {
                        embed.addFields([
                            { 
                                name: '🆙 LEVEL UP!', 
                                value: `You are now level ${levelUpData.newLevel}!\n` +
                                       `+${levelUpData.hpGained} HP (${levelUpData.newStats.maxHp} total)\n` +
                                       `+${levelUpData.atkGained} ATK (${levelUpData.newStats.atk} total)`, 
                                inline: false 
                            }
                        ]);
                    }
                    
                    // Add repeat button
                    const actionRow = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`repeat_quest_${questNumber}`)
                                .setLabel('🔄 Repeat Quest')
                                .setStyle(ButtonStyle.Success)
                        );
                        
                    await interaction.update({ embeds: [embed], components: [actionRow] });
                } else {
                    // Quest failed
                    const embed = new EmbedBuilder()
                        .setColor('#ff6b6b')
                        .setTitle('💥 Quest Failed!')
                        .setDescription(`**${selectedQuest.name}**\n${selectedQuest.failureMessage || 'You failed to complete the quest. Train harder and try again!'}`)
                        .setFooter({ text: 'Don\'t give up! Try again when you\'re stronger.' });
                        
                    // Add retry button
                    const actionRow = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`repeat_quest_${questNumber}`)
                                .setLabel('🔄 Try Again')
                                .setStyle(ButtonStyle.Danger)
                        );
                        
                    await interaction.update({ embeds: [embed], components: [actionRow] });
                }
            }
            
            
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
