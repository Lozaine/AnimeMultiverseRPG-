const { 
    SlashCommandBuilder, 
    TextDisplayBuilder, 
    ContainerBuilder,
    SectionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags 
} = require('discord.js');

function createGallery(spoilerMode = false) {
    // Gallery title
    const titleDisplay = new TextDisplayBuilder()
        .setContent(`# 🖼️ Components V2 Gallery\n*Showcasing advanced layout features*`);

    // Feature showcase section
    const featuresSection = new SectionBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`**🎨 Styling Features:**`),
            new TextDisplayBuilder().setContent(`• Accent colors and borders\n• Spoiler blur effects\n• Rich markdown formatting`),
            new TextDisplayBuilder().setContent(`**📱 Layout Components:**\n• Containers and sections\n• Separators and spacing\n• Button accessories`)
        )
        .setButtonAccessory(
            new ButtonBuilder()
                .setCustomId('toggle_spoiler')
                .setLabel(spoilerMode ? '👁️ Show Content' : '🙈 Hide Content')
                .setStyle(spoilerMode ? ButtonStyle.Primary : ButtonStyle.Secondary)
        );

    // Code example display
    const codeDisplay = new TextDisplayBuilder()
        .setContent(`## 💻 Code Example\n\n` +
                   `\`\`\`javascript\n` +
                   `const container = new ContainerBuilder()\n` +
                   `  .setAccentColor(0xFF6B6B)\n` +
                   `  .setSpoiler(${spoilerMode})\n` +
                   `  .addTextDisplayComponents(\n` +
                   `    new TextDisplayBuilder()\n` +
                   `      .setContent('# Hello Components V2!')\n` +
                   `  );\n` +
                   `\`\`\``);

    // Tips section
    const tipsDisplay = new TextDisplayBuilder()
        .setContent(`## 💡 Pro Tips\n\n` +
                   `• Use \`MessageFlags.IsComponentsV2\` flag\n` +
                   `• Cannot mix with embeds or traditional content\n` +
                   `• Max 40 components per message\n` +
                   `• Max 4000 characters total across all text displays`);

    // Main container
    const gallery = new ContainerBuilder()
        .setAccentColor(0xFF6B6B) // Red accent
        .setSpoiler(spoilerMode)
        .addTextDisplayComponents(titleDisplay)
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Large)
        )
        .addSectionComponents(featuresSection)
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Medium)
        )
        .addTextDisplayComponents(codeDisplay)
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Medium)
        )
        .addTextDisplayComponents(tipsDisplay);

    return gallery;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gallery')
        .setDescription('Display an advanced Components V2 gallery with interactive features'),
    
    async execute(interaction) {
        const gallery = createGallery(false);
        
        await interaction.reply({
            components: [gallery],
            flags: MessageFlags.IsComponentsV2
        });
    },

    // Handle spoiler toggle
    async handleToggleSpoiler(interaction) {
        // Get current spoiler state from button label
        const currentlySpoiled = interaction.message.components[0].components
            .some(comp => comp.components?.some(c => c.label?.includes('Show Content')));
        
        const gallery = createGallery(!currentlySpoiled);
        
        await interaction.update({
            components: [gallery],
            flags: MessageFlags.IsComponentsV2
        });
    }
};