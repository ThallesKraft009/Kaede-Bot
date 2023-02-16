const tempo = require("ms");
const { EmbedBuilder,
       ButtonBuilder,
       ActionRowBuilder, 
       ButtonStyle,
       ComponentType, 
      StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "kaedecoins",
  description: "Comandos relacionados a minha economia",
  type: 1,

  options: [
    {
      name: "daily",
      description: "Resgate KaedeCoins diários",
      type: 1
    }, {
      name: "banco",
      description: "Veja quantas KaedeCoins você tem no bolso e no banco",
      type: 1,
      options: [
        {
          name: "membro",
          description: "Selecione ou insira o ID do membro",
          type: 6,
          required: false
        }
      ]
    },{
      name: "pagar",
      description: "Pague KaedeCoins pra algum membro",
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
      ]
    },{
      name: "depositar",
      description: "Para não ser roubado, deposite suas KaedeCoins",
      type: 1,
      options: [
        {
          name: "quantidade",
          description: "Quantas KaedeCoins você quer depositar",
          type: 10,
          required: true
        }
      ]
    },{
      name: "sacar",
      description: "Saque suas KaedeCoins",
      type: 1,
      options: [
        {
          name: "quantidade",
          description: "Quantas KaedeCoins você quer sacar",
          type: 10,
          required: true
        }
      ]
    },{
      name: "roubar",
      description: "Roube KaedeCoins de outros membros do servidor",
      type: 1,
      options: [
        {
          name: "membro",
          description: "Selecione ou insira o ID do membro",
          type: 6,
          required: true
        }
      ]
    },{
      name: "apostar",
      description: "Aposte KaedeCoins com outros membros",
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
      ]
    }
  ],

  run: async(client, interaction, userdb) => {
  let comando = interaction.options.getSubcommand()


    if (comando === "loja") {

let menu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId(`loja_${interaction.user.id}`)
        .setPlaceholder("Loja da Kaede")
        .addOptions(
          {
             label: "Banners pra Perfil",
             description: "A seção de banners pra o comando de perfil",
            value: "banner"
          },{
            label: "Funções exclusivas",
            description: "Compre sistemas ou funções pra seu servidor",
            value: "functions"
          }
        )
        )

let embed = new EmbedBuilder()
    .setTitle("Loja da Kaede")
    .setDescription("Compre itens pra usar na economia e no servidor :D")
    .setThumbnail("https://cdn.discordapp.com/attachments/1059093244014764053/1075153654660730950/1f6d2.png")
    .setColor("Green")

interaction.reply({
  embeds: [
    embed
  ],
  components: [menu]
})


    }


if (comando === "apostar") {
  

      let membro = interaction.options.getUser("membro");

      if (membro === interaction.user) return interaction.reply({
        content: `Você não pode apostar com você mesmo!`,
        ephemeral: true
      })

    let userdb_2 = await client.userdb.findOne({
         userID: membro.id
     })
      
     if(!userdb_2){
         const newuser = new client.userdb({ userID: membro.id })
         await newuser.save();
         
         userdb_2 = await client.userdb.findOne({ userID: membro.id })
     }

let quantidade = interaction.options.getNumber("quantidade");

      if (userdb.economia.money <= quantidade) return interaction.reply({
        content: `Você não tem tudo isso de KaedeCoins pra apostar!`,
        ephemeral: true
      })

if (userdb_2.economia.money <= quantidade) return interaction.reply({
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

const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: tempo("5m"), max: 1 });

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

collector.on('end', async(i) => {
	
   interaction.editReply({
     content: `<:kaede_2:1059170168770670592> | O tempo máximo que esse botão ficou ativo chegou ao limite...use o comando novamente!`,
    components: []
   })

});

}

//================= | ROUBAR | ================
    if (comando === "roubar") {


let membro = interaction.options.getUser("membro");

    
    if (membro === interaction.user) return interaction.reply({
      content: `<:kaede_2:1059170168770670592> você não pode roubar você mesmo!`,
      ephemeral: true
    })

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

// =============== | SACAR | ===============
    if (comando === "sacar") {

let quantidade = interaction.options.getNumber("quantidade");


    let KaedeCoins = userdb.economia.banco;

    if (KaedeCoins <= quantidade) return interaction.reply({
      content: `<:kaede_2:1059170168770670592> você não tem tudo isso de KaedeCoins no banco...`,
      ephemeral: true
    })

    await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "economia.money": KaedeCoins + quantidade,
  "economia.banco": userdb.economia.banco - quantidade
     }
     })
    
    return interaction.reply({
      content: `<:kaede_1:1059168448946643066> | Você sacou ${client.numero(quantidade)} KaedeCoins!`
    })
  }

//=================== | DEPOSITAR || ============

    if (comando === "depositar") {
      let quantidade = interaction.options.getNumber("quantidade");

    let KaedeCoins = userdb.economia.money;

    if (KaedeCoins <= quantidade) return interaction.reply({
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
    
//================== | PAGAR | =================
    if (comando === "pagar") {
      let membro = interaction.options.getUser("membro");

     if (membro === interaction.user) return interaction.reply({
           content: `Você não pode enviar KaedeCoins pra você mesmo!`,
           ephemeral: true
         })

    let userdb_2 = await client.userdb.findOne({
         userID: membro.id
     })
      
     if(!userdb_2){
         const newuser = new client.userdb({ userID: membro.id })
         await newuser.save();
         
         userdb_2 = await client.userdb.findOne({ userID: membro.id })
     }

let quantidade = interaction.options.getNumber("quantidade");
     
if (userdb.economia.money <= quantidade) return interaction.reply({
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

//================ | BANCO | ================\
    if (comando === "banco") {
      
let user = interaction.options.getUser("membro") || interaction.user

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

//=================== | DAILY | ============
    if (comando === "daily") {
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
        content: `<:pepe_3:1039469084133302352> | Você resgatou seu daily e ganhou **\`${client.numero(moedas)}\`**  KaedeCoins!`
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