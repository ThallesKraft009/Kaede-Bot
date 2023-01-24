const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "kaedecoins-rank",
  description: "Veja o rank de KaedeCoins",
  type: 1,
    run: async(client, interaction) => {

     let userdb = await client.userdb.find({})
      
      userdb.sort((a,b) => (b.economia.money + b.economia.money) - (a.economia.money + a.economia.money))
      
      userdb = userdb.slice(0,15)
    
let embed = new EmbedBuilder()
      .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
      .setDescription(` ${userdb.map((user, i) => `#${i+1} | **[${client.users.cache.get(user.userID).username || `sumido#0000`}](https://discord.com/users/${user.userID})** ( ${client.numero(user.economia.money)})`).join("\n ") }`)
      .setColor("Random")

      interaction.reply({
        embeds: [embed]
      })
      
    }
}