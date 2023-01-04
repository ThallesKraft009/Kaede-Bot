const { Client } = require("discord.js");
const fs = require("fs");
/**
 *
 * @param {Client} client
 */

module.exports = (client) => {
  try {
    fs.readdirSync("./src/functions/").forEach((file) => {
      const events = fs
        .readdirSync("./src/functions/")
        .filter((file) => file.endsWith(".js"));
      for (let file of events) {
        let pull = require(`../functions/${file}`)(client);
        
      }
    });
    console.log("Funções logados")
    
  } catch (e) {
    console.log(e);
  }
};