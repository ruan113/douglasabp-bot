exports.command = {
  title: "purge",
  description: "Delete the x last messages in a text channel. ex: +purge 10",
  run: async (client, message, args) => {
    console.log(message.member);
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "*You don't have permission to use this command.*"
      );
    if (!args[0])
      return message.channel.send(
        "*You didn't specify how many messages to delete.*"
      );

    await message.delete();

    message.channel.bulkDelete(args[0], true).then(() => {
      message.channel.send(
        `***The Admin ${message.member.user.username} has Deleted ${args[0]} messages***`
      );
    });
  },
};
