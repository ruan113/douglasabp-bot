exports.run = (client, message, args) => {
  if (message.member.voice.channel) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.channel.send("You must be in a channel first!");
      return;
    }
    voiceChannel
      .leave()
      .then(() => {})
      .catch((e) => {
        message.reply("I had a problem while leaving!");
      });
  } else {
    message.reply("I must be in a voice channel to be banished!");
  }
};
