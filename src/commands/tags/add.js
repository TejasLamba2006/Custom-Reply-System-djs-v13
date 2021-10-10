const { Command } = require("visa2discord");
const db = require('quick.db')
const { MessageEmbed } = require("discord.js")

module.exports = class AddCommand extends Command {
  constructor(client) {
    super(client, {
      name: "add",
      description: "Add a custom reply/tag",
      cooldown: 5,
      command: {
        enabled: true, //booleen
        usage: "<command> <reply>",
        category: "tags",
        botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS"],
        userPermissions: ["ADMINISTRATOR"],
        minArgsCount: 2,
      },
      slashCommand: {
        enabled: true, //booleen
        userPermissions: ["ADMINISTRATOR"],
        options: [
          {
            name: "command",
            description: "the words that will triger the command", 
            type: "STRING", // USER | STRING | CHANNEL | ROLE | INTEGER
            required: true, //booleen
          },
          {
            name: "reply",
            description: "the words that will come hen he commad is trigred", 
            type: "STRING", // USER | STRING | CHANNEL | ROLE | INTEGER
            required: true, //booleen
          }
        ],
      },
      contextMenu: {
        enabled: false, //booleen
      },
    });
  }


  async messageRun(message, args) {

  let cmd = args[0]
  let reply = args.slice(1).join(" ")

  const old = db.get(`reply_${message.guild.id}_${cmd}`)

  if(old !== null) {
     return sendEmbed(message, `Custom Reply / Tag Already excists`, "RED")
  }

db.set(`reply_${message.guild.id}_${cmd}`, reply)
await sendEmbed(message, `Added Tag \`${cmd}\` with the reply of \`${reply}\``, "GREEN")
  }

  async interactionRun(interaction, options) {
  let cmd = options.getString("command")
  let reply = options.getString("reply")

  const old = db.get(`reply_${interaction.guild.id}_${cmd}`)

  if(old !== null) {
     return sendFollowUp(interaction, `Custom Reply / Tag Already excists`, "RED")
  }

db.set(`reply_${interaction.guild.id}_${cmd}`, reply)
await sendFollowUp(interaction, `Added Tag \`${cmd}\` with the reply of \`${reply}\``, "GREEN")

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
