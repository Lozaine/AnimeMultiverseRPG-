const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { createCharacter, getCharacter } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed } = require('../utils/embeds');
const { getBaseStatsForLevel } = require('../utils/levelProgression');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Create a new character and choose your faction')
        .addStringOption(option =>
            option.setName('faction')
                .setDescription('Choose your faction')
                .setRequired(false)
                .addChoices(
                    { name: '🏴‍☠️ One Piece Pirates', value: 'one_piece' },
                    { name: '🥷 Naruto Shinobi', value: 'naruto' },
                    { name: '👁️ Jujutsu Sorcerers', value: 'jujutsu_kaisen' },
                    { name: '⚔️ Demon Slayers', value: 'demon_slayer' }
                )),
    async execute(interaction) {
        const userId = interaction.user.id;
        
        try {
            // Check if user already has a character
            const existingCharacter = await getCharacter(userId);
            if (existingCharacter) {
                const embed = createEmbed('Character Already Exists', 
                    `You already have a character! Use \`/profile\` to view your character.`, 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }

            // Get faction choice from interaction
            const factionChoice = interaction.options.getString('faction');
            
            // If no faction specified, show faction selection
            if (!factionChoice) {
                const factionList = Object.keys(FACTIONS).map((key, index) => {
                    const faction = FACTIONS[key];
                    return `**${index + 1}. ${faction.name}** ${faction.emoji}\n${faction.description}\n**Perk:** ${faction.perk}`;
                }).join('\n\n');

                const embed = createEmbed('🌟 Choose Your Faction', 
                    `Welcome to Cross Realm Chronicles! Choose your faction:\n\n${factionList}\n\nUse: \`/create faction:[your_choice]\``, 
                    '#4f46e5');
                
                return interaction.reply({ embeds: [embed] });
            }

            // Validate faction choice
            if (!FACTIONS[factionChoice]) {
                const embed = createEmbed('Invalid Faction', 
                    'Please choose a valid faction from the dropdown options.', 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }

            const selectedFaction = FACTIONS[factionChoice];

            // Create character
            const character = await createCharacter(userId, interaction.user.username, factionChoice);

            // Get base stats for level 1
            const baseStats = getBaseStatsForLevel(1);
            
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
                    { name: '❤️ Health', value: `${baseStats.hp}/${baseStats.maxHp}`, inline: true },
                    { name: '⚔️ Attack', value: baseStats.atk.toString(), inline: true },
                    { name: '💪 Starting Ability', value: selectedFaction.startingAbility, inline: false },
                    { name: '🎁 Faction Perk', value: selectedFaction.perk, inline: false }
                ])
                .setFooter({ text: 'Use /profile to view your character • /quest to start your journey!' })
                .setTimestamp();

            interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Character creation error:', error);
            const embed = createEmbed('Creation Failed', 
                'An error occurred while creating your character. Please try again.', 
                '#ff6b6b');
            interaction.reply({ embeds: [embed] });
        }
    }
};
