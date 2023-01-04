module.exports = async(client) => {

  client.welcomemsg = async function(interaction){
  
const tempo = require("ms");
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, StringSelectMenuBuilder } = require("discord.js");


if (interaction.customId === `cor_${interaction.user.id}`){

await interaction.deferUpdate()

  let cores = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`cores_w_${interaction.user.id}`)
					.setPlaceholder('Lista de Cores')
					.addOptions(
            {
              label: 'Cor aleatório',
              description: "Clique pra selecionar",
              value: "random",
            },
            {
							label: 'Azul',
							description: 'Clique pra selecionar',
							value: 'azul',
						},
						{
							label: 'Vermelho',
							description: 'Clique pra selecionar',
							value: 'vermelho',
						},{ 
              label: 'Verde',
							description: 'Clique pra selecionar',
							value: 'verde',
            },{
              label: 'Amarelo',
							description: 'Clique pra selecionar',
							value: 'amarelo',
            }
					),
			);

  interaction.editReply({
    content: `Escolha a cor da embed`,
    embeds: [],
    components: [cores]
  })

  
}
  
if (interaction.customId === `e_welcome_${interaction.user.id}`){

let modal = new ModalBuilder()
			.setCustomId(`e_w_m_${interaction.user.id}`)
			.setTitle(`Configuração de BoasVindas`);

let um = new TextInputBuilder()
			.setCustomId('content')
			.setLabel("Mensagem fora da Embed")
			.setStyle(TextInputStyle.Paragraph)
      .setRequired(true);


let dois = new TextInputBuilder()
			.setCustomId('title')
			.setLabel("Titulo da Embed")
			.setStyle(TextInputStyle.Paragraph)
      .setRequired(false);

  let trez = new TextInputBuilder()
			.setCustomId('description')
			.setLabel("Descrição da Embed")
			.setStyle(TextInputStyle.Paragraph)
      .setRequired(true);



um = new ActionRowBuilder().addComponents(um);
dois = new ActionRowBuilder().addComponents(dois);
trez = new ActionRowBuilder().addComponents(trez);




modal.addComponents(um, dois, trez)

    
await interaction.showModal(modal);
  
  
}


  
  if (interaction.customId === `welcome_c_test_${interaction.user.id}`){

let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }


      /*
  welcome: {
    embed: { type: Boolean },
    title: { type: String },
    description: { type: String },
    chat: { type: String },
    ativado: { type: Boolean, default: false }
  }
    */

    let msg = svdb.welcome.description;
    msg = msg.replace(`(author)`, interaction.user).replace("(author_id)", interaction.user.id).replace("(author_tag)", interaction.user.tag).replace('(author_username)', interaction.user.username).replace("(server_name)", interaction.guild.name).replace("(server_members)", interaction.guild.members.cache.size)


    let chat = svdb.welcome.chat;
 chat = interaction.guild.channels.cache.get(chat)
    
    chat.send({
      content: `${msg}`
    })

    interaction.reply({
      content: `Msg enviada!`
    })
    
  }

  if (interaction.customId === `c_welcome_${interaction.user.id}`){


let modal = new ModalBuilder()
			.setCustomId(`c_w_m_${interaction.user.id}`)
			.setTitle(`Configuração de BoasVindas`);

let um = new TextInputBuilder()
			.setCustomId('msg')
			.setLabel("Escreva a sua mensagem de boas vindas")
			.setStyle(TextInputStyle.Paragraph)
      .setRequired(true);



const msgum = new ActionRowBuilder().addComponents(um);
		
modal.addComponents(msgum)

    
await interaction.showModal(modal);



  }


if (interaction.customId === `welcome_${interaction.user.id}`){


    await interaction.deferUpdate()


  interaction.editReply({
    content: `${interaction.user}`,
    embeds: [
      new EmbedBuilder()
      .setTitle("Configuração da mensagem de Boas Vindas")
      .setDescription(`Escolha qual o tipo de mensagem você quer fazer!`)
      .addFields(
        {
          name: `Variaveis de Membros:`,
          value: `(author), (author_id), (author_tag), (author_username), (author_avatar)`
        },{
          name: `Variaveis do Servidor:`,
          value: `(server_name), (server_members), (server_avatar)`
        }
      )
      .setColor('Yellow')
    ],
    components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`e_welcome_${interaction.user.id}`)
					.setLabel('Em Embed')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
new ButtonBuilder()
					.setCustomId(`c_welcome_${interaction.user.id}`)
					.setLabel('Normal')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)

    )
    ]
  })
}
  }


}