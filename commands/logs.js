fs = require("fs");
utils = require("./../utils");

exports.command = {
  title: "logs",
  description: "List last 10 logs that system may have created.",
  run: (client, message, args) => {
    let logs = [];
    fs.readFile("logs.txt", "utf8", function (err, data) {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          "*You don't have permission to use this command.*"
        );

      if (err) {
        console.log(err);
      }

      if (args[0]) {
        switch (args[0]) {
          case "reset":
            resetLogs(message);
            return;
        }
      }

      logs = data.split(";");
      message.channel.send(`Last 10 system logs:\n\n${logs.join("\n")}`);
    });
  },
};

function resetLogs(message) {
  fs.writeFile("logs.txt", "", "utf8", function (err, data) {
    if (err) {
      utils.log(`*Error while trying to reset system logs. Details: ${err}*`);
      return message.channel.send(`*Error while trying to reset system logs.*`);
    } else {
      success = `*System logs have been reseted by ${message.member.user.username}.*`;
      utils.log(success);
      return message.channel.send(success);
    }
  });
}
