const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "configurar",
  description: "Configure meus sistemas em seu servidor",
  type: 1,
  default_member_permissions: "ManageGuild",

  run: async(client, interaction) => {

    let botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`automod_${interaction.user.id}`)
					.setLabel('Logs')
          .setEmoji("<:bot_automod:1058522931321393182>")
					.setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
					.setCustomId(`starboard_${interaction.user.id}`)
					.setLabel('StarBoard')
          .setEmoji("<:bot_estrela:1058522798978519060>")
					.setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
					.setCustomId(`autorole_${interaction.user.id}`)
					.setLabel('AutoRole')
          .setEmoji("<:bot_welcome:1058523078369493023>")
					.setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
					.setCustomId(`ticket_${interaction.user.id}`)
					.setLabel('Ticket')
          .setEmoji("<:bot_ticket:1058522868201300009>")
					.setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
					.setCustomId(`proximo_${interaction.user.id}`)
					.setLabel('Proximo')
          .setEmoji("🔀")
					.setStyle(ButtonStyle.Secondary)
			);


  interaction.reply({
    content: `${interaction.user}`,
    embeds: [
      new EmbedBuilder ()
      .setTitle("Área de Configuração")
      .setDescription("Me configue em seu servidor, clique no botão pra configurar.")
      .setColor("Blue")
      .setThumbnail("https://media.discordapp.net/attachments/1057275542509985802/1058525327049101372/emoji_5.png")
    ],
    components: [botoes]
  })
    
  }
}