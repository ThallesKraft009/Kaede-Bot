const client = require("../bot.js");
const { EmbedBuilder } = require("discord.js");

client.on("guildCreate", async(servidor) => {

    let chat = client.channels.cache.get("1075510255422816327")

let dono = servidor.owner_id;
  dono = client.users.cache.get(`${dono}`)

  let description = servidor.description;
  
  let embed = new EmbedBuilder()
  .setAuthor({ name: `${servidor.name}`, iconURL: `${servidor.iconURL()}` })
  .setDescription(`${description || ""}`)
  .addFields({
    name: "Dono(a)", value: `${dono.tag}`,
  },{
    name: "Total de Membros", value: `${servidor.members.cache.size}`,
  },{
    name: "Total de meus servidores", value: `${client.guilds.cache.size}`,
  },{
    name: "Total de usuários",
    value: `${client.users.cache.size}`
  })
  .setColor("Random")
  .setTimestamp()
  .setFooster({ text: `ID do servidor: ${servidor.id}` })

  
  chat.send({
    embeds: [embed]
  })

  require("../handlers/slash_handler.js")(client);

})