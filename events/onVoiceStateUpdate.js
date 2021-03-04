const utils = require("./../utils");

module.exports = (client) => {
  client.on("voiceStateUpdate", (oldMember, newMember) => {
    try {
      let newUserChannel = newMember.channelID;
      let oldUserChannel = oldMember.channelID;
      const user = {
        id: newMember.id,
        name: newMember.guild.members.cache.find((it) => {
          return it.id === newMember.id;
        }).user.username,
        status: getStatus(oldUserChannel, newUserChannel),
      };

      utils.log(
        "user " + user.name + "(" + user.id + ") " + user.status,
        user.status === utils.userStatus.unknown
      );

      if (Math.floor(Math.random() * Math.floor(100)) < 2) {
        handleChange(oldMember, newMember, user);
      }

      // Meu Id
      // if (newMember.id === utils.env.ruanUserId) {
      // Id do douglas
      if (newMember.id === utils.env.douglasUserId) {
        switch (user.status) {
          case utils.userStatus.connected:
            newMember.channel.leave();
            break;
          case utils.userStatus.disconnected:
            try {
              delete require.cache[require.resolve(`./../commands/join.js`)];
              require(`./../commands/join.js`).command.run(client, undefined, {
                channelID: "253894435635593217",
              });
              newMember.guild.channels.cache
                .find((it) => it.id === "253894435635593216")
                .send("Oh shit, here we go again", {
                  tts: true,
                });
            } catch (e) {
              utils.log(e);
            }
            break;
        }
      }
    } catch (e) {
      console.error(e);
    }
  });

  function handleChange(oldMember, newMember, user) {
    if (user.id === client.user.id) return;
    // Here I'm getting the channel, just replace VVV this VVV with the channel's ID
    let textChannel = oldMember.guild.channels.cache.get("253894435635593216");
    if (!textChannel) throw new Error("That channel does not exist.");

    // Here I don't need to check if they're the same, since it would've exit before
    if (user.status === utils.userStatus.connected) {
      // console.log("A user joined.");
      textChannel.send(`${user.name} just came in.`, {
        tts: true,
      });
    } else if (user.status === utils.userStatus.disconnected) {
      // console.log("A user left.");
      textChannel.send(`${user.name} just came out.`, {
        tts: true,
      });
    }
  }

  function getStatus(lastChannelID, actualChannelID) {
    return actualChannelID === null
      ? utils.userStatus.disconnected
      : lastChannelID === null
      ? utils.userStatus.connected
      : utils.userStatus.unknown;
  }
};
