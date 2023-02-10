const client = require("../bot.js");

const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require("discord.js");

client.on("messageCreate", async(msg) => {
  
  if (msg.content === `${client.user}`) return msg.reply({
    content: `<:kaede_3:1059170087141114016> | ${msg.author} meus comandos são em slashCommands (comandos com /)!`,
    embeds: [
      new EmbedBuilder()
      .setAuthor(
        { name: `${msg.author.tag}`, iconURL: `${msg.author.displayAvatarURL()}`}
        )
      .addFields({
        name: `Adminstração`,
        value: `\`/configurar\``
      },{
        name: `Economia`,
        value: `\`/daily\`, \`/banco\`, \`/roubar\`, \`/apostar\`, \`/pagar\`, \`/sacar\`, \`/depositar\`, \`/kaedecoins-rank\``
      },{
        name: `Bot`,
        value: `\`/ping\`, \`/kaede-info\``
      })
      .setColor("Yellow")
    ]
  })






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