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
        // No button interactions currently implemented
        return interaction.reply({ 
            content: '❌ This button interaction is not currently supported!', 
            flags: [4096] // EPHEMERAL flag
        });
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
