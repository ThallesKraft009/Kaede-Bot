const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "banco",
  description: "Veja seu banco",
  type: 1,
  options: [
    {
      name: "membro",
      description: "Selecione ou insira o ID do membro",
      type: 6,
      required: false
    }
  ],
  run: async(client, interaction) => {


let user = interaction.options.getUser("membro") || interaction.user
    
    let userdb = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: iuser.id })
     }

    /*
    economia: {
    money: { type: Number, default: 0 },
    banco: { type: Number, default: 0 },
    daily: { type: Number, default: 0 }
  },
    */

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`})
        .addFields(
          {
            name: `KaedeCoins no Bolso:`,
            value: `${client.numero(userdb.economia.money)} (\`${userdb.economia.money}\`)`
          },{
            name: `KaedeCoins no Banco:`,
            value: `${client.numero(userdb.economia.banco)} (\`${userdb.economia.banco}\`)`
          }
        )
        .setColor("Green")
        .setThumbnail(`${user.displayAvatarURL()}`)
      ]
    })
  }
}