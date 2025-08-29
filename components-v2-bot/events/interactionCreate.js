module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (interaction.isChatInputCommand()) {
            console.log(`🔤 Command used: /${interaction.commandName} by ${interaction.user.tag}`);
        } else if (interaction.isButton()) {
            console.log(`🔘 Button pressed: ${interaction.customId} by ${interaction.user.tag}`);
        } else if (interaction.isStringSelectMenu()) {
            console.log(`📋 Select menu used: ${interaction.customId} by ${interaction.user.tag}`);
        }
    }
};