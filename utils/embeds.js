const { 
    EmbedBuilder, 
    TextDisplayBuilder, 
    ContainerBuilder, 
    SectionBuilder, 
    SeparatorBuilder, 
    SeparatorSpacingSize,
    MessageFlags 
} = require('discord.js');

// Create a standard embed with consistent styling
function createEmbed(title, description, color = '#4f46e5') {
    return new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp();
}

// Create an error embed
function createErrorEmbed(title, description) {
    return createEmbed(title, description, '#ff6b6b');
}

// Create a success embed
function createSuccessEmbed(title, description) {
    return createEmbed(title, description, '#00ff00');
}

// Create an info embed
function createInfoEmbed(title, description) {
    return createEmbed(title, description, '#4f46e5');
}

// Create a warning embed
function createWarningEmbed(title, description) {
    return createEmbed(title, description, '#fbbf24');
}

// === NEW COMPONENTS V2 HELPERS ===

// Create a standard Components V2 container
function createComponentsV2Container(title, description, color = 0x4f46e5) {
    const titleDisplay = new TextDisplayBuilder()
        .setContent(`# ${title}\n${description}`);

    return new ContainerBuilder()
        .setAccentColor(color)
        .addTextDisplayComponents(titleDisplay);
}

// Create an error container (Components V2)
function createErrorContainer(title, description) {
    return createComponentsV2Container(title, description, 0xff6b6b);
}

// Create a success container (Components V2)
function createSuccessContainer(title, description) {
    return createComponentsV2Container(title, description, 0x00ff00);
}

// Create an info container (Components V2)
function createInfoContainer(title, description) {
    return createComponentsV2Container(title, description, 0x4f46e5);
}

// Create a warning container (Components V2)
function createWarningContainer(title, description) {
    return createComponentsV2Container(title, description, 0xfbbf24);
}

// Create a character container with faction styling (Components V2)
function createCharacterContainer(character, faction) {
    const titleDisplay = new TextDisplayBuilder()
        .setContent(`# ${faction.emoji} ${character.character_name || character.name}\n**${faction.name}** - Level ${character.level}`);

    const statsDisplay = new TextDisplayBuilder()
        .setContent(
            `**⭐ Level:** ${character.level}\n` +
            `**🎯 Experience:** ${character.experience}\n` +
            `**💰 Gold:** ${character.gold}`
        );

    return new ContainerBuilder()
        .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
        .addTextDisplayComponents(titleDisplay)
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        )
        .addTextDisplayComponents(statsDisplay);
}

// Create a character embed with faction styling
function createCharacterEmbed(character, faction) {
    const embed = new EmbedBuilder()
        .setColor(faction.color)
        .setTitle(`${faction.emoji} ${character.name}`)
        .setDescription(`**${faction.name}** - Level ${character.level}`)
        .addFields([
            { name: '⭐ Level', value: character.level.toString(), inline: true },
            { name: '🎯 Experience', value: `${character.experience}/${character.level * 100}`, inline: true },
            { name: '💰 Gold', value: character.gold.toString(), inline: true }
        ])
        .setTimestamp();
    
    return embed;
}

// Create a quest embed
function createQuestEmbed(quest, faction) {
    const embed = new EmbedBuilder()
        .setColor(faction.color)
        .setTitle(`${faction.emoji} ${quest.name}`)
        .setDescription(quest.description)
        .addFields([
            { name: '⭐ Level Required', value: quest.levelRequirement.toString(), inline: true },
            { name: '🎯 Experience Reward', value: quest.reward.experience.toString(), inline: true },
            { name: '💰 Gold Reward', value: quest.reward.gold.toString(), inline: true }
        ])
        .setTimestamp();
    
    return embed;
}

// Create a quest container (Components V2)
function createQuestContainer(quest, faction) {
    const titleDisplay = new TextDisplayBuilder()
        .setContent(`# ${faction.emoji} ${quest.title || quest.name}\n${quest.description}`);

    const rewardsDisplay = new TextDisplayBuilder()
        .setContent(
            `**⭐ Level Required:** ${quest.levelRequirement || quest.levelReq || 1}\n` +
            `**🎯 Experience Reward:** ${quest.reward?.experience || quest.xpReward || 0}\n` +
            `**💰 Gold Reward:** ${quest.reward?.gold || quest.coinReward || 0}`
        );

    return new ContainerBuilder()
        .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
        .addTextDisplayComponents(titleDisplay)
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        )
        .addTextDisplayComponents(rewardsDisplay);
}

module.exports = {
    createEmbed,
    createErrorEmbed,
    createSuccessEmbed,
    createInfoEmbed,
    createWarningEmbed,
    createCharacterEmbed,
    createQuestEmbed,
    // Components V2 exports
    createComponentsV2Container,
    createErrorContainer,
    createSuccessContainer,
    createInfoContainer,
    createWarningContainer,
    createCharacterContainer,
    createQuestContainer,
    MessageFlags
};
