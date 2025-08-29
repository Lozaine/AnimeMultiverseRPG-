const { 
    EmbedBuilder, 
    SlashCommandBuilder,
    TextDisplayBuilder,
    ContainerBuilder,
    SectionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    MessageFlags 
} = require('discord.js');
const { getCharacter, getPlayerInventory } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed, createErrorContainer } = require('../utils/embeds');
const { getExpRequiredForLevel, getExpProgressInLevel, getLevelProgress } = require('../utils/levelProgression');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your character profile')
        .addBooleanOption(option =>
            option.setName('detailed')
                .setDescription('Show detailed character statistics')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('public')
                .setDescription('Make this profile visible to others in the channel')
                .setRequired(false)),
    async execute(interaction) {
        const userId = interaction.user.id;
        const showDetailed = interaction.options.getBoolean('detailed') || false;
        const isPublic = interaction.options.getBoolean('public') || false;

        try {
            const character = await getCharacter(userId);

            if (!character) {
                const errorContainer = createErrorContainer('No Character Found', 
                    'You don\'t have a character yet! Use `/create` to create one.');
                return interaction.reply({ 
                    components: [errorContainer], 
                    flags: MessageFlags.IsComponentsV2 
                });
            }

            const faction = FACTIONS[character.faction];
            const expForCurrentLevel = getExpRequiredForLevel(character.level + 1);
            const expInCurrentLevel = getExpProgressInLevel(character.experience, character.level);
            const expToNext = expForCurrentLevel - expInCurrentLevel;
            const levelProgress = getLevelProgress(character.level, character.experience);
            const completedQuests = character.completed_quests ? character.completed_quests.split(',').length : 0;

            // Get additional character data
            const inventory = await getPlayerInventory(userId);
            const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
            const uniqueItems = inventory.length;

            // Create enhanced profile display
            const profileContainer = this.createProfileContainer(
                character, faction, expInCurrentLevel, expForCurrentLevel, 
                levelProgress, expToNext, completedQuests, totalItems, uniqueItems, showDetailed
            );

            // Create interactive components
            const components = this.createProfileComponents(userId, character, showDetailed);

            const replyOptions = {
                components: [profileContainer, ...components],
                flags: MessageFlags.IsComponentsV2
            };

            // If not public, make it ephemeral
            if (!isPublic) {
                replyOptions.ephemeral = true;
            }

            await interaction.reply(replyOptions);

        } catch (error) {
            console.error('Profile view error:', error);
            const errorContainer = createErrorContainer('Profile Error', 
                'An error occurred while retrieving your profile. Please try again.');
            await interaction.reply({ 
                components: [errorContainer], 
                flags: MessageFlags.IsComponentsV2 
            });
        }
    },

    createProfileContainer(character, faction, expInCurrentLevel, expForCurrentLevel, levelProgress, expToNext, completedQuests, totalItems, uniqueItems, showDetailed) {
        // Main header
        const headerDisplay = new TextDisplayBuilder()
            .setContent(
                `# ${faction.emoji} ${character.character_name || character.name}\n` +
                `**${faction.name}** Warrior • Level ${character.level} ⭐`
            );

        // Progress and experience section
        const progressSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 📈 Character Progress`),
                new TextDisplayBuilder().setContent(
                    `**⭐ Level:** ${character.level}\n` +
                    `**🎯 Experience:** ${expInCurrentLevel}/${expForCurrentLevel} (${levelProgress}%)\n` +
                    `**📊 Progress Bar:** ${'█'.repeat(Math.floor(levelProgress / 10))}${'░'.repeat(10 - Math.floor(levelProgress / 10))} ${levelProgress}%\n` +
                    `**📈 Next Level:** ${expToNext} XP needed\n` +
                    `**🏆 Quests Completed:** ${completedQuests}`
                )
            );

        // Combat statistics section
        const combatSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## ⚔️ Combat Statistics`),
                new TextDisplayBuilder().setContent(
                    `**❤️ Health:** ${character.hp || 100}/${character.max_hp || 100}\n` +
                    `**⚔️ Attack Power:** ${character.atk || 20}\n` +
                    `**🛡️ Defense:** ${character.def || 10}\n` +
                    `**💨 Speed:** ${character.spd || 15}\n` +
                    `**💰 Gold:** ${character.gold.toLocaleString()}`
                )
            );

        // Inventory summary section
        const inventorySection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 🎒 Inventory Summary`),
                new TextDisplayBuilder().setContent(
                    `**📦 Total Items:** ${totalItems}\n` +
                    `**🗂️ Unique Items:** ${uniqueItems}\n` +
                    `**💼 Inventory Space:** ${totalItems}/500 used`
                )
            );

        // Faction information section
        const factionSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## ${faction.emoji} ${faction.name} Information`),
                new TextDisplayBuilder().setContent(
                    `**📖 Description:** ${faction.description}\n` +
                    `**🎁 Faction Perk:** ${faction.perk}\n` +
                    `**💪 Special Ability:** ${faction.startingAbility}`
                )
            );

        // Build the main container
        const profileContainer = new ContainerBuilder()
            .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
            .addTextDisplayComponents(headerDisplay)
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Large)
            )
            .addSectionComponents(progressSection)
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
            )
            .addSectionComponents(combatSection)
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
            )
            .addSectionComponents(inventorySection)
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
            )
            .addSectionComponents(factionSection);

        // Add detailed sections if requested
        if (showDetailed) {
            profileContainer.addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Large)
            );

            // Faction-specific abilities section
            const specificAbilitySection = this.createFactionSpecificSection(character, faction);
            if (specificAbilitySection) {
                profileContainer.addSectionComponents(specificAbilitySection);
                profileContainer.addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                );
            }

            // Detailed statistics section
            const detailedStatsSection = new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## 📋 Detailed Statistics`),
                    new TextDisplayBuilder().setContent(
                        `**🎮 Character ID:** ${character.user_id.slice(-8)}...\n` +
                        `**📅 Created:** ${new Date(character.created_at).toLocaleDateString()}\n` +
                        `**⏱️ Last Active:** ${character.last_active ? new Date(character.last_active).toLocaleString() : 'Unknown'}\n` +
                        `**🎯 Total Experience Earned:** ${character.experience.toLocaleString()}\n` +
                        `**💎 Character Value:** ${this.calculateCharacterValue(character).toLocaleString()} gold`
                    )
                );

            profileContainer.addSectionComponents(detailedStatsSection);
        }

        // Footer information
        profileContainer
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Small)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `*Profile last updated: ${new Date().toLocaleString()}*\n` +
                    `*Use the buttons below to manage your character*`
                )
            );

        return profileContainer;
    },

    createFactionSpecificSection(character, faction) {
        let sectionContent = null;
        let sectionTitle = '';

        switch (character.faction) {
            case 'one_piece':
                if (character.devil_fruit) {
                    sectionTitle = '🍎 Devil Fruit Powers';
                    sectionContent = `**Devil Fruit:** ${character.devil_fruit}\n**Type:** Paramecia/Logia/Zoan\n**Awakened:** ${character.devil_fruit_awakened ? 'Yes' : 'No'}`;
                }
                break;
            case 'naruto':
                if (character.chakra_nature) {
                    sectionTitle = '🌀 Ninja Abilities';
                    sectionContent = `**Chakra Nature:** ${character.chakra_nature}\n**Rank:** ${character.ninja_rank || 'Genin'}\n**Village:** ${character.village || 'Unknown'}`;
                }
                break;
            case 'jujutsu_kaisen':
                if (character.cursed_technique) {
                    sectionTitle = '👁️ Jujutsu Abilities';
                    sectionContent = `**Cursed Technique:** ${character.cursed_technique}\n**Grade:** ${character.sorcerer_grade || 'Grade 4'}\n**Domain Expansion:** ${character.domain_expansion || 'None'}`;
                }
                break;
            case 'demon_slayer':
                if (character.breathing_style) {
                    sectionTitle = '🌬️ Demon Slayer Abilities';
                    sectionContent = `**Breathing Style:** ${character.breathing_style}\n**Rank:** ${character.slayer_rank || 'Mizunoto'}\n**Sword Color:** ${character.sword_color || 'Standard'}`;
                }
                break;
        }

        if (sectionContent) {
            return new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## ${sectionTitle}`),
                    new TextDisplayBuilder().setContent(sectionContent)
                );
        }

        return null;
    },

    calculateCharacterValue(character) {
        let value = character.gold;
        value += character.level * 100;
        value += character.experience * 0.1;
        return Math.floor(value);
    },

    createProfileComponents(userId, character, showDetailed) {
        const components = [];

        // Main action buttons
        const mainActionRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`view_inventory_${userId}`)
                    .setLabel('🎒 Inventory')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`start_quest_${userId}`)
                    .setLabel('🗺️ Quest')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId(`character_stats_${userId}`)
                    .setLabel('📊 Stats')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(`profile_settings_${userId}`)
                    .setLabel('⚙️ Settings')
                    .setStyle(ButtonStyle.Secondary)
            );

        components.push(mainActionRow);

        // Profile view options
        const viewOptionsMenu = new StringSelectMenuBuilder()
            .setCustomId(`profile_view_${userId}`)
            .setPlaceholder('📋 Change profile view...')
            .addOptions([
                {
                    label: 'Standard View',
                    description: 'Basic character information and stats',
                    value: 'standard',
                    emoji: '👤'
                },
                {
                    label: 'Detailed View',
                    description: 'Comprehensive character data and statistics',
                    value: 'detailed',
                    emoji: '📊'
                },
                {
                    label: 'Combat Focus',
                    description: 'Emphasize combat stats and abilities',
                    value: 'combat',
                    emoji: '⚔️'
                },
                {
                    label: 'Progression Focus',
                    description: 'Show experience and level progression details',
                    value: 'progression',
                    emoji: '📈'
                }
            ]);

        components.push(new ActionRowBuilder().addComponents(viewOptionsMenu));

        // Utility buttons
        const utilityRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`refresh_profile_${userId}`)
                    .setLabel('🔄 Refresh')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`share_profile_${userId}`)
                    .setLabel('📤 Share Profile')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(`profile_export_${userId}`)
                    .setLabel('💾 Export Data')
                    .setStyle(ButtonStyle.Secondary)
            );

        // Add comparison button if character level is high enough
        if (character.level >= 5) {
            utilityRow.addComponents(
                new ButtonBuilder()
                    .setCustomId(`compare_character_${userId}`)
                    .setLabel('⚖️ Compare')
                    .setStyle(ButtonStyle.Secondary)
            );
        }

        components.push(utilityRow);

        return components;
    }
};