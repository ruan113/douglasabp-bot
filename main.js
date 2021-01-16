const Discord = require("discord.js");

const client = new Discord.Client();

const { command } = require("./commands/join");
const utils = require("./utils");

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
});

client.on("message", (message) => {
  let args = message.content.slice(utils.env.PREFIX.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();

  if (message.author.bot || !message.content.startsWith(utils.env.PREFIX))
    return;

  const refuseVal = Math.floor(Math.random() * Math.floor(100));
  if (refuseVal < 5) {
    message.channel.send(
      refuseVal % 2 === 0
        ? "https://thumbs.gfycat.com/CarelessThankfulFluke-size_restricted.gif"
        : "https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif"
    );
    return;
  }

  try {
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];

    let module = require(`./commands/${cmd}.js`);
    module.command.run(client, message, args);
  } catch (e) {
    message.channel.send(
      "Invalid Command - if you need help, try +list to see the command list."
    );
    utils.log(e);
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  let newUserChannel = newMember.channelID;
  let oldUserChannel = oldMember.channelID;
  const user = {
    id: newMember.id,
    name: newMember.guild.members.cache.find((it) => {
      return it.id === newMember.id;
    }).user.username,
    status: getStatus(oldUserChannel, newUserChannel),
  };
  utils.log("user " + user.name + "(" + user.id + ") " + user.status);

  // Meu Id
  // if (newMember.id === utils.env.ruanUserId) {
  // Id do douglas
  if (newMember.id === utils.env.douglasUserId) {
    switch (user.status) {
      case utils.userStatus.connected:
        newMember.channel.leave();
        break;
      case utils.userStatus.disconnected:
        connectBotToChannel("253894435635593217");
        break;
    }
  }
});

function getStatus(lastChannelID, actualChannelID) {
  return actualChannelID === null
    ? utils.userStatus.disconnected
    : lastChannelID === null
    ? utils.userStatus.connected
    : utils.userStatus.unknown;
}

function connectBotToChannel(channelID) {
  try {
    delete require.cache[require.resolve(`./commands/join.js`)];
    require(`./commands/join.js`).command.run(client, undefined, { channelID });
  } catch (e) {
    utils.log(e);
  }
}

// function sendMessage(message, channelID) {
//   const channel = client.channels.cache.find(
//     (channel) => channel.id === channelID
//   );
//   utils.log(channel);
//   if (!channel) return error("The channel does not exist!");
//   channel.send(message);
// }

client.login(utils.env.token || process.env.TOKEN);
