exports.command = {
  title: "ping",
  description: "Just a command to test if Douglas is listening.",
  run: (client, message, args) => {
    message.channel.send("Estou aqui!", {
      tts: false,
    });
  },
};
