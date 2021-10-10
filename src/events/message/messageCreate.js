const db = require('quick.db')
module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
const prefix = client.config.prefix

  if (message.content.includes(`${client.user.id}`)) message.reply(`My prefix is \`${prefix}\``);

  let isCommand = false;
  if (message.content.startsWith(prefix)) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
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
   

    
  } else {
    // Custom reply / Tag system
    let args = message.content.trim().split(/ +/g)
    const invoke = args.shift().toLowerCase();

          
      let found = db.get(`reply_${message.guild.id}_${invoke}`)
       if (found !== null) {
    
         let reply = db.get(`reply_${message.guild.id}_${invoke}`)
         message.channel.send({ content: reply })
         }
  }
};
