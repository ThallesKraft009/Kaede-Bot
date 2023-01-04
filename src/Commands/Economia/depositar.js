module.exports = {
  name: "depositar",
  description: "Deposite suas KaedeCoins pra evitar aue alguém roube",
  type: 1,
  options: [
    {
      name: "quantidade",
      description: "Quantas KaedeCoins você quer depositar",
      type: 10,
      required: true
    }
  ],

  run: async(client, interaction) => {

let quantidade = interaction.options.getNumber("quantidade");

let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }


    let KaedeCoins = userdb.economia.money;

    if (KaedeCoins < quantidade) return interaction.reply({
      content: `<:kaede_2:1059170168770670592> você não tem tudo isso de KaedeCoins pra depositar...`,
      ephemeral: true
    })

    await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "economia.money": KaedeCoins - quantidade,
  "economia.banco": userdb.economia.banco + quantidade
     }
     })
    
    return interaction.reply({
      content: `<:kaede_1:1059168448946643066> | Você depositou ${client.numero(quantidade)} KaedeCoins!`
    })
    

  }
}