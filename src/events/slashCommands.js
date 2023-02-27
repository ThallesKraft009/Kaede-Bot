const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder } = require("discord.js");
const client = require("../bot.js");

client.on("interactionCreate", async (interaction) => {

  

  if (interaction.isChatInputCommand()) {


let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }

  
  const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction, userdb);
    } catch (e) {
      console.error(e)
    };
  };
});