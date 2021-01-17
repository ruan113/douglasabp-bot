const utils = require("./../utils");

exports.command = {
  title: "reset",
  description: "Force reset at something, like logs.",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "*You don't have permission to use this command.*"
      );

    if (args.length === 0)
      return message.channel.send(
        "*You must specify what will be reseted. ex: logs*"
      );

    switch (args[0]) {
      case "logs":
        resetLogs(message);
        break;
    }
  },
};

function resetLogs(message) {
  fs.writeFile("logs.txt", "", "utf8", function (err, data) {
    if (err) {
      utils.log(`*Error while trying to reset system logs. Details: ${err}*`);
      return message.channel.send(`*Error while trying to reset system logs.*`);
    } else {
      utils.log(
        `*System logs have been reseted by ${message.member.user.username}.*`
      );
      return message.channel.send(
        `*System logs have been reseted by ${message.member.user.username}.*`
      );
    }
  });
}
