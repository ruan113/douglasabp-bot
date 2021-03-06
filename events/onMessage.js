const utils = require("./../utils");

module.exports = (client) => {
  client.on("message", (message) => {
    let args = message.content.slice(utils.env.PREFIX.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (message.author.bot || !message.content.startsWith(utils.env.PREFIX))
      return;

    if (shouldIRefuse(message)) return;

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

  function shouldIRefuse(message) {
    const refuseVal = Math.floor(Math.random() * Math.floor(100));
    if (refuseVal < 5) {
      let gif =
        utils.refuseGifs[
          Math.floor(Math.random() * Math.floor(utils.refuseGifs.length))
        ];
      message.channel.send(gif);
      return true;
    }
    return false;
  }
};
