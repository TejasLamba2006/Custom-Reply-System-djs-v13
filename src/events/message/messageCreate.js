module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
const prefix = client.config.prefix

  if (message.content.includes(`${client.user.id}`)) message.reply(`My prefix is \`${prefix}\``);

  let isCommand = false;
  if (message.content.startsWith(prefix)) {
    const args = message.content.replace(`${prefix}`, "").split(/\s+/);
    const invoke = args.shift().toLowerCase();
    const cmd = client.getCommand(invoke);

    if (cmd) {
      isCommand = true;
      try {
        await cmd.execute(message, args, invoke, prefix);
      } catch (ex) {
        message.reply("Oops! An error occurred while running the command");
       console.log(ex);
      }
    }
  }
};
