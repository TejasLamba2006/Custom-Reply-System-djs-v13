console.clear();
const Discord = require("discord.js");


const { V2dClient } = require("visa2discord")
const client = new V2dClient({
  allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  intents: [
  Discord.Intents.FLAGS.GUILD_MESSAGES ,Discord.Intents.FLAGS.GUILDS
  ]
})
client.config = require('./config.js')

client.loadEvents(__dirname + "/src/events");
client.loadCommands(__dirname + "/src/commands");

client.initializeMongoose(client.config.mongo) // if you need to connect to mongo remove this line otherwise


client.login(client.config.token)
