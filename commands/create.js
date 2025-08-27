const { EmbedBuilder } = require('discord.js');
const { createCharacter, getCharacter } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed } = require('../utils/embeds');

module.exports = {
    name: 'create',
    description: 'Create a new character and choose your faction',
    async execute(message, args) {
        const userId = message.author.id;
        
        try {
            // Check if user already has a character
            const existingCharacter = await getCharacter(userId);
            if (existingCharacter) {
                const embed = createEmbed('Character Already Exists', 
                    `You already have a character! Use \`!profile\` to view your character.`, 
                    '#ff6b6b');
                return message.reply({ embeds: [embed] });
            }

            // If no faction specified, show faction selection
            if (!args[0]) {
                const factionList = Object.keys(FACTIONS).map((key, index) => {
                    const faction = FACTIONS[key];
                    return `**${index + 1}. ${faction.name}** ${faction.emoji}\n${faction.description}\n**Perk:** ${faction.perk}`;
                }).join('\n\n');

                const embed = createEmbed('🌟 Choose Your Faction', 
                    `Welcome to Cross Realm Chronicles! Choose your faction:\n\n${factionList}\n\nUse: \`!create [faction_number]\``, 
                    '#4f46e5');
                
                return message.reply({ embeds: [embed] });
            }

            // Parse faction choice
            const factionChoice = parseInt(args[0]);
            const factionKeys = Object.keys(FACTIONS);
            
            if (isNaN(factionChoice) || factionChoice < 1 || factionChoice > factionKeys.length) {
                const embed = createEmbed('Invalid Faction', 
                    `Please choose a valid faction number (1-${factionKeys.length})`, 
                    '#ff6b6b');
                return message.reply({ embeds: [embed] });
            }

            const selectedFactionKey = factionKeys[factionChoice - 1];
            const selectedFaction = FACTIONS[selectedFactionKey];

            // Create character
            const character = await createCharacter(userId, message.author.username, selectedFactionKey);

            // Success embed
            const embed = new EmbedBuilder()
                .setColor(selectedFaction.color)
                .setTitle(`🎉 Character Created Successfully!`)
                .setDescription(`Welcome to the **${selectedFaction.name}**!`)
                .addFields([
                    { name: '👤 Character Name', value: character.name, inline: true },
                    { name: '⚔️ Faction', value: `${selectedFaction.emoji} ${selectedFaction.name}`, inline: true },
                    { name: '⭐ Level', value: character.level.toString(), inline: true },
                    { name: '🎯 Experience', value: `${character.experience}/100`, inline: true },
                    { name: '💪 Starting Ability', value: selectedFaction.startingAbility, inline: false },
                    { name: '🎁 Faction Perk', value: selectedFaction.perk, inline: false }
                ])
                .setFooter({ text: 'Use !profile to view your character • !quest to start your journey!' })
                .setTimestamp();

            message.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Character creation error:', error);
            const embed = createEmbed('Creation Failed', 
                'An error occurred while creating your character. Please try again.', 
                '#ff6b6b');
            message.reply({ embeds: [embed] });
        }
    }
};
