const client = require("../bot.js");
const tempo = require("ms");

const { ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");


client.on('messageDelete', async (msg) => {
  if(msg.author.bot) return;
  let servidor = msg.guild;
  let user = msg.author;

  let svdb = await client.svdb.findOne({
         guildId: servidor.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: servidor.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: servidor.id })
    }


let id = svdb.logs.msg;
  if (id === "sem") return;

  let chat = msg.guild.channels.cache.get(id);

  chat.send({
    embeds: [
      new EmbedBuilder()
         .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`})
         .addFields(
          {
             name: `Mensagem Deletada:`,
             value: `\`\`\`\n${msg}\n\`\`\``
          },{
             name: `Canal de texto:`,
             value: `${msg.channel}`
          }
         )
         .setColor("Blue")
    ]
  })

  })


client.on('messageUpdate', async (oldMessage, newMessage) => { 
   if (!oldMessage.author) return;
  if(newMessage.author.bot) return;


let msg = newMessage;

  let servidor = msg.guild;
  let user = msg.author;

  let svdb = await client.svdb.findOne({
         guildId: servidor.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: servidor.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: servidor.id })
    }


let id = svdb.logs.msg;
  if (id === "sem") return;

  let chat = msg.guild.channels.cache.get(id);

  chat.send({
    embeds: [
      new EmbedBuilder()
         .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`})
         .addFields(
          {
             name: `Mensagem Antiga:`,
             value: `\`\`\`\n${oldMessage}\n\`\`\``
          },{
             name: `Nova Mensagem:`,
             value: `\`\`\`\n${msg}\n\`\`\``
          },{
             name: `Canal de texto:`,
             value: `${msg.channel}`
          }
         )
         .setColor("Blue")
    ]
  })

    })