module.exports = async (client) => {
 console.log(`Logged into ${client.user.username}`)

  updatePresence(client);
  setInterval(() => updatePresence(client), 10 * 60 * 1000);

  if (client.config.Slash.global) {
 await client.registerInteractions();
  } else if (client.config.Slash.test)
await client.registerInteractions(client.config.Slash.GUILD_ID);
 }
  
};

const updatePresence = (client) => {
  const guilds = client.guilds.cache;
  const members = guilds.map((g) => g.memberCount).reduce((partial_sum, a) => partial_sum + a, 0);

  client.user.setPresence({
    status: "dnd",
    activities: [
      {
        name: `${members} members in ${guilds.size} servers`,
        type: "WATCHING",
      },
    ],
  });
};
