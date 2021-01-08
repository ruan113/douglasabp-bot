exports.command = {
  title: "jose",
  description: "Let Douglas express his feelings about José.",
  run: (client, message, args) => {
    message.channel.send("José vai tomar no olho do seu cu!", {
      tts: true,
    });
  },
};
