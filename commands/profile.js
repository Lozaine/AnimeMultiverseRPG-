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
const { getCharacter } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed, createErrorContainer } = require('../utils/embeds');
const { getExpRequiredForLevel, getExpProgressInLevel, getLevelProgress } = require('../utils/levelProgression');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your character profile'),
    async execute(interaction) {
        const userId = interaction.user.id;
        
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

            // Create the character profile using Components V2
            const titleDisplay = new TextDisplayBuilder()
                .setContent(`# ${faction.emoji} ${character.character_name || character.name}'s Profile\n**${faction.name}** Warrior`);

            // Basic stats section
            const basicStatsSection = new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## 📊 Character Stats`),
                    new TextDisplayBuilder().setContent(
                        `**⭐ Level:** ${character.level} | **🎯 Experience:** ${expInCurrentLevel}/${expForCurrentLevel} (${levelProgress}%)\n` +
                        `**📈 Next Level:** ${expToNext} XP needed | **💰 Gold:** ${character.gold}\n` +
                        `**🏆 Quests Completed:** ${completedQuests}`
                    )
                );

            // Combat stats
            const combatStatsDisplay = new TextDisplayBuilder()
                .setContent(
                    `## ⚔️ Combat Stats\n\n` +
                    `**❤️ Health:** ${character.hp || 100}/${character.max_hp || 100}\n` +
                    `**⚔️ Attack:** ${character.atk || 20} | **🛡️ Defense:** ${character.def || 10} | **💨 Speed:** ${character.spd || 15}`
                );

            // Faction info
            const factionInfoDisplay = new TextDisplayBuilder()
                .setContent(
                    `## ${faction.emoji} ${faction.name} Information\n\n` +
                    `**🎁 Faction Perk:** ${faction.perk}\n\n` +
                    `**💪 Special Ability:** ${faction.startingAbility}`
                );

            // Faction-specific stats
            let factionSpecificDisplay = null;
            if (character.faction === 'one_piece' && character.devil_fruit) {
                factionSpecificDisplay = new TextDisplayBuilder()
                    .setContent(`## 🍎 Devil Fruit Powers\n**${character.devil_fruit}**`);
            } else if (character.faction === 'naruto' && character.chakra_nature) {
                factionSpecificDisplay = new TextDisplayBuilder()
                    .setContent(`## 🌀 Chakra Nature\n**${character.chakra_nature}**`);
            } else if (character.faction === 'jujutsu_kaisen' && character.cursed_technique) {
                factionSpecificDisplay = new TextDisplayBuilder()
                    .setContent(`## 👁️ Cursed Technique\n**${character.cursed_technique}**`);
            } else if (character.faction === 'demon_slayer' && character.breathing_style) {
                factionSpecificDisplay = new TextDisplayBuilder()
                    .setContent(`## 🌬️ Breathing Style\n**${character.breathing_style}**`);
            }

            // Footer info
            const footerDisplay = new TextDisplayBuilder()
                .setContent(`*Character created on ${new Date(character.created_at).toDateString()}*`);

            // Build the container
            const profileContainer = new ContainerBuilder()
                .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
                .addTextDisplayComponents(titleDisplay)
                .addSeparatorComponents(
                    new SeparatorBuilder()
                        .setDivider(true)
                        .setSpacing(SeparatorSpacingSize.Medium)
                )
                .addSectionComponents(basicStatsSection)
                .addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                )
                .addTextDisplayComponents(combatStatsDisplay)
                .addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                )
                .addTextDisplayComponents(factionInfoDisplay);

            if (factionSpecificDisplay) {
                profileContainer
                    .addSeparatorComponents(
                        new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                    )
                    .addTextDisplayComponents(factionSpecificDisplay);
            }

            profileContainer
                .addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                )
                .addTextDisplayComponents(footerDisplay);

            interaction.reply({ 
                components: [profileContainer], 
                flags: MessageFlags.IsComponentsV2 
            });

        } catch (error) {
            console.error('Profile view error:', error);
            const errorContainer = createErrorContainer('Profile Error', 
                'An error occurred while retrieving your profile. Please try again.');
            interaction.reply({ 
                components: [errorContainer], 
                flags: MessageFlags.IsComponentsV2 
            });
        }
    }
};
