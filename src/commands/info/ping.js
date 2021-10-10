const { Command } = require("visa2discord");
const { MessageEmbed } = require("discord.js")

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Get the bot's ping",
      cooldown: 5,
      command: {
        enabled: true, //booleen
        usage: "",
        category: "info",
        botPermissions: [],
      },
      slashCommand: {
        enabled: true, //booleen
        options: [],
      },
      contextMenu: {
        enabled: false
      },
    });
  }


  async messageRun(message, args) {
      var date = Date.now()
      message.reply({ embeds: [new MessageEmbed()
        .setTitle(`🏓 Pinging....`)
      ]}).then(msg => {
        msg.edit({embeds: [new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`🏓 Ping: \`${Math.round(Date.now() - date)}ms\`\n\n:robot: Api Latency: \`${Math.round(message.client.ws.ping)}ms\``)
        ]});
      })
  }

  async interactionRun(interaction, options) {
await interaction.followUp({content: `Getting the Bot Ping...`, ephemeral: true});
			interaction.editReply({content: `Bot Ping: \`${Math.floor((Date.now() - interaction.createdTimestamp) - 2 * Math.floor(this.client.ws.ping))} ms\``, ephemeral: true})
  }
};
