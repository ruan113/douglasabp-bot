exports.command = {
  title: "leave",
  description: "Force Douglas to disconnect from any voice channel.",
  run: async (client, message, args) => {
    if (message.member.voice.channel) {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        message.channel.send("You must be in a channel first!");
        return;
      }
      await voiceChannel.leave();
    } else {
      message.reply("I must be in a voice channel to be banished!");
    }
  },
};
