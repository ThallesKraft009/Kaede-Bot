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
})