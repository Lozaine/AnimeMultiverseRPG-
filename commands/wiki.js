const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { 
    createWikiEmbed, 
    createWikiNavigation, 
    createCategoryOverviewEmbed, 
    createCategoryNavigation,
    createMainWikiEmbed, 
    createMainMenuNavigation,
    getCategoryKeys 
} = require('../utils/wiki');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Access the Cross Realm Chronicles game encyclopedia')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Choose a wiki category to view')
                .setRequired(false)
                .addChoices(
                    { name: '🚀 Getting Started', value: 'getting_started' },
                    { name: '⚡ Faction Guide', value: 'factions' },
                    { name: '⚔️ Combat Guide', value: 'combat' },
                    { name: '📈 Character Progression', value: 'progression' },
                    { name: '🎯 Quest System', value: 'quests' },
                    { name: '🎒 Items & Inventory', value: 'items' },
                    { name: '💻 Command Reference', value: 'commands' }
                )),
    async execute(interaction) {
        const category = interaction.options.getString('category');
        
        if (category) {
            // Show specific wiki category overview with navigation
            const categoryEmbed = createCategoryOverviewEmbed(category);
            if (!categoryEmbed) {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setTitle('❌ Category Not Found')
                        .setDescription('Sorry, that wiki category doesn\'t exist.')
                        .setColor('#ff6b6b')],
                    ephemeral: true
                });
            }
            const navigation = createCategoryNavigation(category);
            return interaction.reply({ 
                embeds: [categoryEmbed], 
                components: navigation 
            });
        }
        
        // Default wiki home - show all categories with dropdown navigation
        const mainEmbed = createMainWikiEmbed();
        const navigation = createMainMenuNavigation();
        interaction.reply({ 
            embeds: [mainEmbed], 
            components: navigation 
        });
    }
};