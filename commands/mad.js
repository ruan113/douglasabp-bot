exports.run = (client, message, args) => {
  message.channel.send(
    "All around me are familiar faces\nWorn out places, worn out faces",
    {
      tts: true,
    }
  );
};
