console.clear();
const Discord = require("discord.js");
//-----------Config-&-token-checker---------\\
const chalk = require("chalk");
async function checktoken(token){
  if (!token) {
       console.log(chalk.redBright(`NO TOKEN PROVIDED`))
      process.exit()
    }
    if(token.length != "NzQ4MDg3OTA3NTE2MTUzODg5.X0YVJw.Wk6lEEwy158ZQ3wvKx3uvdnoWGA".length) {
      console.log(chalk.redBright(`INAVLID TOKEN`))
      process.exit()
    }
  let testclient = new Discord.Client({
   intents : [
     Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING ,
  ]
});
  try {
    await testclient.login(token)
    testclient.on("ready", () => testclient.destroy() ) 
  } catch {
    console.log(chalk.redBright("INVALID TOKEN"))
    process.exit()
  }
}
checktoken(require("./config.js").token)



async function configcheck(config) {
  if (!config.prefix) {
    console.log(chalk.redBright("Fill config.js [Prefix]"))
    process.exit()
    }
  
  if (!typeof config.Slash.global === "boolean") {
    console.log(chalk.redBright("Fill config.js [Slash.global] or the value is not booleen"))
    process.exit()
    }
  if (!typeof config.Slash.test === "boolean") {
    console.log(chalk.redBright("Fill config.js [Slash.test] or the value isnt booleen"))
    process.exit()
    } 
  if (config.Slash.test) {
  if (!config.Slash.GUILD_ID) {
    console.log(chalk.redBright("Fill config.js [Slash.test] or the value isnt booleen"))
    process.exit()
    }
  if (!typeof config.Slash.GUILD_ID === "string") {
    console.log(chalk.redBright("Fill config.js [Slash.test] or the value isnt booleen"))
    process.exit()
    }
  }
}
configcheck(require("./config.js"))

 //--------------------------------------\\





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


client.login(client.config.token)
