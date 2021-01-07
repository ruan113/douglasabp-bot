const Discord = require("discord.js");
const client = new Discord.Client();
const utils = require("./utils");

const userStatus = {
  connected: "has connected",
  disconnected: "has disconnected",
  unknown: "has a unknown state",
};

client.once("ready", () => {
  console.log(`Bot ready, logged in as ${client.user.tag}!`);
});

client.on("ready", () => {
  client.user.setActivity("Cyberpunk 2077");
});

client.on("message", (message) => {
  let args = message.content.slice(utils.env.PREFIX.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();

  if (message.author.bot) return;
  if (!message.content.startsWith(utils.env.PREFIX)) return;

  try {
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];

    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
    console.log(e);
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  let newUserChannel = newMember.channelID;
  let oldUserChannel = oldMember.channelID;
  const user = {
    id: newMember.id,
    status: getStatus(oldUserChannel, newUserChannel),
  };
  console.log("user " + user.id + " " + user.status);

  // Meu Id
  // if (newMember.id === "251524294591381506") {
  // Id do douglas
  if (newMember.id === "794627937550336030") {
    switch (user.status) {
      case userStatus.connected:
        newMember.channel.leave();
        break;
      case userStatus.disconnected:
        connectBotToChannel("253894435635593217");
        break;
    }
  }
});

function getStatus(lastChannelID, actualChannelID) {
  return actualChannelID === null
    ? userStatus.disconnected
    : lastChannelID === null
    ? userStatus.connected
    : userStatus.unknown;
}

function connectBotToChannel(channelID) {
  try {
    delete require.cache[require.resolve(`./commands/join.js`)];
    require(`./commands/join.js`).run(client, undefined, { channelID });
  } catch (e) {
    console.log(e);
  }
}

// function sendMessage(message, channelID) {
//   const channel = client.channels.cache.find(
//     (channel) => channel.id === channelID
//   );
//   console.log(channel);
//   if (!channel) return console.error("The channel does not exist!");
//   channel.send(message);
// }

client.login(utils.env.token || process.env.TOKEN);
