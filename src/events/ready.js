const client = require("../bot.js");
const c = require("colors");
const { EmbedBuilder, version } = require("discord.js");

const ms = require("ms");

client.on("ready", async () => {
  console.log(c.blue(`${client.user.username} está online!`));

  const activities = [
	{ name: `Melhorando o seu Servidor! | Cluster 1 [0]`, type: 0 }, 
	{ name: `com ${client.users.cache.size} Usuários | Cluster 1 [0],`, type: 0 },
  { name: `Versão BETA | Cluster 1 [0]`, type: 0},
    {name: `Gerenciando ${client.guilds.cache.size} servidores | Cluster 1 [0]`, type: 0 }
];


const status = [
	'dnd',
	'dnd',
	'dnd',
  'dnd'
];
  
let i = 0;
setInterval(() => {
	if(i >= activities.length) i = 0
	client.user.setActivity(activities[i])
	i++;
}, 15 * 1000); // 30 Segundos

let s = 0;


setInterval(() => {
	if(s >= activities.length) s = 0
	client.user.setStatus(status[s])
	s++;
}, 30 * 1000); 



})