const tempo = require("ms");

module.exports = {
  name: "daily",
  description: "Colete suas KaedeCoins diárias",
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


     if(Date.now() < userdb.economia.daily){
      const calc = userdb.economia.daily - Date.now()
      
         return interaction.reply({content: `🚫 | Você só pode pegar seu daily novamente em ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s !`, ephemeral: true})
     }  


let moedas = Math.floor(Math.random() * 1000) + 10000;
      if (userdb.premium === true) moedas = Math.floor(Math.random() * 12678) + 30000;


await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "economia.money": userdb.economia.money + moedas,
  "economia.daily": Date.now() + tempo("12h"),
     }
     })


interaction.reply({
        content: `<:pepe_3:1039469084133302352> | Você pegou seu daily e ganhou **\`${client.numero(moedas)}\`**  KaedeCoins!`
      })
     
     

     
   }
}




function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
    }