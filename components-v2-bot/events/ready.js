module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`🟢 Ready! Logged in as ${client.user.tag}`);
        console.log(`🎯 Bot ID: ${client.user.id}`);
        console.log(`📅 Ready at: ${new Date().toISOString()}`);
    }
};