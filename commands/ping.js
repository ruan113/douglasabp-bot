exports.command = {
  title: "ping",
  description: "Just a command to test if Douglas is listening.",
  run: (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    let ping = Date.now() - message.createdTimestamp;
    message.channel.send(`
    Ping: ~${ping}ms\nUptime: ${days}d ${hours}h ${minutes}m ${seconds}s
    `);
  },
};
