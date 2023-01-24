module.exports = {
  name: "roubar",
  description: "Roube KaedeCoins de seus Amigos",
  type: 1,
  options: [
    {
      name: "membro",
      description: "Selecione ou insira o ID do membro",
      type: 6,
      required: true
    }
  ],

  run: async(client, interaction) => {
let membro = interaction.options.getUser("membro");
let tempo = require("ms");
    
    if (membro === interaction.user) return interaction.reply({
      content: `<:kaede_2:1059170168770670592> você não pode roubar você mesmo!`,
      ephemeral: true
    })

let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }

    let userdb_2 = await client.userdb.findOne({
         userID: membro.id
     })
      
     if(!userdb_2){
         const newuser = new client.userdb({ userID: membro.id })
         await newuser.save();
         
         userdb_2 = await client.userdb.findOne({ userID: membro.id })
     }


    if(Date.now() < userdb.economia.roubo){
      const calc = userdb.economia.roubo - Date.now()
      
         return interaction.reply({content: `🚫 | Você só pode roubar novamente em ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s !`, ephemeral: true})
     }  

    if (userdb_2.economia.money < 500) return interaction.reply({
      content: `${membro} não tem pelo menos 500 KaedeCoins em seu bolso.`,
      ephemeral: true
    })

let roubou = ["sim", "não"];
    roubou = roubou[Math.floor(Math.random() * roubou.length)];

    if (roubou === "não") {

      await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "economia.roubo": Date.now() + tempo("1h"),
     }
     })

       return interaction.reply({
         content: `<:kaede_2:1059170168770670592> você não conseguiu roubar ${membro}!`
       })
    } else if (roubou === "sim") {

  let quantidade = Math.floor(Math.random() * 100) + 300;

          await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "economia.money": userdb.economia.money + quantidade,
"economia.roubo": Date.now() + tempo("1h")

     }
     })
await client.userdb.updateOne({
         userID: membro.id
     }, { $set: {
  "economia.money": userdb_2.economia.money - quantidade,
     }
     })
      
interaction.reply({
  content: `<:pepe_3:1039469084133302352> | Você roubou ${quantidade} KaedeCoins de ${membro}!`
})
    }  
  }
}

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}