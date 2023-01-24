const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const ms = require("ms");

module.exports = {
  name: "apostar",
  description: "Aposte KaedeCoins com alguém",
  type: 1,
  options: [
    {
      name: 'membro',
      description: 'Selecione o membro ou insira o ID',
      type: 6,
      required: true
    },{
      name: 'quantidade',
      description: "Quantas KaedeCoins quer apostar",
      type: 10,
      required: true
    }
  ],
    run: async(client, interaction) => {
      let membro = interaction.options.getUser("membro");

      if (membro === interaction.user) return interaction.reply({
        content: `Você não pode apostar com você mesmo!`,
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
        content: `Você não tem tudo isso de KaedeCoins pra apostar!`,
        ephemeral: true
      })

if (userdb_2.economia.money < quantidade) return interaction.reply({
        content: `${membro} não tem tudo isso de KaedeCoins pra apostar!`,
        ephemeral: true
      })

let ganhou = ["author", "membro"];
//roubou[Math.floor(Math.random() * roubou.length)];

let botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`apostar_${membro.id}`)
					.setLabel('Aceitar')
					.setStyle(ButtonStyle.Secondary)
  )
      
      interaction.reply({
        content: `${membro} você aceita apostar ${client.numero(quantidade)} de KaedeCoins com ${interaction.user}?`,
        components: [
          botoes
        ]
      })

const { ComponentType } = require('discord.js');

const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: ms("5m"), max: 1 });

collector.on('collect', async(i) => {
	
if (i.customId === `apostar_${membro.id}`){
  let chances = ["author", "membro"];
    chances = chances[Math.floor(Math.random() * chances.length)];

if (chances === "membro") {

  interaction.editReply({
    content: `${membro} ganhou ${client.numero(quantidade)} KaedeCoins financiado por ${interaction.user}!`,
    components: []
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

  
} else if (chances === "author") {


  interaction.editReply({
    content: `${interaction.user} ganhou ${client.numero(quantidade)} KaedeCoins financiado pod ${membro}!`,
           components: []
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "economia.money": userdb.economia.money + quantidade
     }
     })
await client.userdb.updateOne({
         userID: membro.id
     }, { $set: {
  "economia.money": userdb_2.economia.money - quantidade
     }
     })

}
}

});


    }
}