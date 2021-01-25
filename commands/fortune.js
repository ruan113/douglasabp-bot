exports.command = {
  title: "ping",
  description: "Just a command to test if Douglas is listening.",
  run: (client, message, args) => {
    const fortunes = require("./../bot-function_fortune.json");
    message.reply(
      `${fortunes[Math.floor(Math.random() * fortunes.length)]}`
    );
  },
};
