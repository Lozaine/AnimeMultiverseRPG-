const { 
    SlashCommandBuilder, 
    TextDisplayBuilder, 
    ContainerBuilder,
    SectionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    MessageFlags 
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('advanced')
        .setDescription('Showcase advanced Components V2 features with multiple containers'),
    
    async execute(interaction) {
        // First container - User profile
        const userProfileContainer = new ContainerBuilder()
            .setAccentColor(0x9B59B6) // Purple
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# 👤 User Profile\n**${interaction.user.displayName}**`)
            )
            .addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`**User ID:** \`${interaction.user.id}\``),
                        new TextDisplayBuilder().setContent(`**Account Created:** ${interaction.user.createdAt.toDateString()}`),
                        new TextDisplayBuilder().setContent(`**Bot:** ${interaction.user.bot ? '🤖 Yes' : '👤 No'}`)
                    )
            );

        // Second container - Server info with spoiler
        const serverInfoContainer = new ContainerBuilder()
            .setAccentColor(0xE74C3C) // Red
            .setSpoiler(true)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# 🏠 Server Information\n*Click to reveal server details*`)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**Server:** ${interaction.guild?.name || 'DM Channel'}\n` +
                    `**Members:** ${interaction.guild?.memberCount || 1}\n` +
                    `**Created:** ${interaction.guild?.createdAt?.toDateString() || 'N/A'}\n` +
                    `**Boost Level:** ${interaction.guild?.premiumTier || 0} 🚀`
                )
            );

        // Third container - Interactive features
        const interactiveContainer = new ContainerBuilder()
            .setAccentColor(0x2ECC71) // Green
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# 🎮 Interactive Features\n*Components V2 supports various interactive elements*`)
            )
            .addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`**Available Features:**`),
                        new TextDisplayBuilder().setContent(`• Button accessories in sections\n• Select menu components\n• Spoiler blur effects\n• Custom accent colors`),
                        new TextDisplayBuilder().setContent(`• Separators with different spacing\n• Nested component layouts\n• Rich markdown formatting`)
                    )
                    .setButtonAccessory(
                        new ButtonBuilder()
                            .setCustomId('demo_button')
                            .setLabel('🎯 Demo Button')
                            .setStyle(ButtonStyle.Primary)
                    )
            );

        // Fourth container - Code showcase
        const codeContainer = new ContainerBuilder()
            .setAccentColor(0xF39C12) // Orange
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# 💻 Multiple Containers Example`)
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Small)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `\`\`\`javascript\n` +
                    `// You can send multiple containers in one message!\n` +
                    `await interaction.reply({\n` +
                    `  components: [\n` +
                    `    container1,\n` +
                    `    container2,\n` +
                    `    container3,\n` +
                    `    container4\n` +
                    `  ],\n` +
                    `  flags: MessageFlags.IsComponentsV2\n` +
                    `});\n` +
                    `\`\`\``
                )
            );

        // Traditional action row for select menu (Components V2 can coexist with traditional components)
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('demo_select')
            .setPlaceholder('Choose a component type...')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('TextDisplayBuilder')
                    .setDescription('Rich text with full markdown support')
                    .setValue('text_display')
                    .setEmoji('📝'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('ContainerBuilder')
                    .setDescription('Groups components with accent colors')
                    .setValue('container')
                    .setEmoji('📦'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('SectionBuilder')
                    .setDescription('Combines text with button accessories')
                    .setValue('section')
                    .setEmoji('🔧'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('SeparatorBuilder')
                    .setDescription('Visual spacing and dividers')
                    .setValue('separator')
                    .setEmoji('➖')
            );

        const actionRow = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
            components: [
                userProfileContainer,
                serverInfoContainer,
                interactiveContainer,
                codeContainer,
                actionRow // Traditional components can be mixed
            ],
            flags: MessageFlags.IsComponentsV2
        });
    }
};