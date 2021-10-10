const { Command } = require("visa2discord");
const db = require('quick.db')
const { MessageEmbed } = require("discord.js")

module.exports = class DeleteCommand extends Command {
  constructor(client) {
    super(client, {
     name: "delete",
      description: "Delete a custom reply/tag",
      cooldown: 5,
      command: {
        enabled: true, //booleen
        usage: "<command>",
        category: "tags",
        botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS"],
        userPermissions: ["ADMINISTRATOR"],
        minArgsCount: 1,
      },
      slashCommand: {
        enabled: true, //booleen
        options: [
          {
            name: "command",
            description: "the words that will triger the command", 
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
let old = db.get(`reply_${message.guild.id}_${cmd}`) 
if (old === null) {
 return sendEmbed(message, `No such Custom Reply / Tag exists!`, "RED")
}

await db.delete(`reply_${message.guild.id}_${cmd}`)
return sendEmbed(message, `I have deleted the tag \`${cmd}\` with the reply of \`${old}\``, "GREEN")

  }

  async interactionRun(interaction, options) {
let cmd = options.getString("command")
let old = db.get(`reply_${interaction.guild.id}_${cmd}`) 
if (old === null) {

 return sendFollowUp(interaction, `No such Custom Reply / Tag exists!`, "RED")
}

await db.delete(`reply_${interaction.guild.id}_${cmd}`)
return sendFollowUp(interaction, `I have deleted the tag \`${cmd}\` with the reply of \`${old}\``, "GREEN")
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
