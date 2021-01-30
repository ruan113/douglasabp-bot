module.exports = (client) => {
  const utils = require('./../utils')

  client.on("message", (message) => {
    let args = message.content.slice(utils.env.PREFIX.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (message.author.bot || !message.content.startsWith(utils.env.PREFIX))
      return;

    const refuseVal = Math.floor(Math.random() * Math.floor(100));
    if (refuseVal < 5) {
      let gif;
      switch (Math.floor(Math.random() * Math.floor(6))) {
        case 0:
          gif =
            "https://thumbs.gfycat.com/CarelessThankfulFluke-size_restricted.gif";
          break;
        case 1:
          gif = "https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif";
          break;
        case 2:
          gif = "https://gfycat.com/frayedcircularcattle";
          break;
        case 3:
          gif = "https://media1.giphy.com/media/4bpK2k0Yru5Us/200.gif";
          break;
        case 4:
          gif =
            "https://media.tenor.com/images/c336d9b6845eac3b94ea727dd320f637/tenor.gif";
          break;
        case 5:
          gif = "https://media3.giphy.com/media/cm5UUDclHfbgZYk1SW/200.gif";
          break;
      }
      message.channel.send(gif);
      return;
    }

    try {
      delete require.cache[require.resolve(`./../commands/${cmd}.js`)];

      let module = require(`./../commands/${cmd}.js`);
      module.command.run(client, message, args);
    } catch (e) {
      message.channel.send(
        "Invalid Command - if you need help, try +list to see the command list."
      );
      utils.log(e);
    }
  });
}