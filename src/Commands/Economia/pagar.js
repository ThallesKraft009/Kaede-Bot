module.exports = {
  name: "pagar",
  description: "Envie KaedeCoins pra alguém",
  type: 1,
  options: [
    {
      name: 'membro',
      description: 'Selecione o membro ou insira o ID',
      type: 6,
      required: true
    },{
      name: 'quantidade',
      description: "Quantas KaedeCoins quer enviar",
      type: 10,
      required: true
    }
  ],
   run: async(client, interaction) => {

let membro = interaction.options.getUser("membro");
     if (membro === interaction.user) return interaction.reply({
           content: `Você não pode enviar KaedeCoins pra você mesmo!`,
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

let quantidade = interaction.options.getNumber("quantidade");
     
if (userdb.economia.money < quantidade) return interaction.reply({
  content: `Você não tem tudo isso de KaedeCoins!`,
  ephemeral: true
})

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "economia.money": userdb.economia.money - quantidade
     }
     })
await client.userdb.updateOne({
         userID: membro.id
     }, { $set: {
  "economia.money": userdb_2.economia.money + quantidade
     }
     })

     interaction.reply({
       content: `<:kaede_3:1059170087141114016> | Você pagou ${client.numero(quantidade)} KaedeCoins pra ${membro}!`
     })

  }
}