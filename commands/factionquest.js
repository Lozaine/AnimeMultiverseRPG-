const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const { getCharacter, updateCharacterProgress, addItemToInventory, updateCharacterStats } = require('../database/database');
const { FACTION_QUESTS, QUEST_TYPES, FACTION_EVENTS, generateRandomQuest, calculateRewards } = require('../utils/factionQuests');
const { FACTIONS } = require('../utils/factions');
const { createEmbed } = require('../utils/embeds');
const { checkLevelUp } = require('../utils/levelProgression');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('factionquest')
        .setDescription('Continue your faction\'s unique story arc.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('story')
                .setDescription('Continue your main faction storyline'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('daily')
                .setDescription('Get a daily quest for extra rewards'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('random')
                .setDescription('Generate a random side mission'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Check your quest progress and statistics')),

    async execute(interaction) {
        const userId = interaction.user.id;
        const subcommand = interaction.options.getSubcommand();

        try {
            const character = await getCharacter(userId);
            if (!character) {
                return interaction.reply({ 
                    embeds: [createEmbed('No Character Found', 'You must create a character with `/create` first!', '#ff6b6b')], 
                    ephemeral: true 
                });
            }

            switch (subcommand) {
                case 'story':
                    await handleStoryQuest(interaction, character);
                    break;
                case 'daily':
                    await handleDailyQuest(interaction, character);
                    break;
                case 'random':
                    await handleRandomQuest(interaction, character);
                    break;
                case 'status':
                    await handleQuestStatus(interaction, character);
                    break;
                default:
                    await handleStoryQuest(interaction, character);
            }

        } catch (error) {
            console.error('Faction quest error:', error);
            await interaction.reply({ 
                embeds: [createEmbed('Error', 'An error occurred while processing your quest request.', '#ff6b6b')], 
                ephemeral: true 
            });
        }
    }
};

async function handleStoryQuest(interaction, character) {
    const factionQuests = FACTION_QUESTS[character.faction];
    if (!factionQuests) {
        return interaction.reply({ 
            embeds: [createEmbed('Error', 'No faction quests found for your faction.', '#ff6b6b')], 
            ephemeral: true 
        });
    }

    const questProgress = character.faction_quest_progress || 0;

    if (questProgress >= factionQuests.length) {
        const completedEmbed = new EmbedBuilder()
            .setColor(FACTIONS[character.faction].color)
            .setTitle('📜 Saga Complete!')
            .setDescription(`**${character.name}**, you have completed your faction's current story arc!\n\n` +
                          `🏆 **Total Story Quests Completed:** ${factionQuests.length}\n` +
                          `⭐ **Faction Mastery:** Achieved\n\n` +
                          `*More adventures await in future updates. Check back for new story chapters!*`)
            .setFooter({ text: 'Cross Realm Chronicles • Faction Quests Complete' });
        return interaction.reply({ embeds: [completedEmbed] });
    }

    const currentQuest = factionQuests[questProgress];
    const questType = QUEST_TYPES[currentQuest.questType] || QUEST_TYPES.story;

    const embed = new EmbedBuilder()
        .setColor(FACTIONS[character.faction].color)
        .setTitle(`${questType.emoji} ${currentQuest.title}`)
        .setDescription(`**${character.name}**, your next chapter awaits...\n\n${currentQuest.description}`)
        .addFields(
            { name: '⭐ XP Reward', value: `${currentQuest.rewards.xp}`, inline: true },
            { name: '💰 Coin Reward', value: `${currentQuest.rewards.coins}`, inline: true },
            { name: '🎲 Item Chance', value: `${currentQuest.itemChance}%`, inline: true },
            { name: '📊 Quest Type', value: questType.description, inline: true },
            { name: '💪 Difficulty', value: '⭐'.repeat(currentQuest.difficulty), inline: true },
            { name: '📈 Progress', value: `Chapter ${questProgress + 1} of ${factionQuests.length}`, inline: true }
        )
        .setThumbnail(FACTIONS[character.faction].image || null)
        .setFooter({ text: `${FACTIONS[character.faction].name} • Story Quest` });

    // Add possible rewards preview if items are available
    if (currentQuest.possibleItems && currentQuest.possibleItems.length > 0) {
        const itemPreview = currentQuest.possibleItems
            .map(item => `• **${item.name}** - ${item.description}`)
            .join('\n');
        embed.addFields({ name: '🎁 Possible Rewards', value: itemPreview, inline: false });
    }

    const acceptButton = new ButtonBuilder()
        .setCustomId(`factionquest_accept_${userId}_${questProgress}`)
        .setLabel('🚀 Begin Quest')
        .setStyle(ButtonStyle.Success);

    const cancelButton = new ButtonBuilder()
        .setCustomId(`factionquest_cancel_${userId}`)
        .setLabel('❌ Not Now')
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(acceptButton, cancelButton);

    await interaction.reply({ embeds: [embed], components: [row] });
}

async function handleDailyQuest(interaction, character) {
    // Check if player has already done daily quest (implement cooldown logic)
    const lastDaily = character.last_daily_quest || 0;
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;

    if (now - lastDaily < dayInMs) {
        const timeLeft = dayInMs - (now - lastDaily);
        const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
        const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

        return interaction.reply({
            embeds: [createEmbed('Daily Quest Completed', 
                `You've already completed today's quest! Come back in ${hoursLeft}h ${minutesLeft}m.`, 
                '#ffd700')],
            ephemeral: true
        });
    }

    // Generate daily quest based on character level and faction
    const difficulty = Math.min(Math.floor(character.level / 5) + 1, 5);
    const dailyQuest = generateDailyQuest(character.faction, difficulty);

    const embed = new EmbedBuilder()
        .setColor(FACTIONS[character.faction].color)
        .setTitle(`📅 Daily Quest: ${dailyQuest.title}`)
        .setDescription(dailyQuest.description)
        .addFields(
            { name: '⭐ XP Reward', value: `${dailyQuest.rewards.xp}`, inline: true },
            { name: '💰 Coin Reward', value: `${dailyQuest.rewards.coins}`, inline: true },
            { name: '🎲 Bonus Chance', value: `${dailyQuest.itemChance}%`, inline: true }
        )
        .setFooter({ text: 'Daily quests reset every 24 hours' });

    const acceptButton = new ButtonBuilder()
        .setCustomId(`dailyquest_accept_${userId}`)
        .setLabel('Accept Daily Quest')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(acceptButton);

    await interaction.reply({ embeds: [embed], components: [row] });
}

async function handleRandomQuest(interaction, character) {
    const difficulty = Math.random() < 0.3 ? character.level + 1 : Math.max(1, character.level - 1);
    const randomQuest = generateRandomQuest(character.faction, Math.min(difficulty, 8));

    // Add faction-specific flavor
    const factionFlavor = getFactionFlavor(character.faction);
    randomQuest.description = `${factionFlavor} ${randomQuest.description}`;

    const embed = new EmbedBuilder()
        .setColor(FACTIONS[character.faction].color)
        .setTitle(`🎲 ${randomQuest.title}`)
        .setDescription(randomQuest.description)
        .addFields(
            { name: '⭐ XP Reward', value: `${randomQuest.rewards.xp}`, inline: true },
            { name: '💰 Coin Reward', value: `${randomQuest.rewards.coins}`, inline: true },
            { name: '🎁 Item Chance', value: `${randomQuest.itemChance}%`, inline: true },
            { name: '💪 Difficulty', value: '⭐'.repeat(randomQuest.difficulty), inline: true }
        )
        .setFooter({ text: 'Random quests provide variety and extra rewards' });

    const acceptButton = new ButtonBuilder()
        .setCustomId(`randomquest_accept_${userId}_${Date.now()}`)
        .setLabel('Accept Mission')
        .setStyle(ButtonStyle.Success);

    const rerollButton = new ButtonBuilder()
        .setCustomId(`randomquest_reroll_${userId}`)
        .setLabel('🎲 Reroll Quest')
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(acceptButton, rerollButton);

    await interaction.reply({ embeds: [embed], components: [row] });
}

async function handleQuestStatus(interaction, character) {
    const factionQuests = FACTION_QUESTS[character.faction];
    const questProgress = character.faction_quest_progress || 0;
    const completionPercentage = Math.floor((questProgress / factionQuests.length) * 100);

    const embed = new EmbedBuilder()
        .setColor(FACTIONS[character.faction].color)
        .setTitle(`📊 Quest Status - ${character.name}`)
        .setDescription(`**Faction:** ${FACTIONS[character.faction].name}\n` +
                       `**Current Level:** ${character.level}`)
        .addFields(
            { name: '📖 Story Progress', value: `Chapter ${questProgress}/${factionQuests.length} (${completionPercentage}%)`, inline: true },
            { name: '🏆 Quests Completed', value: `${questProgress}`, inline: true },
            { name: '⭐ Total XP Earned', value: `${character.xp || 0}`, inline: true },
            { name: '💰 Coins Earned', value: `${character.coins || 0}`, inline: true },
            { name: '🎒 Items Collected', value: `${character.inventory ? Object.keys(character.inventory).length : 0}`, inline: true },
            { name: '📅 Daily Quest Status', value: isDailyAvailable(character) ? '✅ Available' : '❌ Completed', inline: true }
        )
        .setThumbnail(FACTIONS[character.faction].image || null)
        .setFooter({ text: 'Keep questing to unlock new adventures!' });

    // Add progress bar
    const progressBar = createProgressBar(questProgress, factionQuests.length);
    embed.addFields({ name: '📈 Story Progress Bar', value: progressBar, inline: false });

    // Show next quest preview if available
    if (questProgress < factionQuests.length) {
        const nextQuest = factionQuests[questProgress];
        embed.addFields({ 
            name: '🔮 Next Quest Preview', 
            value: `**${nextQuest.title}**\n*${nextQuest.description.substring(0, 100)}...*`, 
            inline: false 
        });
    }

    await interaction.reply({ embeds: [embed] });
}

function generateDailyQuest(faction, difficulty) {
    const dailyTypes = ['training', 'exploration', 'combat', 'social'];
    const type = dailyTypes[Math.floor(Math.random() * dailyTypes.length)];

    const rewards = calculateRewards(difficulty, 'daily');

    const questTemplates = {
        training: {
            title: "Daily Training Session",
            description: "Complete your daily training to stay sharp and improve your abilities."
        },
        exploration: {
            title: "Scouting Mission",
            description: "Explore the surrounding area and report back with any interesting discoveries."
        },
        combat: {
            title: "Combat Practice",
            description: "Engage in combat training to hone your fighting skills."
        },
        social: {
            title: "Community Service",
            description: "Help your community and build relationships with fellow faction members."
        }
    };

    return {
        title: questTemplates[type].title,
        description: questTemplates[type].description,
        rewards,
        itemChance: 15 + (difficulty * 5),
        questType: 'daily',
        difficulty
    };
}

function getFactionFlavor(faction) {
    const flavors = {
        one_piece: "While sailing the Grand Line,",
        naruto: "During a covert mission,",
        jujutsu_kaisen: "While investigating cursed energy,",
        demon_slayer: "On your demon hunting patrol,"
    };
    return flavors[faction] || "On your adventure,";
}

function isDailyAvailable(character) {
    const lastDaily = character.last_daily_quest || 0;
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    return (now - lastDaily) >= dayInMs;
}

function createProgressBar(current, total, length = 20) {
    const percentage = current / total;
    const filled = Math.floor(percentage * length);
    const empty = length - filled;

    return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${current}/${total}`;
}