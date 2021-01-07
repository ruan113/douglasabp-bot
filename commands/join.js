exports.run = async (client, message, args) => {
  if (message) {
    if (message.member.voice.channel) {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        message.channel.send("You must be in a channel first!");
        return;
      }
      const connection = await voiceChannel.join();
      if (!connection) {
        message.channel.send("I had a problem while trying to join in!");
        return;
      }
    } else {
      message.reply("You must be in a voice channel to be banished!");
    }
  } else {
    const voiceChannel = client.channels.cache.get(args.channelID);
    if (!voiceChannel) return console.error("The channel does not exist!");
    voiceChannel
      .join()
      .then((connection) => {
        // Yay, it worked!
        console.log("Successfully connected.");
      })
      .catch((e) => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
      });
  }
};
