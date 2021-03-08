exports.command = {
  title: "move",
  description:
    "Move a user to a specific channel. ex: +move @user_tag channel_name",
  run: (client, message, args) => {
    const member = message.guild.members.cache.get(
      getIdInsideDiscordMention(args[0])
    );
    const channel = findChannelByName(args, message.guild.channels.cache);
    const error = handleArgs(args, {
      member,
      channel,
    });

    if (error) {
      message.reply(error);
      return;
    }

    member.voice.setChannel(channel);
    message.channel.send(
      `${message.author.username} just moved ${member.user.username} to ${channel.name}`
    );
    utils.log(
      `${message.author.username} just moved ${member.user.username} to ${channel.name}`
    );
  },
};

function handleArgs(args, { member, channel } = {}) {
  if (args.length === 0)
    return "you need to provide the user target @tag and the name of the target voice channel!";

  if (!member) return "member not found!";

  if (!member.voice.channel)
    return "the target user must be connected to a voice channel!";

  if (!channel) return "Canal não encontrado!";

  return undefined;
}

function getIdInsideDiscordMention(mention) {
  return mention.replace("<@!", "").replace(">", "");
}

function isConnectedInAVoiceChannel(id, guild) {
  for (let presence of guild.presences.cache) {
    console.log(presence);
  }
}

function findChannelByName(args, channelsList) {
  const channels = channelsList.filter((it) => it.type === "voice");
  args.splice(0, 1);
  const name = args.join(" ");

  // Tenta por igualdade
  for (channelObj of channels) {
    const channel = channelObj[1];
    if (channel.name.toLowerCase() === name.toLowerCase()) {
      return channel;
    }
  }

  // Tenta por semelhança
  for (channel of channels) {
    const channel = channelObj[1];
    if (channel.name.toLowerCase().includes(name.toLowerCase())) {
      return channel;
    }
  }
}
