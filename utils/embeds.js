const { EmbedBuilder } = require('discord.js');

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

module.exports = {
    createEmbed,
    createErrorEmbed,
    createSuccessEmbed,
    createInfoEmbed,
    createWarningEmbed,
    createCharacterEmbed,
    createQuestEmbed
};
