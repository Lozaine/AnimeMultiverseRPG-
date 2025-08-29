const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { initializeDatabase } = require('./database/database');

// Load environment variables
require('dotenv').config();

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
client.once('clientReady', async () => {
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

// Add wiki utility functions import at top level
const { getCategoryOverview, getCategoryMenu, getSectionContent } = require('./utils/wiki.js');

// Interaction handler (slash commands, autocomplete, and buttons)
client.on('interactionCreate', async interaction => {
    // Handle autocomplete interactions
    if (interaction.isAutocomplete()) {
        const command = client.commands.get(interaction.commandName);
        if (!command || !command.autocomplete) return;

        try {
            await command.autocomplete(interaction);
        } catch (error) {
            console.error('Autocomplete error:', error);
        }
        return;
    }
    
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
                await interaction.followUp({ content: errorMessage, flags: [4096] });
            } else {
                await interaction.reply({ content: errorMessage, flags: [4096] });
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
                const enemyId = parts.slice(3).join('_'); // Rejoin all parts after userId to handle underscores in enemyId
                
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
                            levelUpData.newStats.max_hp,
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
                        
                        // Import the enhanced quest functions
                        const { calculatePhase1SuccessRate, rollForItem, calculateQuestRewards } = require('./utils/quests');
                        
                        // Calculate quest success with faction bonuses
                        const questSuccess = Math.random() < calculatePhase1SuccessRate(character.level, character.faction, quest.category);
                        
                        // Calculate quest rewards with faction bonuses
                        const questRewards = calculateQuestRewards(quest, character.level, character.faction, questSuccess);
                        let questXp = questRewards.xp;
                        let questCoins = questRewards.coins;
                        let itemReceived = null;
                        
                        // Roll for item with faction bonuses
                        if (questSuccess) {
                            itemReceived = rollForItem(quest, character.level, character.faction);
                            if (itemReceived) {
                                // Add item to inventory
                                const inventoryResult = await addItemToInventory(userId, itemReceived.name, itemReceived.description, itemReceived.type, 1, 'combat');
                                
                                // Handle special item effects for immediate rewards (only if item was added successfully)
                                if (!inventoryResult.inventoryFull) {
                                    if (itemReceived.type === 'currency') {
                                        questCoins += 10;
                                    }
                                    if (itemReceived.type === 'boost') {
                                        questXp += 3;
                                    }
                                }
                            }
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
                                levelUpData.newStats.max_hp,
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
                        
                        // Create victory embed with enhanced reward information
                        const victoryEmbed = createVictoryEmbed(combatCharacter, enemy, questXp, questCoins);
                        
                        // Add faction bonus information to victory embed if bonuses were applied
                        if (questRewards.bonusInfo && character.faction) {
                            const { FACTIONS } = require('./utils/factions');
                            const factionName = FACTIONS[character.faction]?.name || character.faction;
                            
                            victoryEmbed.addFields([
                                {
                                    name: `${FACTIONS[character.faction]?.emoji || '⚔️'} ${factionName} Bonus!`,
                                    value: `Your faction training pays off!\n` +
                                           `• Quest XP: ${questRewards.bonusInfo.originalXp} → ${questXp} (${questRewards.bonusInfo.xpMultiplier}x)\n` +
                                           `• Quest Coins: ${questRewards.bonusInfo.originalCoins} → ${questCoins} (${questRewards.bonusInfo.coinMultiplier}x)\n` +
                                           `• Item Chance: Enhanced (${questRewards.bonusInfo.itemMultiplier}x)`,
                                    inline: false
                                }
                            ]);
                        }
                        
                        if (levelUpData.leveledUp) {
                            victoryEmbed.addFields([
                                { 
                                    name: '🆙 LEVEL UP!', 
                                    value: `You are now level ${levelUpData.newLevel}!\n` +
                                           `+${levelUpData.hpGained} HP (${levelUpData.newStats.max_hp} total)\n` +
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
                                    levelUpData.newStats.max_hp,
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
            
            // Handle inventory button interactions
            if (interaction.customId.startsWith('refresh_inventory_') || 
                interaction.customId.startsWith('sort_inventory_')) {
                
                const parts = interaction.customId.split('_');
                const buttonUserId = parts[parts.length - 1];
                
                // Check if the button interaction is from the original user
                if (buttonUserId !== userId) {
                    return interaction.reply({
                        content: '❌ You can only interact with your own inventory buttons!',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                
                if (interaction.customId.startsWith('refresh_inventory_')) {
                    // Refresh inventory display
                    const inventoryCommand = client.commands.get('inventory');
                    if (inventoryCommand) {
                        await inventoryCommand.execute(interaction);
                    } else {
                        return interaction.reply({
                            content: '❌ Inventory refresh failed!',
                            flags: [4096]
                        });
                    }
                    
                } else if (interaction.customId.startsWith('sort_inventory_')) {
                    // For now, just refresh (could implement different sorting later)
                    const inventoryCommand = client.commands.get('inventory');
                    if (inventoryCommand) {
                        await inventoryCommand.execute(interaction);
                    } else {
                        return interaction.reply({
                            content: '❌ Inventory sort failed!',
                            flags: [4096]
                        });
                    }
                }
                return;
            }
            
            // Handle repeat quest button
            if (interaction.customId.startsWith('quest_repeat_')) {
                const buttonUserId = interaction.customId.split('_')[2];
                if (interaction.user.id !== buttonUserId) {
                    return interaction.reply({
                        content: '❌ You can only repeat your own quests!',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                const questCommand = client.commands.get('quest');
                if (questCommand) {
                    await interaction.update({ components: [] }); // This removes the button from the original message.
                    await questCommand.execute(interaction);
                }
                return;
            }
            
            // Handle reset button interactions
            if (interaction.customId.startsWith('reset_')) {
                const resetCommand = client.commands.get('reset');
                if (resetCommand && resetCommand.handleButtonInteraction) {
                    await resetCommand.handleButtonInteraction(interaction);
                    return;
                }
            }
            
            // Handle help button interactions
            if (interaction.customId.startsWith('help_')) {
                const helpCommand = client.commands.get('help');
                if (helpCommand && helpCommand.handleButtonInteraction) {
                    await helpCommand.handleButtonInteraction(interaction);
                    return;
                }
            }
            
            // Handle wiki navigation button interactions
            if (interaction.customId.startsWith('wiki_')) {
                const { 
                    createWikiEmbed, 
                    createWikiNavigation, 
                    createCategoryOverviewEmbed, 
                    createCategoryNavigation,
                    createMainWikiEmbed, 
                    createMainMenuNavigation 
                } = require('./utils/wiki');
                
                try {
                    if (interaction.customId === 'wiki_main_menu') {
                        // Return to main wiki menu
                        const mainEmbed = createMainWikiEmbed();
                        const navigation = createMainMenuNavigation();
                        
                        if (!interaction.replied && !interaction.deferred) {
                            await interaction.update({
                                embeds: [mainEmbed],
                                components: navigation
                            });
                        }
                    } else if (interaction.customId.startsWith('wiki_category_')) {
                        // Show category overview
                        const category = interaction.customId.replace('wiki_category_', '');
                        const categoryEmbed = createCategoryOverviewEmbed(category);
                        const navigation = createCategoryNavigation(category);
                        
                        if (!interaction.replied && !interaction.deferred) {
                            await interaction.update({
                                embeds: [categoryEmbed],
                                components: navigation
                            });
                        }
                    } else if (interaction.customId === 'wiki_back_to_categories') {
                        const overview = getCategoryOverview();
                        if (!interaction.replied && !interaction.deferred) {
                            await interaction.update(overview);
                        }
                    } else if (interaction.customId.startsWith('wiki_back_to_category_')) {
                        const categoryKey = interaction.customId.replace('wiki_back_to_category_', '');
                        const categoryMenu = getCategoryMenu(categoryKey);
                        
                        if (categoryMenu && !interaction.replied && !interaction.deferred) {
                            await interaction.update(categoryMenu);
                        }
                    } else if (interaction.customId.startsWith('wiki_section_')) {
                        // Handle navigation between sections (Previous/Next buttons)
                        const parts = interaction.customId.split('_');
                        const categoryKey = parts[2];
                        const sectionIndex = parseInt(parts[3]);
                        
                        const sectionContent = getSectionContent(categoryKey, sectionIndex);
                        
                        if (sectionContent && !interaction.replied && !interaction.deferred) {
                            await interaction.update(sectionContent);
                        }
                    } else if (interaction.customId.startsWith('wiki_prev_') || interaction.customId.startsWith('wiki_next_')) {
                        // Handle previous/next navigation
                        const parts = interaction.customId.split('_');
                        const direction = parts[1]; // 'prev' or 'next'
                        const category = parts[2];
                        const currentSection = parseInt(parts[3]);
                        
                        let newSection = currentSection;
                        if (direction === 'prev' && currentSection > 0) {
                            newSection = currentSection - 1;
                        } else if (direction === 'next') {
                            newSection = currentSection + 1;
                        }
                        
                        const sectionEmbed = createWikiEmbed(category, newSection);
                        const navigation = createWikiNavigation(category, newSection);
                        
                        if (!interaction.replied && !interaction.deferred) {
                            await interaction.update({
                                embeds: [sectionEmbed],
                                components: navigation
                            });
                        }
                    }
                } catch (error) {
                    console.error('Wiki button navigation error:', error);
                    if (!interaction.replied && !interaction.deferred) {
                        await interaction.reply({
                            content: '❌ An error occurred while navigating the wiki.',
                            ephemeral: true
                        });
                    }
                }
                return;
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
    
    // Handle string select menu interactions
    else if (interaction.isStringSelectMenu()) {
        // Handle wiki navigation
        if (interaction.customId.startsWith('wiki_')) {
            const { 
                createWikiEmbed, 
                createWikiNavigation, 
                createCategoryOverviewEmbed, 
                createCategoryNavigation,
                createMainWikiEmbed, 
                createMainMenuNavigation 
            } = require('./utils/wiki');
            
            try {
                if (interaction.customId === 'wiki_category_select') {
                    const categoryKey = interaction.values[0];
                    const categoryMenu = getCategoryMenu(categoryKey);
                    
                    if (categoryMenu && !interaction.replied && !interaction.deferred) {
                        await interaction.update(categoryMenu);
                    } else if (!interaction.replied && !interaction.deferred) {
                        await interaction.reply({ 
                            content: '❌ Invalid category selected.',
                            ephemeral: true 
                        });
                    }
                } else if (interaction.customId.startsWith('wiki_section_select_')) {
                    const categoryKey = interaction.customId.replace('wiki_section_select_', '');
                    const sectionInfo = interaction.values[0]; // format: "categoryKey_sectionIndex"
                    const [, sectionIndexStr] = sectionInfo.split('_');
                    const sectionIndex = parseInt(sectionIndexStr);
                    
                    const sectionContent = getSectionContent(categoryKey, sectionIndex);
                    
                    if (sectionContent && !interaction.replied && !interaction.deferred) {
                        await interaction.update(sectionContent);
                    } else if (!interaction.replied && !interaction.deferred) {
                        await interaction.reply({ 
                            content: '❌ Invalid section selected.',
                            ephemeral: true 
                        });
                    }
                } else if (interaction.customId === 'wiki_main_categories') {
                    // Main category selection
                    const selectedValue = interaction.values[0];
                    const category = selectedValue.replace('wiki_category_', '');
                    
                    const categoryEmbed = createCategoryOverviewEmbed(category);
                    const navigation = createCategoryNavigation(category);
                    
                    if (!interaction.replied && !interaction.deferred) {
                        await interaction.update({
                            embeds: [categoryEmbed],
                            components: navigation
                        });
                    }
                } else if (interaction.customId.startsWith('wiki_section_')) {
                    // Section selection within a category
                    const selectedValue = interaction.values[0];
                    const parts = selectedValue.split('_');
                    const category = parts[2];
                    const sectionIndex = parseInt(parts[3]);
                    
                    const sectionEmbed = createWikiEmbed(category, sectionIndex);
                    const navigation = createWikiNavigation(category, sectionIndex);
                    
                    if (!interaction.replied && !interaction.deferred) {
                        await interaction.update({
                            embeds: [sectionEmbed],
                            components: navigation
                        });
                    }
                }
            } catch (error) {
                console.error('Wiki navigation error:', error);
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        content: '❌ An error occurred while navigating the wiki.',
                        ephemeral: true
                    });
                }
            }
            return;
        }
        
        try {
            const userId = interaction.user.id;
            
            // Handle inventory item selection
            if (interaction.customId.startsWith('inventory_use_')) {
                const selectUserId = interaction.customId.split('_')[2];
                
                // Check if the select menu interaction is from the original user
                if (selectUserId !== userId) {
                    return interaction.reply({
                        content: '❌ You can only interact with your own inventory!',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                
                // Extract item name from selected value - now it's the exact item name
                const itemName = interaction.values[0];
                
                // Show modal for quantity input
                const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
                
                const modal = new ModalBuilder()
                    .setCustomId(`use_item_modal_${Buffer.from(itemName).toString('base64')}_${userId}`)
                    .setTitle(`Use ${itemName}`);
                
                const quantityInput = new TextInputBuilder()
                    .setCustomId('quantity')
                    .setLabel('Quantity (1-10)')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('1')
                    .setValue('1')
                    .setRequired(true)
                    .setMinLength(1)
                    .setMaxLength(2);
                
                const actionRow = new ActionRowBuilder().addComponents(quantityInput);
                modal.addComponents(actionRow);
                
                return interaction.showModal(modal);
            }
            
            // Handle other select menu interactions (none currently)
            return interaction.reply({ 
                content: '❌ This select menu interaction is not currently supported!', 
                flags: [4096] // EPHEMERAL flag
            });
            
        } catch (error) {
            console.error('Select menu interaction error:', error);
            
            const errorMessage = '❌ There was an error processing your request!';
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: errorMessage, flags: [4096] });
            } else {
                await interaction.reply({ content: errorMessage, flags: [4096] });
            }
        }
    }
    
    // Handle modal submit interactions
    else if (interaction.isModalSubmit()) {
        try {
            const userId = interaction.user.id;
            
            // Handle item usage modal
            if (interaction.customId.startsWith('use_item_modal_')) {
                const parts = interaction.customId.split('_');
                const modalUserId = parts[parts.length - 1];
                
                // Check if the modal interaction is from the original user
                if (modalUserId !== userId) {
                    return interaction.reply({
                        content: '❌ You can only use your own items!',
                        flags: [4096] // EPHEMERAL flag
                    });
                }
                
                // Decode item name from base64
                const encodedItemName = parts.slice(3, -1).join('_');
                const itemName = Buffer.from(encodedItemName, 'base64').toString('utf8');
                const quantity = parseInt(interaction.fields.getTextInputValue('quantity'));
                
                // Validate quantity
                if (isNaN(quantity) || quantity < 1 || quantity > 10) {
                    return interaction.reply({
                        content: '❌ Please enter a valid quantity between 1 and 10!',
                        flags: [4096]
                    });
                }
                
                // Use the item
                const { usePlayerItem } = require('./database/database');
                const result = await usePlayerItem(userId, itemName, quantity);
                
                if (result.success) {
                    const { createEmbed } = require('./utils/embeds');
                    const embed = createEmbed(
                        `✅ Used ${itemName}`,
                        `Successfully used ${quantity}x ${itemName}\n${result.message}`,
                        '#10b981'
                    );
                    
                    return interaction.reply({ embeds: [embed], flags: [4096] });
                } else {
                    return interaction.reply({
                        content: `❌ ${result.message}`,
                        flags: [4096]
                    });
                }
            }
            
            // Handle other modal interactions (none currently)
            return interaction.reply({ 
                content: '❌ This modal interaction is not currently supported!', 
                flags: [4096] // EPHEMERAL flag
            });
            
        } catch (error) {
            console.error('Modal submit interaction error:', error);
            
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
