const { 
    SlashCommandBuilder, 
    TextDisplayBuilder, 
    ContainerBuilder,
    SectionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    MessageFlags 
} = require('discord.js');

function createDashboard(interaction) {
    const stats = {
        serverName: interaction.guild?.name || 'DM Channel',
        memberCount: interaction.guild?.memberCount || 1,
        channelCount: interaction.guild?.channels?.cache.size || 1,
        roleCount: interaction.guild?.roles?.cache.size || 1,
        timestamp: new Date().toLocaleString()
    };

    // Main title
    const titleDisplay = new TextDisplayBuilder()
        .setContent(`# 📊 Server Dashboard\n*Real-time server statistics*`);

    // Stats sections
    const serverInfoSection = new SectionBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`**Server Name:** ${stats.serverName}`),
            new TextDisplayBuilder().setContent(`**Last Updated:** ${stats.timestamp}`)
        )
        .setButtonAccessory(
            new ButtonBuilder()
                .setCustomId('refresh_stats')
                .setLabel('🔄 Refresh')
                .setStyle(ButtonStyle.Secondary)
        );

    const memberStatsDisplay = new TextDisplayBuilder()
        .setContent(`**👥 Total Members:** ${stats.memberCount}\n` +
                   `**📝 Channels:** ${stats.channelCount}\n` +
                   `**🎭 Roles:** ${stats.roleCount}`);

    // Status indicator
    const statusDisplay = new TextDisplayBuilder()
        .setContent(`## 🟢 System Status: **ONLINE**\n` +
                   `All systems operational`);

    // Container with all components
    const dashboard = new ContainerBuilder()
        .setAccentColor(0x00FF00) // Green accent
        .addTextDisplayComponents(titleDisplay)
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Medium)
        )
        .addSectionComponents(serverInfoSection)
        .addTextDisplayComponents(memberStatsDisplay)
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        )
        .addTextDisplayComponents(statusDisplay);

    return dashboard;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dashboard')
        .setDescription('Display a server dashboard using Components V2'),
    
    async execute(interaction) {
        const dashboard = createDashboard(interaction);
        
        await interaction.reply({
            components: [dashboard],
            flags: MessageFlags.IsComponentsV2
        });
    },

    // Handle refresh button
    async handleRefresh(interaction) {
        const dashboard = createDashboard(interaction);
        
        await interaction.update({
            components: [dashboard],
            flags: MessageFlags.IsComponentsV2
        });
    }
};