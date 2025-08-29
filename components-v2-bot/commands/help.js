const { 
    SlashCommandBuilder, 
    TextDisplayBuilder, 
    ContainerBuilder,
    SectionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MessageFlags 
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show available commands and Components V2 information'),
    
    async execute(interaction) {
        // Main title
        const titleDisplay = new TextDisplayBuilder()
            .setContent(`# 🤖 Discord Components V2 Bot\n*Next-generation Discord message layouts*`);

        // Commands section
        const commandsSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 📋 Available Commands`),
                new TextDisplayBuilder().setContent(
                    `**\`/hello\`** - Simple Components V2 greeting\n` +
                    `**\`/dashboard\`** - Interactive server dashboard\n` +
                    `**\`/gallery\`** - Advanced layout showcase\n` +
                    `**\`/help\`** - This help message`
                )
            );

        // About Components V2
        const aboutDisplay = new TextDisplayBuilder()
            .setContent(`## 🆕 About Components V2\n\n` +
                       `Components V2 is Discord's new **Display Components API** that replaces traditional embeds with more flexible, modern layouts.\n\n` +
                       `**Key Features:**\n` +
                       `• 🎨 **Rich layouts** with containers and sections\n` +
                       `• 📝 **Full markdown** support in text displays\n` +
                       `• 🎯 **Interactive elements** with button accessories\n` +
                       `• 🎭 **Visual effects** like spoilers and accent colors\n` +
                       `• 📱 **Modern design** that matches Discord's UI`);

        // Technical info
        const techDisplay = new TextDisplayBuilder()
            .setContent(`## ⚙️ Technical Details\n\n` +
                       `**Requirements:**\n` +
                       `• Discord.js v14.19.0 or newer\n` +
                       `• Must use \`MessageFlags.IsComponentsV2\`\n` +
                       `• Cannot mix with embeds or traditional content\n\n` +
                       `**Limitations:**\n` +
                       `• Max 40 components per message\n` +
                       `• Max 4000 characters across all text displays\n` +
                       `• No fallback to embeds once Components V2 is used`);

        // Links and resources
        const resourcesDisplay = new TextDisplayBuilder()
            .setContent(`## 🔗 Resources\n\n` +
                       `• [Discord.js Guide](https://discordjs.guide/popular-topics/display-components.html)\n` +
                       `• [API Documentation](https://discord.js.org/docs/)\n` +
                       `• [Discord Developer Portal](https://discord.com/developers/docs/)\n\n` +
                       `*Built with ❤️ using Components V2*`);

        // Main container
        const helpContainer = new ContainerBuilder()
            .setAccentColor(0x7289DA) // Discord blurple
            .addTextDisplayComponents(titleDisplay)
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Large)
            )
            .addSectionComponents(commandsSection)
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Medium)
            )
            .addTextDisplayComponents(aboutDisplay)
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Medium)
            )
            .addTextDisplayComponents(techDisplay)
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Medium)
            )
            .addTextDisplayComponents(resourcesDisplay);

        await interaction.reply({
            components: [helpContainer],
            flags: MessageFlags.IsComponentsV2
        });
    }
};