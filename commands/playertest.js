const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { createPlayer, getPlayer, updatePlayer } = require('../database/database');
const { createEmbed } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playertest')
        .setDescription('Test the new player database functions')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a test player')
                .addStringOption(option =>
                    option.setName('faction')
                        .setDescription('Choose faction')
                        .setRequired(true)
                        .addChoices(
                            { name: 'One Piece', value: 'one_piece' },
                            { name: 'Naruto', value: 'naruto' },
                            { name: 'Jujutsu Kaisen', value: 'jujutsu_kaisen' },
                            { name: 'Demon Slayer', value: 'demon_slayer' }
                        )))
        .addSubcommand(subcommand =>
            subcommand
                .setName('view')
                .setDescription('View player stats'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('update')
                .setDescription('Update player stats')
                .addIntegerOption(option =>
                    option.setName('level')
                        .setDescription('New level')
                        .setRequired(false))
                .addIntegerOption(option =>
                    option.setName('xp')
                        .setDescription('New XP')
                        .setRequired(false))
                .addIntegerOption(option =>
                    option.setName('atk')
                        .setDescription('New ATK')
                        .setRequired(false))),
    async execute(interaction) {
        const userId = interaction.user.id;
        const subcommand = interaction.options.getSubcommand();
        
        try {
            if (subcommand === 'create') {
                const faction = interaction.options.getString('faction');
                
                // Check if player already exists
                const existingPlayer = await getPlayer(userId);
                if (existingPlayer) {
                    const embed = createEmbed('Player Already Exists', 
                        'You already have a player in the new system!', 
                        '#ff6b6b');
                    return interaction.reply({ embeds: [embed] });
                }
                
                const player = await createPlayer(userId, faction);
                
                const embed = new EmbedBuilder()
                    .setColor('#00ff00')
                    .setTitle('🎉 Test Player Created!')
                    .addFields([
                        { name: 'User ID', value: player.userId, inline: true },
                        { name: 'Name', value: player.name, inline: true },
                        { name: 'Faction', value: player.faction, inline: true },
                        { name: 'Level', value: player.level.toString(), inline: true },
                        { name: 'XP', value: player.xp.toString(), inline: true },
                        { name: 'HP', value: player.hp.toString(), inline: true },
                        { name: 'ATK', value: player.atk.toString(), inline: true },
                        { name: 'DEF', value: player.def.toString(), inline: true },
                        { name: 'SPD', value: player.spd.toString(), inline: true }
                    ]);
                
                return interaction.reply({ embeds: [embed] });
                
            } else if (subcommand === 'view') {
                const player = await getPlayer(userId);
                
                if (!player) {
                    const embed = createEmbed('No Player Found', 
                        'Use `/playertest create` to create a test player first!', 
                        '#ff6b6b');
                    return interaction.reply({ embeds: [embed] });
                }
                
                const embed = new EmbedBuilder()
                    .setColor('#4f46e5')
                    .setTitle('📊 Player Stats')
                    .addFields([
                        { name: 'Name', value: player.name, inline: true },
                        { name: 'Faction', value: player.faction, inline: true },
                        { name: 'Level', value: player.level.toString(), inline: true },
                        { name: 'XP', value: player.xp.toString(), inline: true },
                        { name: 'HP', value: player.hp.toString(), inline: true },
                        { name: 'ATK', value: player.atk.toString(), inline: true },
                        { name: 'DEF', value: player.def.toString(), inline: true },
                        { name: 'SPD', value: player.spd.toString(), inline: true }
                    ]);
                
                return interaction.reply({ embeds: [embed] });
                
            } else if (subcommand === 'update') {
                const player = await getPlayer(userId);
                
                if (!player) {
                    const embed = createEmbed('No Player Found', 
                        'Use `/playertest create` to create a test player first!', 
                        '#ff6b6b');
                    return interaction.reply({ embeds: [embed] });
                }
                
                const updateData = {};
                const level = interaction.options.getInteger('level');
                const xp = interaction.options.getInteger('xp');
                const atk = interaction.options.getInteger('atk');
                
                if (level !== null) updateData.level = level;
                if (xp !== null) updateData.xp = xp;
                if (atk !== null) updateData.atk = atk;
                
                if (Object.keys(updateData).length === 0) {
                    const embed = createEmbed('No Updates', 
                        'Please specify at least one field to update!', 
                        '#ff6b6b');
                    return interaction.reply({ embeds: [embed] });
                }
                
                const updatedPlayer = await updatePlayer(userId, updateData);
                
                const embed = new EmbedBuilder()
                    .setColor('#00ff00')
                    .setTitle('✅ Player Updated!')
                    .addFields([
                        { name: 'Name', value: updatedPlayer.name, inline: true },
                        { name: 'Faction', value: updatedPlayer.faction, inline: true },
                        { name: 'Level', value: updatedPlayer.level.toString(), inline: true },
                        { name: 'XP', value: updatedPlayer.xp.toString(), inline: true },
                        { name: 'HP', value: updatedPlayer.hp.toString(), inline: true },
                        { name: 'ATK', value: updatedPlayer.atk.toString(), inline: true },
                        { name: 'DEF', value: updatedPlayer.def.toString(), inline: true },
                        { name: 'SPD', value: updatedPlayer.spd.toString(), inline: true }
                    ]);
                
                return interaction.reply({ embeds: [embed] });
            }
            
        } catch (error) {
            console.error('Player test error:', error);
            const embed = createEmbed('Error', 
                'An error occurred while testing player functions.', 
                '#ff6b6b');
            interaction.reply({ embeds: [embed] });
        }
    }
};