const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { getCharacter } = require('../database/database');
const { FACTIONS } = require('../utils/factions');
const { createEmbed } = require('../utils/embeds');
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
                const embed = createEmbed('No Character Found', 
                    'You don\'t have a character yet! Use `/create` to create one.', 
                    '#ff6b6b');
                return interaction.reply({ embeds: [embed] });
            }

            const faction = FACTIONS[character.faction];
            const expForCurrentLevel = getExpRequiredForLevel(character.level + 1);
            const expInCurrentLevel = getExpProgressInLevel(character.experience, character.level);
            const expToNext = expForCurrentLevel - expInCurrentLevel;
            const levelProgress = getLevelProgress(character.level, character.experience);
            const completedQuests = character.completed_quests ? character.completed_quests.split(',').length : 0;

            const embed = new EmbedBuilder()
                .setColor(faction.color)
                .setTitle(`${faction.emoji} ${character.name}'s Profile`)
                .setDescription(`**${faction.name}** Warrior`)
                .addFields([
                    { name: '⭐ Level', value: character.level.toString(), inline: true },
                    { name: '🎯 Experience', value: `${expInCurrentLevel}/${expForCurrentLevel} (${levelProgress}%)`, inline: true },
                    { name: '📈 Next Level', value: `${expToNext} XP needed`, inline: true },
                    { name: '❤️ Health', value: `${character.hp || 100}/${character.max_hp || 100}`, inline: true },
                    { name: '⚔️ Attack', value: `${character.atk || 20}`, inline: true },
                    { name: '💰 Gold', value: character.gold.toString(), inline: true },
                    { name: '🏴‍☠️ Faction', value: `${faction.emoji} ${faction.name}`, inline: true },
                    { name: '🏆 Quests Completed', value: completedQuests.toString(), inline: true },
                    { name: '📊 Total XP', value: character.experience.toString(), inline: true },
                    { name: '🎁 Faction Perk', value: faction.perk, inline: false },
                    { name: '💪 Special Ability', value: faction.startingAbility, inline: false }
                ])
                .setFooter({ text: `Created on ${new Date(character.created_at).toDateString()}` })
                .setTimestamp();

            // Add faction-specific stats
            if (character.faction === 'one_piece' && character.devil_fruit) {
                embed.addFields([{ name: '🍎 Devil Fruit', value: character.devil_fruit, inline: true }]);
            } else if (character.faction === 'naruto' && character.chakra_nature) {
                embed.addFields([{ name: '🌀 Chakra Nature', value: character.chakra_nature, inline: true }]);
            } else if (character.faction === 'jujutsu_kaisen' && character.cursed_technique) {
                embed.addFields([{ name: '👁️ Cursed Technique', value: character.cursed_technique, inline: true }]);
            } else if (character.faction === 'demon_slayer' && character.breathing_style) {
                embed.addFields([{ name: '🌬️ Breathing Style', value: character.breathing_style, inline: true }]);
            }

            interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Profile view error:', error);
            const embed = createEmbed('Profile Error', 
                'An error occurred while retrieving your profile. Please try again.', 
                '#ff6b6b');
            interaction.reply({ embeds: [embed] });
        }
    }
};
