const { 
    EmbedBuilder, 
    TextDisplayBuilder, 
    ContainerBuilder, 
    SectionBuilder, 
    SeparatorBuilder, 
    SeparatorSpacingSize,
    MessageFlags,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

// ===== LEGACY EMBED FUNCTIONS (for backwards compatibility) =====

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

// ===== COMPONENTS V2 CONTAINER BUILDERS =====

// Create a standard Components V2 container
function createComponentsV2Container(title, description, color = 0x4f46e5, options = {}) {
    const { 
        includeTimestamp = true, 
        headerStyle = 'h1', 
        addSeparator = false,
        footerText = null 
    } = options;

    let titleContent = '';
    switch (headerStyle) {
        case 'h1':
            titleContent = `# ${title}`;
            break;
        case 'h2':
            titleContent = `## ${title}`;
            break;
        case 'h3':
            titleContent = `### ${title}`;
            break;
        default:
            titleContent = `# ${title}`;
    }

    if (description) {
        titleContent += `\n${description}`;
    }

    if (includeTimestamp) {
        titleContent += `\n\n*${new Date().toLocaleString()}*`;
    }

    const titleDisplay = new TextDisplayBuilder().setContent(titleContent);

    const container = new ContainerBuilder()
        .setAccentColor(color)
        .addTextDisplayComponents(titleDisplay);

    if (addSeparator) {
        container.addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Medium)
        );
    }

    if (footerText) {
        container.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`*${footerText}*`)
        );
    }

    return container;
}

// Create an error container (Components V2)
function createErrorContainer(title, description, options = {}) {
    const errorOptions = {
        ...options,
        headerStyle: 'h2'
    };

    const container = createComponentsV2Container(
        `❌ ${title}`, 
        description, 
        0xff6b6b, 
        errorOptions
    );

    // Add helpful actions section for errors
    if (options.includeActions) {
        container.addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        );

        const actionsDisplay = new TextDisplayBuilder()
            .setContent(
                `**🔧 Suggested Actions:**\n` +
                `• Try refreshing the command\n` +
                `• Check if you meet all requirements\n` +
                `• Contact support if the issue persists`
            );

        container.addTextDisplayComponents(actionsDisplay);
    }

    return container;
}

// Create a success container (Components V2)
function createSuccessContainer(title, description, options = {}) {
    const successOptions = {
        ...options,
        headerStyle: 'h2'
    };

    return createComponentsV2Container(
        `✅ ${title}`, 
        description, 
        0x10b981, 
        successOptions
    );
}

// Create an info container (Components V2)
function createInfoContainer(title, description, options = {}) {
    const infoOptions = {
        ...options,
        headerStyle: 'h2'
    };

    return createComponentsV2Container(
        `ℹ️ ${title}`, 
        description, 
        0x3b82f6, 
        infoOptions
    );
}

// Create a warning container (Components V2)
function createWarningContainer(title, description, options = {}) {
    const warningOptions = {
        ...options,
        headerStyle: 'h2'
    };

    return createComponentsV2Container(
        `⚠️ ${title}`, 
        description, 
        0xf59e0b, 
        warningOptions
    );
}

// Create a loading container (Components V2)
function createLoadingContainer(title = 'Loading', description = 'Please wait while we process your request...') {
    const titleDisplay = new TextDisplayBuilder()
        .setContent(`# 🔄 ${title}\n${description}\n\n*This may take a few moments...*`);

    return new ContainerBuilder()
        .setAccentColor(0x6366f1)
        .addTextDisplayComponents(titleDisplay);
}

// ===== ENHANCED CHARACTER CONTAINERS =====

// Create a character container with faction styling (Components V2)
function createCharacterContainer(character, faction, options = {}) {
    const { 
        showDetailedStats = false, 
        includeProgressBar = true,
        showInventoryCount = false 
    } = options;

    const titleDisplay = new TextDisplayBuilder()
        .setContent(
            `# ${faction.emoji} ${character.character_name || character.name}\n` +
            `**${faction.name}** Warrior • Level ${character.level} ⭐`
        );

    const container = new ContainerBuilder()
        .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
        .addTextDisplayComponents(titleDisplay)
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Medium)
        );

    // Basic stats section
    const basicStatsSection = new SectionBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`## 📊 Character Overview`),
            new TextDisplayBuilder().setContent(
                `**⭐ Level:** ${character.level}\n` +
                `**🎯 Experience:** ${character.experience || 0}\n` +
                `**💰 Gold:** ${character.gold?.toLocaleString() || 0}`
            )
        );

    container.addSectionComponents(basicStatsSection);

    // Add detailed combat stats if requested
    if (showDetailedStats) {
        container.addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        );

        const combatStatsSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## ⚔️ Combat Statistics`),
                new TextDisplayBuilder().setContent(
                    `**❤️ Health:** ${character.hp || 100}/${character.max_hp || 100}\n` +
                    `**⚔️ Attack:** ${character.atk || 20}\n` +
                    `**🛡️ Defense:** ${character.def || 10}\n` +
                    `**💨 Speed:** ${character.spd || 15}`
                )
            );

        container.addSectionComponents(combatStatsSection);
    }

    return container;
}

