const { 
    EmbedBuilder, 
    SlashCommandBuilder,
    TextDisplayBuilder,
    ContainerBuilder,
    SectionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MessageFlags 
} = require('discord.js');
const { createCharacter, getCharacter } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed, createErrorContainer, createSuccessContainer } = require('../utils/embeds');
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
                ))
        .addStringOption(option =>
            option.setName('character_name')
                .setDescription('Your character\'s name')
                .setRequired(false)
                .setMinLength(2)
                .setMaxLength(25)),
    async execute(interaction) {
        const userId = interaction.user.id;
        
        try {
            // Check if user already has a character
            const existingCharacter = await getCharacter(userId);
            if (existingCharacter) {
                const errorContainer = createErrorContainer('Character Already Exists', 
                    'You already have a character! Use `/profile` to view your character.');
                return interaction.reply({ 
                    components: [errorContainer], 
                    flags: MessageFlags.IsComponentsV2 
                });
            }

            // Get faction choice and character name from interaction
            const factionChoice = interaction.options.getString('faction');
            const characterName = interaction.options.getString('character_name');
            
            // If no faction specified, show faction selection
            if (!factionChoice) {
                const factionList = Object.keys(FACTIONS).map((key, index) => {
                    const faction = FACTIONS[key];
                    return `**${index + 1}. ${faction.name}** ${faction.emoji}\n${faction.description}\n**Perk:** ${faction.perk}`;
                }).join('\n\n');

                const titleDisplay = new TextDisplayBuilder()
                    .setContent(`# 🌟 Choose Your Faction\nWelcome to Cross Realm Chronicles! Choose your faction:`);

                const factionsDisplay = new TextDisplayBuilder()
                    .setContent(factionList);

                const instructionsDisplay = new TextDisplayBuilder()
                    .setContent(`*Use: \`/create faction:[your_choice] character_name:[your_name]\`*`);

                const factionContainer = new ContainerBuilder()
                    .setAccentColor(0x4f46e5)
                    .addTextDisplayComponents(titleDisplay)
                    .addSeparatorComponents(
                        new SeparatorBuilder()
                            .setDivider(true)
                            .setSpacing(SeparatorSpacingSize.Medium)
                    )
                    .addTextDisplayComponents(factionsDisplay)
                    .addSeparatorComponents(
                        new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                    )
                    .addTextDisplayComponents(instructionsDisplay);
                
                return interaction.reply({ 
                    components: [factionContainer], 
                    flags: MessageFlags.IsComponentsV2 
                });
            }

            // Validate faction choice
            if (!FACTIONS[factionChoice]) {
                const embed = createEmbed('Invalid Faction', 
                    'Please choose a valid faction from the dropdown options.', 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }

            const selectedFaction = FACTIONS[factionChoice];

            // Use provided character name or default to Discord username
            const finalCharacterName = characterName || interaction.user.username;

            // Create character
            const character = await createCharacter(userId, interaction.user.username, finalCharacterName, factionChoice);

            // Get base stats for level 1
            const baseStats = getBaseStatsForLevel(1);
            
            // Success embed
            const embed = new EmbedBuilder()
                .setColor(selectedFaction.color)
                .setTitle(`🎉 Character Created Successfully!`)
                .setDescription(`Welcome to the **${selectedFaction.name}**!`)
                .addFields([
                    { name: '👤 Character Name', value: character.character_name, inline: true },
                    { name: '⚔️ Faction', value: `${selectedFaction.emoji} ${selectedFaction.name}`, inline: true },
                    { name: '⭐ Level', value: character.level.toString(), inline: true },
                    { name: '🎯 Experience', value: `${character.experience}/100`, inline: true },
                    { name: '❤️ Health', value: `${baseStats.hp}/${baseStats.maxHp}`, inline: true },
                    { name: '⚔️ Attack', value: baseStats.atk.toString(), inline: true },
                    { name: '🛡️ Defense', value: baseStats.def.toString(), inline: true },
                    { name: '💨 Speed', value: baseStats.spd.toString(), inline: true },
                    { name: '💰 Gold', value: character.gold.toString(), inline: true },
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
