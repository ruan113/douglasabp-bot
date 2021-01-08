exports.command = {
  title: "purge",
  description: "Delete the x last messages in a text channel. ex: +purge 10",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) 
      return message.channel.send(
        "*You don't have permission to use this command.*"
      );
    if (!args[0]) 
      return message.channel.send(
        "*You didn't specify how many messages to delete.*"
      );

    await message.delete();

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`***Deleted ${args[0]} messages***`)
        .then(message => {
            message.delete({ timeout: 1000 });
        });
    });
  },
};