// Create an enhanced quest container (Components V2)
function createQuestContainer(quest, faction, options = {}) {
    const { 
        showRequirements = true, 
        showRewards = true,
        includeDescription = true,
        questStatus = null 
    } = options;

    const questTitle = quest.title || quest.name;
    const statusEmoji = questStatus ? (questStatus === 'completed' ? '✅' : questStatus === 'active' ? '🔄' : '📝') : '📝';

    const titleDisplay = new TextDisplayBuilder()
        .setContent(`# ${statusEmoji} ${questTitle}\n${faction.emoji} **${faction.name}** Quest`);

    const container = new ContainerBuilder()
        .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
        .addTextDisplayComponents(titleDisplay);

    if (includeDescription && quest.description) {
        container.addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        );

        const descriptionSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 📖 Quest Description`),
                new TextDisplayBuilder().setContent(quest.description)
            );

        container.addSectionComponents(descriptionSection);
    }

    if (showRequirements) {
        container.addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        );

        const requirementsSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 📋 Requirements`),
                new TextDisplayBuilder().setContent(
                    `**⭐ Minimum Level:** ${quest.levelRequirement || quest.levelReq || 1}\n` +
                    `**🎯 Difficulty:** ${quest.difficulty || 'Normal'}\n` +
                    `**⏱️ Duration:** ${quest.duration || 'Varies'}`
                )
            );

        container.addSectionComponents(requirementsSection);
    }

    if (showRewards && quest.reward) {
        container.addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        );

        const rewardsSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 🎁 Rewards`),
                new TextDisplayBuilder().setContent(
                    `**🎯 Experience:** ${quest.reward.experience || quest.xpReward || 0} XP\n` +
                    `**💰 Gold:** ${quest.reward.gold || quest.coinReward || 0} coins\n` +
                    `**🎒 Items:** ${quest.reward.items ? quest.reward.items.join(', ') : 'None'}`
                )
            );

        container.addSectionComponents(rewardsSection);
    }

    return container;
}

// ===== SPECIALIZED CONTAINERS =====

// Create a battle result container
function createBattleContainer(battleResult, character, faction) {
    const isVictory = battleResult.victory;
    const titleEmoji = isVictory ? '🏆' : '💀';
    const titleText = isVictory ? 'Victory!' : 'Defeat';
    const accentColor = isVictory ? 0x10b981 : 0xef4444;

    const titleDisplay = new TextDisplayBuilder()
        .setContent(
            `# ${titleEmoji} ${titleText}\n` +
            `**${character.character_name || character.name}** vs **${battleResult.opponent}**`
        );

    const container = new ContainerBuilder()
        .setAccentColor(accentColor)
        .addTextDisplayComponents(titleDisplay)
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Medium)
        );

    // Battle summary
    const summarySection = new SectionBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`## ⚔️ Battle Summary`),
            new TextDisplayBuilder().setContent(
                `**🎯 Result:** ${isVictory ? 'Victory' : 'Defeat'}\n` +
                `**💪 Damage Dealt:** ${battleResult.damageDealt || 0}\n` +
                `**🛡️ Damage Taken:** ${battleResult.damageTaken || 0}\n` +
                `**⏱️ Battle Duration:** ${battleResult.duration || 'Quick'} turns`
            )
        );

    container.addSectionComponents(summarySection);

    // Rewards (if victory)
    if (isVictory && battleResult.rewards) {
        container.addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        );

        const rewardsSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 🎁 Rewards Earned`),
                new TextDisplayBuilder().setContent(
                    `**🎯 Experience:** +${battleResult.rewards.experience || 0} XP\n` +
                    `**💰 Gold:** +${battleResult.rewards.gold || 0} coins\n` +
                    `**🎒 Items:** ${battleResult.rewards.items ? battleResult.rewards.items.join(', ') : 'None'}`
                )
            );

        container.addSectionComponents(rewardsSection);
    }

    return container;
}

// Create an inventory summary container
function createInventoryContainer(inventory, character, faction, options = {}) {
    const { 
        showCategories = true, 
        itemLimit = 10,
        showStats = true 
    } = options;

    const titleDisplay = new TextDisplayBuilder()
        .setContent(
            `# 🎒 ${character.character_name || character.name}'s Inventory\n` +
            `**${faction.name}** Storage`
        );

    const container = new ContainerBuilder()
        .setAccentColor(parseInt(faction.color.replace('#', ''), 16))
        .addTextDisplayComponents(titleDisplay);

    if (inventory.length === 0) {
        container.addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Medium)
        );

        const emptySection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 📦 Empty Inventory`),
                new TextDisplayBuilder().setContent(
                    `Your inventory is empty!\n\n` +
                    `**💡 Tips to get items:**\n` +
                    `• Complete quests\n` +
                    `• Win battles\n` +
                    `• Explore locations`
                )
            );

        container.addSectionComponents(emptySection);
        return container;
    }

    // Group items by category
    const itemsByCategory = {};
    inventory.forEach(item => {
        const category = item.item_type || 'misc';
        if (!itemsByCategory[category]) {
            itemsByCategory[category] = [];
        }
        itemsByCategory[category].push(item);
    });

    if (showCategories) {
        container.addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Medium)
        );

        Object.entries(itemsByCategory).forEach(([category, items], index) => {
            const categoryEmojis = {
                'weapon': '⚔️', 'armor': '🛡️', 'consumable': '🧪',
                'material': '🔨', 'misc': '📦', 'food': '🍽️',
                'potion': '🧪', 'currency': '💰'
            };

            const categorySection = new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## ${categoryEmojis[category] || '📦'} ${category.charAt(0).toUpperCase() + category.slice(1)}`),
                    new TextDisplayBuilder().setContent(
                        items.slice(0, itemLimit).map(item => 
                            `• **${item.item_name}** ×${item.quantity}`
                        ).join('\n') + (items.length > itemLimit ? `\n*...and ${items.length - itemLimit} more*` : '')
                    )
                );

            container.addSectionComponents(categorySection);

            if (index < Object.entries(itemsByCategory).length - 1) {
                container.addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                );
            }
        });
    }

    if (showStats) {
        container.addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Small)
        );

        const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
        const uniqueItems = inventory.length;

        const statsSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 📊 Inventory Statistics`),
                new TextDisplayBuilder().setContent(
                    `**📦 Total Items:** ${totalItems}\n` +
                    `**🗂️ Unique Items:** ${uniqueItems}\n` +
                    `**📋 Categories:** ${Object.keys(itemsByCategory).length}`
                )
            );

        container.addSectionComponents(statsSection);
    }

    return container;
}

// ===== UTILITY FUNCTIONS =====

// Create standard action buttons for character operations
function createCharacterActionButtons(userId, character) {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`view_profile_${userId}`)
                .setLabel('👤 Profile')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`view_inventory_${userId}`)
                .setLabel('🎒 Inventory')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`start_quest_${userId}`)
                .setLabel('🗺️ Quest')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(`character_stats_${userId}`)
                .setLabel('📊 Stats')
                .setStyle(ButtonStyle.Secondary)
        );
}

// Create navigation buttons for paginated content
function createNavigationButtons(userId, currentPage, totalPages, baseCustomId) {
    const row = new ActionRowBuilder();

    if (totalPages > 1) {
        row.addComponents(
            new ButtonBuilder()
                .setCustomId(`${baseCustomId}_${userId}_${Math.max(1, currentPage - 1)}`)
                .setLabel('◀️ Previous')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(currentPage === 1),
            new ButtonBuilder()
                .setCustomId(`${baseCustomId}_${userId}_${Math.min(totalPages, currentPage + 1)}`)
                .setLabel('Next ▶️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(currentPage === totalPages)
        );
    }

    row.addComponents(
        new ButtonBuilder()
            .setCustomId(`refresh_${baseCustomId}_${userId}`)
            .setLabel('🔄 Refresh')
            .setStyle(ButtonStyle.Primary)
    );

    return row;
}

// Create a confirmation container for important actions
function createConfirmationContainer(title, description, action, options = {}) {
    const { 
        warningLevel = 'medium',
        includeConsequences = false,
        consequences = [] 
    } = options;

    const warningEmojis = {
        'low': '⚠️',
        'medium': '🚨',
        'high': '💀'
    };

    const warningColors = {
        'low': 0xf59e0b,
        'medium': 0xef4444,
        'high': 0x991b1b
    };

    const titleDisplay = new TextDisplayBuilder()
        .setContent(`# ${warningEmojis[warningLevel]} ${title}\n${description}`);

    const container = new ContainerBuilder()
        .setAccentColor(warningColors[warningLevel])
        .addTextDisplayComponents(titleDisplay);

    if (includeConsequences && consequences.length > 0) {
        container.addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
        );

        const consequencesSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## ⚠️ Consequences`),
                new TextDisplayBuilder().setContent(
                    consequences.map(consequence => `• ${consequence}`).join('\n')
                )
            );

        container.addSectionComponents(consequencesSection);
    }

    return container;
}

// ===== LEGACY COMPATIBILITY =====

// Create a character embed with faction styling (legacy)
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

// Create a quest embed (legacy)
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
    // Legacy embed functions (backwards compatibility)
    createEmbed,
    createErrorEmbed,
    createSuccessEmbed,
    createInfoEmbed,
    createWarningEmbed,
    createCharacterEmbed,
    createQuestEmbed,

    // Components V2 container functions
    createComponentsV2Container,
    createErrorContainer,
    createSuccessContainer,
    createInfoContainer,
    createWarningContainer,
    createLoadingContainer,

    // Enhanced Components V2 functions
    createCharacterContainer,
    createQuestContainer,
    createBattleContainer,
    createInventoryContainer,
    createConfirmationContainer,

    // Utility functions
    createCharacterActionButtons,
    createNavigationButtons,

    // Constants
    MessageFlags
};