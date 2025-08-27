const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { initializeDatabase } = require('./database/database');

// Create Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Command collection
client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
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
    
    // Set bot activity
    client.user.setActivity('⚔️ Cross Realm Chronicles | !help', { type: 'PLAYING' });
});

// Message handler
client.on('messageCreate', async message => {
    // Ignore bot messages and messages without prefix
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error('Command execution error:', error);
        await message.reply('❌ There was an error executing that command!');
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
