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
    },{
      name: "criar",
      description: "Crie um canal de texto",
      default_member_permissions: 1 << 4,
      type: 1,
      options: [
        {
          name: "nome",
          description: "Qual o nome do canal de texto",
          type: 3,
          required: true
        }
      ]
    },{
      name: "deletar",
      description: "Delete um canal de texto",
      default_member_permissions: 1 << 4,
      type: 1,
      options: [
        {
          name: "chat",
          description: "Qual o canal de texto a see deletado",
          type: 7,
          required: true
        }
      ]
    }
  ],
  run: async(client, interaction) => {
let comando = interaction.options.getSubcommand()

    if (comando === "deletar") {

let chat = interaction.options.getChannel("chat");

  if (chat.type === ChannelType.GuildText) {

      chat = interaction.guild.channels.cache.get(chat.id)

    

    interaction.reply({
      content: `O chat ${chat.name} foi deletado.`
    })

    chat.delete().catch(err => {
      interaction.editReply({
        content: `😔 | Não foi possível deletar esse chat ..`
      })

      console.log(err)
    })

    
  } else {

    interaction.reply({
      content: `❌ | Isso não é um canal de texto.`,
      ephemeral: true
    })
  }

    }
    
if (comando === "criar") {

   let nome_do_chat = interaction.options.getString("nome");

  interaction.reply({
    content: `O canal de texto criado!`
  })

interaction.guild.channels.create({
    name: `${nome_do_chat}`,
    type: ChannelType.GuildText
}).catch(err => {
  interaction.editReply({
    content: `😔 | Não foi possível criar o canal de texto..`
  })

  console.log(err)
})


}

    if (comando === "abrir") {

await interaction.reply({
        content: `🔓 | O canal de texto foi aberto`
      })
      interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).catch(err => {
        interaction.editReply({
          content: `😔 | Não foi possível abrir o canal de texto...`
        })
      })
    }

    if (comando === "fechar") {
      
        interaction.reply({
        content: `🔒 | O canal de texto foi trancado.`
      })
      interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(err => {

        interaction.editReply({
          content: `😔 | Não foi possível fechar o canal de texto...`
        })
  
     console.log(err)

   })
    }
  }
}