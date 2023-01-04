const client = require("../bot.js");
const tempo = require("ms");

const { ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");


client.on("guildMemberAdd", async(member) => {


let svdb = await client.svdb.findOne({
         guildId: member.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: member.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: member.guild.id })
      }

  if (svdb.join.cargo === "sem") return;

let cargo = member.guild.roles.cache.get(svdb.join.cargo);


  member.roles.add(cargo)


  
});