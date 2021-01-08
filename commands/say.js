exports.run = (client, message, args) => {
  msg = "";
  if (args.length > 0) {
    args.forEach(it => {
      msg += it + " ";
    });

    message.channel.send(msg, {
      tts: true,
    });
  } else {
    message.channel.send("You must type something first! ex: +say big text here");
  }
};
