const { 
    SlashCommandBuilder, 
    TextDisplayBuilder, 
    ContainerBuilder,
    MessageFlags 
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Display a simple Components V2 greeting'),
    
    async execute(interaction) {
        // Simple TextDisplay example
        const greeting = new TextDisplayBuilder()
            .setContent(`# 👋 Hello, ${interaction.user.displayName}!\n\n` +
                       `Welcome to **Components V2**! This message is built using the new Display Components API.\n\n` +
                       `**Features:**\n` +
                       `• Full markdown support\n` +
                       `• Rich text formatting\n` +
                       `• User mentions: ${interaction.user}\n` +
                       `• Channel mentions: ${interaction.channel}\n` +
                       `• And much more!`);

        // Container to make it look nice
        const container = new ContainerBuilder()
            .setAccentColor(0x5865F2) // Discord blue
            .addTextDisplayComponents(greeting);

        await interaction.reply({
            components: [container],
            flags: MessageFlags.IsComponentsV2
        });
    }
};