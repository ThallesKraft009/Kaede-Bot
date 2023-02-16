const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require("discord.js");

module.exports = async(client) => {
  client.paginas = async function (interaction, pages, time = 60000) {

    if (!interaction) return console.log("Interação não definida!")
   if (!pages) return console.log("Páginas não definidas!")

    if (!Array.isArray(pages)) return console.log("As páginas não são uma ARRAY.")

    if (typeof time !== "number") return console.log("O tempo precisa ser um número!")

    if (parseInt(time) < 30000) return console.log("O tempo precisa ser maior que 30 segundos")

    await interaction.deferReply();

    if (pages.length === 1) {
      const page = await interaction.editReply({
        embeds: pages,
        components: [],
        fetchReply: true
      });

        return page;
    }

    const prev = new ButtonBuilder()
    .setCustomId("prev")
    .setEmoji("◀️")
    .setStyle(ButtonStyle.Primary)

    const home = new ButtonBuilder()
    .setCustomId("home")
    .setEmoji("🏠")
    .setStyle(ButtonStyle.Danger)

    const next = new ButtonBuilder()
    .setCustomId("next")
    .setEmoji("▶️")
    .setStyle(ButtonStyle.Primary)

    const buttonRow = new ActionRowBuilder()
      .addComponents(prev, home, next)

    let index = 0;

  const currentPage = await interaction.editReply({
      content: `${interaction.user}`,
      embeds: [pages[index]],
      components: [buttonRow],
      fetchReply: true
    })


    const collector = await interaction.channel.createMessageCollector({
      componentType: ComponentType.Button,
      time
    });

  collector.on("collect", async (i) => {
    if (i.user.id !== interaction.user.id)
      return i.reply({
        content: `Apenas ${interaction.user} pode interagir com os botões, sai daqui!`,
        ephemeral: true
      })

       await i.deferUpdate();

    if (i.customId === "prev") { 
        if (index > 0) index--;
    } else if (i.customId === "home") {
         index = 0;
    } else if (i.customId === "next") {
        if (index < pages.legth - 1) index++;
    }

  if (index === 0) prev.setDisabled(true)
    else prev.setDisabled(false)

    if (index === 0) home.setDisabled(true)
    else home.setDisabled(false);


      await i.edit({
        content: `${interaction.user}`,
        embeds: [pages[index]],
        components: [buttonRow]
      });

        collector.resetTimer();
  })

    collector.on("end", async(i) => {
      await currentPage.edit({
        embeds: [page[index]],
        components: []
      });
    });

      return currentPage;
  }
}