const { ChannelType } = require("discord.js");

module.exports = {
  name: "chat",
  description: "Gerencie os canais de texto de uma forma mais fácil",
  type: 1,
  options: [
    {
      name: "fechar",
      description: "Tranque o canal de texto",
      default_member_permissions: 1 << 4,
      type: 1
    },{
      name: "abrir",
      description: "Destranque o canal de texto",
      default_member_permissions: 1 << 4,
      type: 1
    }
  ],
  run: async(client, interaction) => {
let comando = interaction.options.getSubcommand()

    if (comando === "abrir") {

await interaction.reply({
        content: `🔓 | O canal de texto foi aberto`
      })
      interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).catch(err => {
  
   interaction.editReply({
     content: "Ocorreu um erro ao tentar abrir o chat..."
   })
     console.log(err)

   })

    }

    if (comando === "fechar") {
      
       await interaction.reply({
        content: `🔒 | O canal de texto foi trancado.`
      })
      interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(err => {
  
   interaction.editReply({
     content: "Ocorreu um erro ao tentar trancar o chat..."
   })
     console.log(err)

   })
    }
  }
}