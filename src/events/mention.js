const client = require("../bot.js");

const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");

const ms = require("ms");

client.on("messageCreate", async(msg) => {

  let embed = new EmbedBuilder()
  .setAuthor({ name: `${msg.author.tag}`, iconURL: `${msg.author.displayAvatarURL()}`})
  .setDescription(`Sou uma bot de configuração pra seu servidor e fui feita em [Node.js](https://nodejs.org/en/) utilizando o npm [Discord.js](https://discordjs.guide/).\nEstou em ${client.numero(client.guilds.cache.size)} servidores no total de ${client.numero(client.users.cache.size)} Usuários!`)
  .setColor("Random")
  .setTimestamp()
  .setFooter({ text: `Veja minha lista de comandos interagindo com os botões!` })

let menu = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
        .setCustomId("adm")
        .setLabel("Administração")
        .setStyle(ButtonStyle.Secondary),
new ButtonBuilder()
        .setCustomId("economia")
        .setLabel("Economia")
        .setStyle(ButtonStyle.Secondary),
new ButtonBuilder()
        .setCustomId("util")
        .setLabel("Utilidades")
        .setStyle(ButtonStyle.Secondary)
      );
  
  if (msg.content === `${client.user}`) { 
    let texto = await msg.reply({
    content: `<:kaede_3:1059170087141114016> | ${msg.author}`,
    embeds: [embed],
    components: [menu]
  })

    const collector = msg.channel.createMessageComponentCollector({ time: ms("1h") });

collector.on('collect', async i => {

  if (i.user.id === msg.author.id) {

     await i.deferUpdate();

      if (i.customId === "adm") {
 
    let pg_adm = new EmbedBuilder()
    .setAuthor({ name: `${msg.author.tag}`, iconURL: `${msg.author.displayAvatarURL()}`})
    .addFields({
      name: `/configurar`,
      value: `Configure meus sistemas em seu servidor`
    },{
      name: `/chat trancar`,
      value: `Tranque o canal de texto`
    },{
      name: `/chat abrir`,
      value: `Abra o canal de texto`
    })

      }
    
  } else {

    await i.reply({
      content: `Espere um minuto.... você não é ${msg.author}! Sai daqui!`,
      ephemeral: true
    })
  }
});

}




  if (msg.content === `${client.user} código`) {

     return msg.reply({
       content: `\`01001101 01100101 01101110 01100011 01101001 01101111 01101110 01100101 00100000 01100101 00100000 01100110 01100001 01101100 01100101 00100000 00100010 01110011 01100101 01100111 01110010 01100101 01100100 01101111 00100010\``
     }).then(a => {
       setTimeout(() => {
         a.delete()
       }, 10000)
     })
  }


if (msg.content === `${client.user} segredo`) {

    return msg.reply({
      content: `\`PEnXaG2Hr84q6RVJ-f2noaSH_uUrOEzKUqty2l_KKfg\``
    }).then(a => {
      setTimeout (() => {
        a.delete()
      }, 10000)
    })
   }


  if (msg.content === `${client.user} thalleskraft`){

    msg.reply({
      content: `Veja sua DM.`
    })

    msg.author.send({
      content: `Descubra todos os segredos que eu tenho aqui!\n https://youtu.be/TGQo2SyDWW0`
    })
  }



})