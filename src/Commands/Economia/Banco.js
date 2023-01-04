const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "banco",
  description: "Veja seu banco",
  type: 1,
  run: async(client, interaction) => {
    let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
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
        .setTitle(`Seu Banco`)
        .addFields(
          {
            name: `KaedeCoins no Bolso:`,
            value: `${client.numero(userdb.economia.money)}`
          },{
            name: `KaedeCoins no Banco:`,
            value: `${client.numero(userdb.economia.banco)}`
          }
        )
        .setColor("Green")
        .setThumbnail(`${interaction.user.displayAvatarURL()}`)
      ]
    })
  }
}