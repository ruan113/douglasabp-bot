const fs = require("fs");
const moment = require("moment");

exports.env = {
  PREFIX: "+",
  psgId: "253894435635593216",
  douglasUserId: "794627937550336030",
  ruanUserId: "251524294591381506",
  maxLogs: 10,
};

exports.userStatus = {
  connected: "has connected",
  disconnected: "has disconnected",
  unknown: "has a unknown state",
};

exports.gameList = [
  "The Witcher 3: Wild Hunt",
  "Minion Masters",
  "Cyberpunk 2077",
  "War Thunder",
  "Metro Exodus",
  "Fallout 4",
  "Assassin's Creed IV Black Flag",
  "The Elder Scrolls V: Skyrim Special Edition",
  "Mass Effect 2",
  "Mass Effect 3",
  "CrossCode",
  "Starbound",
  "FTL: Faster Than Light",
  "Fable Anniversary",
  "Chrono Trigger",
  "FINAL FANTASY IX",
];

/*
 params:
  - msg: message that will be logged or displayed on console.
  - ignore (optional): flag that marks messages that doesn't need to be logged. 
 */
exports.log = function (msg, ignore = false) {
  console.log(msg);
  let logs = [];

  if (ignore) {
    return;
  }
 
  fs.readFile("logs.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
      logs = data.split(";");
    }

    while (logs.length > 9) logs.splice(0, 1);
    const date = moment().format("hh:mm:ss DD/MM/YYYY");
    logs.push(date + "\t-\t" + msg);

    let string = "";
    logs.forEach(function (it, index) {
      string += it + (index === logs.length - 1 ? "" : ";");
    });

    fs.writeFile("logs.txt", string, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      }
    });
  });
};
