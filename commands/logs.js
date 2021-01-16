fs = require("fs");

exports.command = {
  title: "logs",
  description: "List last 10 logs that system may have created.",
  run: (client, message, args) => {
    let logs = [];
    fs.readFile("logs.txt", "utf8", function (err, data) {
      if (err) {
        console.log(err);
      }
      logs = data.split(";");

      let string = "";
      logs.forEach(function (it) {
        string += it + "\n";
      });
      message.channel.send(`Last 10 system logs:\n\n${string}`);
    });
  },
};
