const ms = require("ms");
const db = require("quick.db");

exports.command = {
  title: "remind",
  description:
    "Set a reminder for you, Douglas will remind you later. For more, type +remind help.",
  run: (client, message, args) => {
    let timeuser = args[0];
    let reason = args.slice(1).join(" ");

    if (handleExtras(message, args[0])) return;
    if (!timeuser)
      return message.reply(
        "You should enter a time or a command, if you need help type +remind help"
      );
    if (!reason) return message.reply("You should enter reason");

    db.set(`remind.${message.author.id}.time`, Date.now() + ms(timeuser));
    db.set(`remind.${message.author.id}.reason`, reason);
    message.channel.send("ok");
    const interval = setInterval(function () {
      if (Date.now() > db.fetch(`remind.${message.author.id}.time`)) {
        db.delete(`remind.${message.author.id}`);
        message.author
          .send(`**Remind:** ${reason}`)
          .catch((e) => console.log(e));
        clearInterval(interval);
      }
    }, 1000);
  },
};

function handleExtras(message, arg) {
  switch (arg) {
    case "check":
      return checkRemind(message);
    case "help":
      return helpRemind(message);
  }
  return false;
}

function checkRemind(message) {
  const t = db.fetch(`remind.${message.author.id}.time`);
  const r = db.fetch(`remind.${message.author.id}.reason`);

  if (t && r)
    message.author.send(
      `You will be reminded in **${ms(t - Date.now(), {
        long: true,
      })}** about: **${r}**`
    );
  else message.reply("*Looks like you have nothing to be reminded.*");

  return true;
}

function helpRemind(message) {
  message.channel.send(
    `List of remind commands:
    help: list all remind commands. 
    check: check if you have a reminder setted.
    `
  );

  return true;
}

function initializeAllReminders() {}
