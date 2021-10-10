const { Command } = require("visa2discord");
const db = require('quick.db')
const { MessageEmbed } = require("discord.js")
let reply = []
module.exports = class ListCommand extends Command {
  constructor(client) {
    super(client, {
      name: "list",
      description: "List all custom replies/tags",
      cooldown: 5,
      command: {
        enabled: true, //booleen
        usage: "",
        category: "tags",
        botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS"],
      },
      slashCommand: {
        enabled: true, //booleen
        options: [],
      },
      contextMenu: {
        enabled: false,
      },
    });
  }


  async messageRun(message, args) {

db.all().filter(tejas => tejas.ID.startsWith(`reply_${message.guild.id}`)).forEach(async m => {
            let a = m.ID.split("_")
            reply.push(`\`${a[2]}\``)
        })
    return sendEmbed(message, (reply.length > 0) ? reply.join(', ') : "No Custom Reply / Tag Found", (reply.length > 0) ? "GREEN" : "RED")

    
  }

  async interactionRun(interaction, options) {
db.all().filter(tejas => tejas.ID.startsWith(`reply_${interaction.guild.id}`)).forEach(async m => {
            let a = m.ID.split("_")
            reply.push(`\`${a[2]}\``)
        })
    return sendFollowUp(interaction, (reply.length > 0) ? reply.join(', ') : "No Custom Reply / Tag Found", (reply.length > 0) ? "GREEN" : "RED")
  }
};

async function sendEmbed(msg, desc, color) {
  const embed = new MessageEmbed()
  .setDescription(desc)
  .setColor(color)

msg.reply({ embeds: [embed] })


}
async function sendFollowUp(int, desc, color) {
  const embed = new MessageEmbed()
  .setDescription(desc)
  .setColor(color)

int.followUp({ embeds: [embed] })


}