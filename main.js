const Discord = require("discord.js");
const client = new Discord.Client();
const utils = require("./utils");
const moment = require("moment");

// eventos
const onMessage = require("./events/onMessage");
const onVoiceStateUpdate = require("./events/onVoiceStateUpdate");

client.on("ready", () => {
  utils.log(`Bot ready, logged in as ${client.user.tag}!`);

  client.user.setActivity(getGame());
  setInterval(() => {
    client.user.setActivity(getGame());
  }, moment.duration(12, "hours").asMilliseconds());

  const psgGuild = client.guilds.cache.find(
    (guild) => guild.id === utils.env.psgId
  );
  const isDouglasOnline = psgGuild.members.cache.find(
    (it) => it.user.id === utils.env.douglasUserId
  );
  if (!isDouglasOnline) {
    try {
      delete require.cache[require.resolve(`./commands/join.js`)];
      require(`./commands/join.js`).command.run(client, undefined, {
        channelID: "253894435635593217",
      });
    } catch (e) {
      utils.log(e);
    }
  }

  // Initialize events
  onMessage(client);
  onVoiceStateUpdate(client);
});

function getGame() {
  let game;
  switch (Math.floor(Math.random() * Math.floor(8))) {
    case 0:
      game = "The Witcher 3: Wild Hunt";
      break;
    case 1:
      game = "Minion Masters";
      break;
    case 2:
      game = "Cyberpunk 2077";
      break;
    case 3:
      game = "War Thunder";
      break;
    case 4:
      game = "Metro Exodus";
      break;
    case 5:
      game = "Fallout 4";
      break;
    case 6:
      game = "Assassin's Creed IV Black Flag";
      break;
    case 7:
      game = "The Elder Scrolls V: Skyrim Special Edition";
      break;
  }
  return game;
}

client.login(utils.env.token || process.env.TOKEN);
