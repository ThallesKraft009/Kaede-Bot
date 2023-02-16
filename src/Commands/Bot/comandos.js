const { EmbedBuilder, 
       ActionRowBuilder,
       ButtonBuilder,
       ButtonStyle } = require("discord.js");

const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "kaede",
  description: "Comandos de informações sobre a Kaede",
  type: 1,

  options: [
    {
      name: "ping",
      description: "Veja a Latência da Kaede",
      type: 1
    }, {
      name: "info",
      description: "Veja minhas informações",
      type: 1
    }
  ],
  
  run: async(client, interaction, userdb) => {
let comando = interaction.options.getSubcommand()

///========== | INFO • COMANDO | =============\\\

    if (comando === "info"){
      
let duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");


let embed = new EmbedBuilder()
     .setAuthor({name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
     .setDescription(`Sou uma bot de configuração pra seu servidor e fui feita em [Node.js](https://nodejs.org/en/) utilizando o npm [Discord.js](https://discordjs.guide/).\n\nEstou acordada há **\`${duration}\`** em ${client.numero(client.guilds.cache.size)} servidores no total de ${client.numero(client.users.cache.size)} Usuários!\n\n**Conheça a Catzinha - Bot**\nUma bot com vários sistemas e um incrível RPG!\n\n> **Pessoas Incríveis**\n**[${client.users.cache.get(`882913524291088384`).username}](https://discord.com/users/882913524291088384)**, que é o meu criador.\n\n**Meus Protetores (a)**\n**[${client.users.cache.get(`1027276787698384958`).username}](https://discord.com/users/1027276787698384958)**\n\n**[${client.users.cache.get(`846796457377136650`).username}](https://discord.com/users/846796457377136650)**, que é minha parceira!`)
     .setColor("Random")

     let botoes = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
	.setURL("https://top.gg/bot/1038589877865959484")
	.setLabel('Me adicione')
	.setStyle(ButtonStyle.Link),
        new ButtonBuilder()
	.setURL("https://top.gg/bot/1015767574102941717")
	.setLabel('Catzinha')
	.setStyle(ButtonStyle.Link),
        new ButtonBuilder()
	.setURL("https://discord.gg/CE4UK4YMnN")
	.setLabel('Suporte')
	.setStyle(ButtonStyle.Link),
			);

    interaction.reply({
      embeds: [embed],
      components: [botoes]
    })
  }
    
///=========== | PING • COMANDO | ============\\\
    
    if (comando === "ping") {
      let gatewayPing = client.ws.ping;
      
      let apiPing = Date.now() - interaction.createdTimestamp;


      interaction.reply({
        content: `Ping?`
      }).then(async() => {
        setTimeout(() => {
          interaction.editReply({
            content: `🏓 Pong!\nGateway Ping: **\`${gatewayPing}ms\`**\nAPI Ping: **\`${apiPing}ms\`**`
          })
        }, 1000)
      })
    }
  }
}