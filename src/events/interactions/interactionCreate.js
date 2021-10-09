const { timeformat } = require("../../utils/functions.js");

module.exports = async (client, interaction) => {

  if (interaction.isCommand()) {
    if (!client.slashCommands.has(interaction.commandName)) {
      return interaction.reply("An error has occurred").catch(() => {});
    }


    const command = client.slashCommands.get(interaction.commandName);


    if (!interaction.member.permissions.has(command.slashCommand.userPermissions || [])) {
      interaction.reply({
        content: `You do not have enough permissions to use this command`,
        ephemeral: true,
      });
    }

    if (command.cooldown > 0) {
      const remaining = command.getRemainingCooldown(interaction.member.id);
      if (remaining > 0)
        return interaction
          .reply({
            content: `You are on cooldown. You can use the command after ${timeformat(remaining)}`,
            ephemeral: true,
          })
          .catch(() => {});
    }

    await interaction.deferReply({ ephemeral: command.slashCommand.ephemeral }).catch(() => {});

    try {
      await command.interactionRun(interaction, interaction.options);
      command.applyCooldown(interaction.user.id);
    } catch(e) {
      console.log(e)
      interaction.followUp("Oops! An error occurred while running the command");
    }
  }

  else if (interaction.isContextMenu()) {
    if (!client.contextMenus.has(interaction.commandName)) {
      return interaction.reply("An error has occurred").catch(() => {});
    }

    const command = client.contextMenus.get(interaction.commandName);


    if (!interaction.member.permissions.has(command.contextMenu.userPermissions || [])) {
      return interaction.reply({
        content: `You do not have enough permissions to use this command`,
        ephemeral: true,
      });
    }

    if (command.cooldown > 0) {
      const remaining = command.getRemainingCooldown(interaction.user.id);
      if (remaining > 0)
        return interaction
          .reply({
            content: `You are on cooldown. You can use the command after ${timeformat(remaining)}`,
            ephemeral: true,
          })
          .catch(() => {});
    }


    await interaction.deferReply({ ephemeral: command.contextMenu.ephemeral }).catch(() => {});

    try {
      await command.contextRun(interaction, interaction.options);
      command.applyCooldown(interaction.user.id);
    } catch {
      interaction.followUp("Oops! An error occurred while running the command");
    }
  }
};
