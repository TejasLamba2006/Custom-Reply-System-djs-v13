const { Command, Paginate } = require("visa2discord");
const { MessageEmbed } = require("discord.js")

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Get working of each comand",
      cooldown: 5,
      command: {
        enabled: true, //booleen
        usage: "",
        category: "info",
        botPermissions: [],
      },
      slashCommand: {
        enabled: true, //booleen
        options: [
          {
            name: "query",
            description: "The category or command you need help for", 
            type: "STRING", // USER | STRING | CHANNEL | ROLE | INTEGER
            required: false, //booleen
          },
        ],
      },
      contextMenu: {
        enabled: false,
      },
    });
  }


  async messageRun(message, args) {
let cat = args[0]
if (!cat) {
  return sendEmbed(message, "**__Categories__** \n > \`Tags\` \n > \`Info\`", "RANDOM")
} 
const emb = await HelpEmbed(cat, message)

 const cmd = this.client.getCommand(cat);
    if (cmd) return cmd.sendUsage(message.channel, message.client.config.prefix, cat);

Paginate(emb, message)
  }

  async interactionRun(interaction, options) {
    let cat = options.getString("query")
if (!cat) {
  return sendFollowUp(interaction, "**__Categories__** \n > \`Tags\` \n > \`Info\`", "RANDOM")
} 
const emb = await HelpEmbed(cat, interaction)

 const cmd = this.client.getCommand(cat);
    if (cmd) return cmd.sendUsage(interaction.channel, message.client.config.prefix, cat);

interaction.followUp({ embeds: [emb] })
  }
};

async function HelpEmbed(category, message) {
  const commands = message.client.commands.filter((cmd) => cmd.command.category === category);

  if (commands.length === 0) {
return;
  }

  const arrSplitted = [];
  const arrEmbeds = [];

  while (commands.length) {
    let toAdd = commands.splice(0, commands.length > 7 ? 7 : commands.length);
    toAdd = toAdd.map((cmd) => `**${cmd.name}**\n ❯ ${cmd.description}`);
    arrSplitted.push(toAdd);
  }

  arrSplitted.forEach((item, index) => {

    const embed = new MessageEmbed()
      .setColor(`RANDOM`)
      .setAuthor(`${category} Commands`)
      .setDescription(item.join("\n"))
      .setFooter(
        `page ${index + 1} of ${arrSplitted.length} | Type ${message.client.config.prefix}help <command> for more command information`
      );
    arrEmbeds.push(embed);
  });

  return arrEmbeds;
}

async function sendEmbed(msg, desc, color) {
  const embed = new MessageEmbed()
  .setDescription(desc)
  .setColor(color)
  .setFooter(`${message.client.config.prefix}help <category> for more info`)

msg.reply({ embeds: [embed] })


}
async function sendFollowUp(int, desc, color) {
  const embed = new MessageEmbed()
  .setDescription(desc)
  .setColor(color)
  .setFooter(`${int.client.config.prefix}help <category> for more info`)
int.followUp({ embeds: [embed] })


}