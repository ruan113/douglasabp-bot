const moment = require("moment");
const db = require("quick.db");

exports.command = {
  title: "ping",
  description: "Just a command to test if Douglas is listening.",
  run: (client, message, args) => {
    const found = db.fetch(`fortune.${message.author.id}`);
    let diff = found ? moment().diff(moment(found), "days") : undefined;

    if (diff > 0 || !found) {
      const fortunes = require("./../bot-function_fortune.json");
      message.reply(`${fortunes[Math.floor(Math.random() * fortunes.length)]}`);
      db.set(`fortune.${message.author.id}`, moment())
    } else {
      message.reply('you can only have a fortune per day!');
    }
  },
};
