const client = require("../bot.js");
const tempo = require("ms");

const { ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, Events } = require("discord.js");


client.on(Events.MessageReactionAdd, async (reaction, user) => {

	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}

if (reaction.emoji.name === "⭐"){

  let svdb = await client.svdb.findOne({
         guildId: reaction.message.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: reaction.message.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: reaction.message.guild.id })
      }
  
  let chat = svdb.starboard.chat;
  if (chat === "n") return;
  chat = reaction.message.guild.channels.cache.get(chat);

    
const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Mensagem')
					.setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`)
        )

chat.send({
  content: `⭐ - ${reaction.message.channel}`,
  embeds: [
    new EmbedBuilder()
    .setColor("Yellow")
    .setAuthor({ name: `${reaction.message.author.tag}`, iconURL: `  ${reaction.message.author.displayAvatarURL({ format: 'png' })}`})
    .setDescription(`${reaction.message.content || "erro"}`)
  ],
  components: [row]
})
  
}
  


	
});