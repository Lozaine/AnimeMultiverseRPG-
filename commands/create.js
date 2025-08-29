const { 
    EmbedBuilder, 
    SlashCommandBuilder,
    TextDisplayBuilder,
    ContainerBuilder,
    SectionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    StringSelectMenuBuilder,
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

            // If no faction specified, show enhanced faction selection
            if (!factionChoice) {
                // Create main header
                const headerDisplay = new TextDisplayBuilder()
                    .setContent(`# 🌟 Welcome to Cross Realm Chronicles!\n*Choose your destiny and forge your legend*`);

                // Create faction sections with enhanced styling
                const factionSections = Object.keys(FACTIONS).map(key => {
                    const faction = FACTIONS[key];
                    return new SectionBuilder()
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent(`## ${faction.emoji} ${faction.name}`),
                            new TextDisplayBuilder().setContent(
                                `**Description:** ${faction.description}\n` +
                                `**🎁 Faction Perk:** ${faction.perk}\n` +
                                `**💪 Starting Ability:** ${faction.startingAbility || 'Basic Combat Skills'}`
                            )
                        );
                });

                // Create interactive faction selector
                const factionSelectMenu = new StringSelectMenuBuilder()
                    .setCustomId(`faction_select_${userId}`)
                    .setPlaceholder('🎯 Select your faction to begin your journey...')
                    .addOptions(
                        Object.keys(FACTIONS).map(key => {
                            const faction = FACTIONS[key];
                            return {
                                label: faction.name,
                                description: `${faction.perk.substring(0, 90)}...`,
                                value: key,
                                emoji: faction.emoji
                            };
                        })
                    );

                const selectRow = new ActionRowBuilder().addComponents(factionSelectMenu);

                // Create quick action buttons
                const buttonRow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`random_faction_${userId}`)
                            .setLabel('🎲 Random Faction')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('🎲'),
                        new ButtonBuilder()
                            .setCustomId(`faction_details_${userId}`)
                            .setLabel('📖 Learn More')
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji('📖'),
                        new ButtonBuilder()
                            .setCustomId('create_cancel')
                            .setLabel('❌ Cancel')
                            .setStyle(ButtonStyle.Danger)
                    );

                // Instructions section
                const instructionsDisplay = new TextDisplayBuilder()
                    .setContent(
                        `## 🎮 How to Create Your Character\n\n` +
                        `**Method 1:** Use the dropdown menu above to select your faction\n` +
                        `**Method 2:** Use the command: \`/create faction:[choice] character_name:[name]\`\n` +
                        `**Method 3:** Click "🎲 Random Faction" for a surprise!\n\n` +
                        `*Your character name will default to your Discord username if not specified.*`
                    );

                // Build the enhanced container
                const factionContainer = new ContainerBuilder()
                    .setAccentColor(0x4f46e5)
                    .addTextDisplayComponents(headerDisplay)
                    .addSeparatorComponents(
                        new SeparatorBuilder()
                            .setDivider(true)
                            .setSpacing(SeparatorSpacingSize.Medium)
                    );

                // Add all faction sections
                factionSections.forEach((section, index) => {
                    factionContainer.addSectionComponents(section);
                    if (index < factionSections.length - 1) {
                        factionContainer.addSeparatorComponents(
                            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                        );
                    }
                });

                factionContainer
                    .addSeparatorComponents(
                        new SeparatorBuilder()
                            .setDivider(true)
                            .setSpacing(SeparatorSpacingSize.Medium)
                    )
                    .addTextDisplayComponents(instructionsDisplay);

                return interaction.reply({ 
                    components: [factionContainer, selectRow, buttonRow], 
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

            // Create enhanced success display
            const successHeaderDisplay = new TextDisplayBuilder()
                .setContent(
                    `# 🎉 Welcome to ${selectedFaction.name}!\n` +
                    `**${finalCharacterName}** has joined the ranks!`
                );

            // Character overview section
            const characterSection = new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## 👤 Character Information`),
                    new TextDisplayBuilder().setContent(
                        `**Name:** ${character.character_name}\n` +
                        `**Faction:** ${selectedFaction.emoji} ${selectedFaction.name}\n` +
                        `**Level:** ${character.level} ⭐\n` +
                        `**Experience:** ${character.experience}/100 🎯`
                    )
                );

            // Combat stats section
            const combatSection = new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## ⚔️ Combat Statistics`),
                    new TextDisplayBuilder().setContent(
                        `**❤️ Health:** ${baseStats.hp}/${baseStats.maxHp}\n` +
                        `**⚔️ Attack:** ${baseStats.atk} | **🛡️ Defense:** ${baseStats.def}\n` +
                        `**💨 Speed:** ${baseStats.spd} | **💰 Gold:** ${character.gold}`
                    )
                );

            // Faction abilities section
            const abilitiesSection = new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## 💪 Faction Abilities`),
                    new TextDisplayBuilder().setContent(
                        `**🎁 Faction Perk:** ${selectedFaction.perk}\n` +
                        `**💫 Starting Ability:** ${selectedFaction.startingAbility}`
                    )
                );

            // Next steps section
            const nextStepsDisplay = new TextDisplayBuilder()
                .setContent(
                    `## 🚀 Ready to Begin Your Adventure?\n\n` +
                    `Your character has been created and is ready for action!\n\n` +
                    `**Next Steps:**\n` +
                    `• Use \`/profile\` to view your full character sheet\n` +
                    `• Use \`/quest\` to start your first adventure\n` +
                    `• Use \`/inventory\` to manage your items\n\n` +
                    `*May your journey be legendary! ${selectedFaction.emoji}*`
                );

            // Action buttons for new character
            const actionRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`view_profile_${userId}`)
                        .setLabel('👤 View Profile')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(`start_quest_${userId}`)
                        .setLabel('🗺️ Start Quest')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`view_inventory_${userId}`)
                        .setLabel('🎒 Inventory')
                        .setStyle(ButtonStyle.Secondary)
                );

            // Build success container
            const successContainer = new ContainerBuilder()
                .setAccentColor(parseInt(selectedFaction.color.replace('#', ''), 16))
                .addTextDisplayComponents(successHeaderDisplay)
                .addSeparatorComponents(
                    new SeparatorBuilder()
                        .setDivider(true)
                        .setSpacing(SeparatorSpacingSize.Medium)
                )
                .addSectionComponents(characterSection)
                .addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                )
                .addSectionComponents(combatSection)
                .addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                )
                .addSectionComponents(abilitiesSection)
                .addSeparatorComponents(
                    new SeparatorBuilder()
                        .setDivider(true)
                        .setSpacing(SeparatorSpacingSize.Medium)
                )
                .addTextDisplayComponents(nextStepsDisplay);

            interaction.reply({ 
                components: [successContainer, actionRow], 
                flags: MessageFlags.IsComponentsV2 
            });

        } catch (error) {
            console.error('Character creation error:', error);
            const errorContainer = createErrorContainer('Creation Failed', 
                'An error occurred while creating your character. Please try again.');
            interaction.reply({ 
                components: [errorContainer], 
                flags: MessageFlags.IsComponentsV2 
            });
        }
    }
};