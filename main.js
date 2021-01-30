const Discord = require("discord.js");
const client = new Discord.Client();
const utils = require("./utils");

// eventos
const onMessage = require("./events/onMessage");
const onVoiceStateUpdate = require("./events/onVoiceStateUpdate");

client.once("ready", () => {
  utils.log(`Bot ready, logged in as ${client.user.tag}!`);
});

client.on("ready", () => {
  client.user.setActivity("Cyberpunk 2077");
  const psgGuild = client.guilds.cache.find(
    (guild) => guild.id === utils.env.psgId
  );
  const isDouglasOnline = psgGuild.members.cache.find(
    (it) => it.user.id === utils.env.douglasUserId
  );
  if (!isDouglasOnline) {
    connectBotToChannel("253894435635593217");
  }

  // Initialize events
  onMessage(client);
  onVoiceStateUpdate(client);
});

client.login(utils.env.token || process.env.TOKEN);
