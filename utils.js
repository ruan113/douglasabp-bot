fs = require("fs");

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

exports.log = function (msg) {
  console.log(msg);
  let logs = [];

  fs.readFile("logs.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
      logs = data.split(";");
    }

    while (logs.length > 9) logs.splice(0, 1);
    const date = new Date().toISOString().slice(0, 10) + "  " + new Date().toISOString().slice(11, 19);
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
