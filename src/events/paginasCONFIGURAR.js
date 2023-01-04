

const client = require("../bot.js");
const tempo = require("ms");

const { ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");



client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;

  if (interaction.customId === `proximo_${interaction.user.id}`){

await interaction.deferUpdate()
  
  let botoes = new ActionRowBuilder().addComponents(

new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`welcome_${interaction.user.id}`)
					.setLabel('Welcome')
          .setEmoji("<:emoji_6:1058741206361837579>")
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`verificar_${interaction.user.id}`)
					.setLabel('Verificação')
          .setEmoji("<:emoji_7:1058911296189386843>")
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`sugestao_${interaction.user.id}`)
					.setLabel('Sugetões')
          .setEmoji("💡")
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
    )

    interaction.editReply({
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

  if (interaction.customId === `voltar_${interaction.user.id}`){

      await interaction.deferUpdate()
  
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


  interaction.editReply({
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

})