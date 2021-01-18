exports.command = {
  title: "say",
  description: "It makes Douglas say something that you want.",
  run: (client, message, args) => {
    // APAGAR A MSG QUE USUÁRIO MANDOU
    if (args.length > 0) {
      const msg = args.join(" ");
      message.channel.send(msg, {
        tts: true,
      });
    } else {
      message.channel.send(
        "You must type something first! ex: +say big text here"
      );
    }
  },
};
