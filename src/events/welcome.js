const client = require("../bot.js");
const { EmbedBuilder } = require("discord.js");

client.on("guildMemberAdd", async(member) => {


let svdb = await client.svdb.findOne({
         guildId: member.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: member.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: member.guild.id })

           }

  if (svdb.welcome.ativado === false) return;


let chat = member.guild.channels.cache.get(svdb.welcome.chat)
  
  /*
  welcome: {
    embed: { type: Boolean },
    title: { type: String },
    description: { type: String },
    chat: { type: String },
    ativado: { type: Boolean, default: false }
  }
    */
if (svdb.welcome.embed === true) {
  
let content1 = svdb.welcome.content;
let title = svdb.welcome.title;
let description = svdb.welcome.description;
let cor = svdb.welcome.cor;

    content1 = content1.replace(`(author)`, member.user).replace("(author_id)", member.user.id).replace("(author_tag)", member.user.tag).replace('(author_username)', member.user.username).replace("(server_name)", member.guild.name).replace("(server_members)", member.guild.members.cache.size)


title = title.replace(`(author)`, member.user).replace("(author_id)", member.user.id).replace("(author_tag)", member.user.tag).replace('(author_username)', member.user.username).replace("(server_name)", member.guild.name).replace("(server_members)", member.guild.members.cache.size)

description = description.replace(`(author)`, member.user).replace("(author_id)", member.user.id).replace("(author_tag)", member.user.tag).replace('(author_username)', member.user.username).replace("(server_name)", member.guild.name).replace("(server_members)", member.guild.members.cache.size)

chat.send({
  content: `${content1}`,
  embeds: [
    new EmbedBuilder()
    .setTitle(`${title}`)
    .setDescription(`${description}`)
    .setColor(`${cor}`) 
  ]
})

} else if (svdb.welcome.embed === false) {
  let c = svdb.welcome.description;
c = c.replace(`(author)`, member.user).replace("(author_id)", member.user.id).replace("(author_tag)", member.user.tag).replace('(author_username)', member.user.username).replace("(server_name)", member.guild.name).replace("(server_members)", member.guild.members.cache.size)


chat.send({
  content: `${c}`
})
}

})
