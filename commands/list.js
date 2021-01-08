exports.command = {
  title: "list",
  description: "List all commands that Douglas can do.",
  run: (client, message, args) => {
    const path = require("path");
    const fs = require("fs");
    //joining path of directory
    const directoryPath = path.join(__dirname, "");
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      let commandsList = "";
      //listing all files using forEach
      files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
        aux = require(`./${file}`);
        console.log(aux);
        commandsList += `${aux.command.title}\t\t- ${aux.command.description}\n`;
      });
      message.channel.send(`List of commands:\n\n${commandsList}`);
    });
  },
};
