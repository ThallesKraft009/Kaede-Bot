const { ShardingManager } = require('discord.js');
const config = require("./src/config.js");

const manager = new ShardingManager('./src/bot.js', {
  token: config.token, 
  totalShards: "auto"
});

manager.on('shardCreate', async(shard) => {
  console.log(`Cluster - 1 [${shard.id}] foi logado!`)
});

module.exports = manager;

manager.spawn();