const { EmbedBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");

module.exports = {
  name: `servidor`,
  description: `Veja tudo sobre o servidor atual`,
  type: 1,
  options: [
    {
      name: `icone`,
      description: `Veja o Icone do Servidor`,
      type: 1
    }
  ],

  run: async(client, interaction) => {

 let comando = interaction.options.getSubcommand()

    if (comando === "icone") {

       let embed = new EmbedBuilder()
       .setDescription(`${interaction.guild.name}`)
       .setImage(`${interaction.guild.iconURL()}`)
       .setColor("Blue")
       
      interaction.reply({
        embeds: [embed]
      })
      
    }
  }
}