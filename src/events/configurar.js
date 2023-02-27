const client = require("../bot.js");
const tempo = require("ms");

const { ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");




client.on('interactionCreate', async (interaction) => {

	if (!interaction.isStringSelectMenu()) return;


if (interaction.customId === `loja_${interaction.user.id}`){

  await interaction.deferUpdate()

  let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }
  
  let valor = interaction.values[0];
  

  if (valor === "banner") {

    let { banners } = client.banners;
    
    let botoes = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
        .setCustomId(`voltar_banner_1_${interaction.user.id}`)
        .setLabel("Voltar")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(false),
        new ButtonBuilder()
        .setCustomId(`banner1_${interaction.user.id}`)
        .setLabel("Comprar")
        .setStyle(ButtonStyle.Primary),
new ButtonBuilder()
        .setCustomId(`proximo_banner_1_${interaction.user.id}`)
        .setLabel("Próximo")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(false)
      );

    let author_1 = banners[0].author_id;
    author_1 = client.users.cache.get(author_1);



    let pg_1 = new EmbedBuilder()
    .setTitle(`${banners[0].nome}`)
    .setDescription(`Preço: ${client.numero(Number(`${banners[0].preço}`))}`)
    .setImage(`${banners[0].link_url}`)
    .setColor("Random")
    .setFooter({ text: `Feito por ${author_1.username}`, iconURL: `${author_1.displayAvatarURL()}`})
    .setTimestamp()

    let author_2 = banners[1].author_id;
    author_2 = client.users.cache.get(author_2);



    let pg_2 = new EmbedBuilder()
    .setTitle(`${banners[1].nome}`)
    .setDescription(`Preço: ${client.numero(Number(`${banners[1].preço}`))}`)
    .setImage(`${banners[1].link_url}`)
    .setColor("Random")
    .setFooter({ text: `Feito por ${author_2.username}`, iconURL: `${author_2.displayAvatarURL()}`})
    .setTimestamp()

    let author_3 = banners[1].author_id;
    author_3 = client.users.cache.get(author_2);



    let pg_3 = new EmbedBuilder()
    .setTitle(`${banners[2].nome}`)
    .setDescription(`Preço: ${client.numero(Number(`${banners[2].preço}`))}`)
    .setImage(`${banners[2].link_url}`)
    .setColor("Random")
    .setFooter({ text: `Feito por ${author_3.username}`, iconURL: `${author_3.displayAvatarURL()}`})
    .setTimestamp()

    let embeds = [pg_1, pg_2, pg_3]
    
     await interaction.editReply({
       embeds: [embeds[0]],
       components: [botoes]
     })

 

  const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });


collector.on('collect', async(int) => {

let i = 0;

    await int.deferUpdate()
	
if (int.customId === `proximo_banner_1_${int.user.id}`){

  i = i + 1;

  if (i === 3) i = 0;

  await int.editReply({
    embeds: [embeds[i]]
  })
  
} else if (int.customId === `voltar_banner_1_${int.user.id}`){

  i = i - 1;

  if (i === -1) i = 3;

  await int.editReply({
    embeds: [embeds[i]]
  })
  
}

});
    
  }
}

  
  if (interaction.customId === `cores_w_${interaction.user.id}`){

  await interaction.deferUpdate()
    
let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }

let content1 = svdb.welcome.content;
let title = svdb.welcome.title;
let description = svdb.welcome.description;

    content1 = content1.replace(`(author)`, interaction.user).replace("(author_id)", interaction.user.id).replace("(author_tag)", interaction.user.tag).replace('(author_username)', interaction.user.username).replace("(server_name)", interaction.guild.name).replace("(server_members)", interaction.guild.members.cache.size)


title = title.replace(`(author)`, interaction.user).replace("(author_id)", interaction.user.id).replace("(author_tag)", interaction.user.tag).replace('(author_username)', interaction.user.username).replace("(server_name)", interaction.guild.name).replace("(server_members)", interaction.guild.members.cache.size)

description = description.replace(`(author)`, interaction.user).replace("(author_id)", interaction.user.id).replace("(author_tag)", interaction.user.tag).replace('(author_username)', interaction.user.username).replace("(server_name)", interaction.guild.name).replace("(server_members)", interaction.guild.members.cache.size)


    let opcao = interaction.values[0];

    if (opcao === "azul"){
    
interaction.editReply({
  content: `${content1}`,
  embeds: [
    new EmbedBuilder()
    .setTitle(`${title}`)
    .setDescription(`${description}`)
    .setColor("Blue")
  ],
  components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`cor_${interaction.user.id}`)
					.setLabel('Alterar cor da Embed')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)

    )
    ]
})

      await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "welcome.cor": "Blue"
     }
     })


}


if (opcao === "vermelho"){
    
interaction.editReply({
  content: `${content1}`,
  embeds: [
    new EmbedBuilder()
    .setTitle(`${title}`)
    .setDescription(`${description}`)
    .setColor("Red")
  ],
  components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`cor_${interaction.user.id}`)
					.setLabel('Alterar cor da Embed')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)

    )
    ]
})

      await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "welcome.cor": "Red"
     }
     })


}
  



if (opcao === "verde"){
    
interaction.editReply({
  content: `${content1}`,
  embeds: [
    new EmbedBuilder()
    .setTitle(`${title}`)
    .setDescription(`${description}`)
    .setColor("Green")
  ],
  components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`cor_${interaction.user.id}`)
					.setLabel('Alterar cor da Embed')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)

    )
    ]
})

      await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "welcome.cor": "Green"
     }
     })


}



if (opcao === "amarelo"){
    
interaction.editReply({
  content: `${content1}`,
  embeds: [
    new EmbedBuilder()
    .setTitle(`${title}`)
    .setDescription(`${description}`)
    .setColor("Yellow")
  ],
  components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`cor_${interaction.user.id}`)
					.setLabel('Alterar cor da Embed')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)

    )
    ]
})

      await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "welcome.cor": "Yellow"
     }
     })


}



if (opcao === "random"){
    
interaction.editReply({
  content: `${content1}`,
  embeds: [
    new EmbedBuilder()
    .setTitle(`${title}`)
    .setDescription(`${description}`)
    .setColor("Random")
  ],
components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`cor_${interaction.user.id}`)
					.setLabel('Alterar cor da Embed')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)

    )
    ]
})

      await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "welcome.cor": "Random"
     }
     })


}
    
  }
})







client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;

  client.welcomemsg(interaction);

  if (interaction.customId === `sobremim_${interaction.user.id}`) {
    let membro = interaction.user
    
let userdb = await client.userdb.findOne({
         userID: membro.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: membro.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: membro.id })
          }

let sobremim_antigo = userdb.perfil.sobremim;
    if (sobremim_antigo === "Use /perfil sobremim pra alterar seu sobremim") sobremim_antigo = `Digita seu sobremim aqui`
    
    let modal = new ModalBuilder()
			.setCustomId(`sobremim_${interaction.user.id}`)
.setTitle('Editar Perfil');

    let sobremim = new TextInputBuilder()
      .setCustomId("1")
      .setLabel("Escreva seu sobremim")
    	.setStyle(TextInputStyle.Short)
      .setMaxLength(60)
      .setMinLength(5)
    	.setPlaceholder(`${sobremim_antigo}`)
    
    let sobremim_ = new ActionRowBuilder()
      .addComponents(sobremim)

   modal.addComponents(sobremim_);

     await interaction.showModal(modal);
  }
  
  //==========================================
  if (interaction.customId === `verificar_${interaction.guild.id}`){

let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }

let cargo = svdb.verificacao.cargo;
cargo = interaction.guild.roles.cache.get(cargo);


    interaction.reply({
    content: `Obrigado por fazer a verificação!`,
    ephemeral: true
    })

let user = interaction.user.id;
  user = interaction.guild.members.cache.get(user)

    user.roles.add(cargo)
    
  }

  if (interaction.customId === `verificar_${interaction.user.id}`){



    await interaction.deferUpdate()

  interaction.editReply({
    content: `<:emoji_5:1058523001278177340> | ${interaction.user} mencione um canal de texto pra ser configurado..`,
    embeds: [],
    components: []
  })

  
let collector = interaction.channel.createMessageCollector({ time: tempo("5m"), max: 1 });

collector.on('collect', m => {

if (m.author.id !== interaction.user.id) return;
  
client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${m.id}`, cache: false, force: true }).then(async(msg) => {

let chat = msg.mentions.channels.first();

 if (!chat) return interaction.editReply({
   content: `Isso não é um canal de texto.`,
   components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
 })

chat = client.channels.cache.get(chat.id);


interaction.editReply({
  content: `<:emoji_5:1058523001278177340> | ${interaction.user} mencione um cargo...`,
  embeds: [],
  components: []
})
    

  
let collectorr = interaction.channel.createMessageCollector({ time: tempo("5m"), max: 1 });
  
collectorr.on('collect', msgg => {

  if (msgg.author.id !== interaction.user.id) return;

client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${msgg.id}`, cache: false, force: true }).then(async(cargom) => {

    if (!cargom.mentions.roles.first()) return interaction.editReply({
    content: `Isso não é um cargo.`,
    components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
  })

  const cargo = interaction.guild.roles.cache.get(cargom.mentions.roles.first().id)

  
let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }
  
  await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "verificacao.cargo": cargo.id
     }
     })


interaction.editReply({
  content: `O chat ${chat} foi configurado pra verificação.`,
  components: [
    new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
  ]
})

      let botao = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`verificar_${interaction.guild.id}`)
                    .setLabel('Verificação')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("✅")
                    .setDisabled(false)

            )

  chat.send({
    embeds: [
      new EmbedBuilder()
            .setAuthor({name: `Sistema de Verificação`, iconURL:  interaction.guild.iconURL({dynamic:true})})
            .setDescription(`Para você ser verificado, clique no botão abaixo!`)
            .setColor("Green")
          ],
          components: [botao]
  })
})
                     })
})
})

  
              }

  if (interaction.customId === `starboard_${interaction.user.id}`){


await interaction.deferUpdate()


  interaction.editReply({
    content: `<:emoji_5:1058523001278177340> | ${interaction.user} mencione um canal de texto pra ser configurado..`,
    embeds: [],
    components: []
  })



  
let collector = interaction.channel.createMessageCollector({ time: tempo("5m"), max: 1 });

collector.on('collect', m => {

  if (m.author.id !== interaction.user.id) return;

client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${m.id}`, cache: false, force: true }).then(async(msg) => {

let chat = msg.mentions.channels.first();

 if (!chat) return interaction.editReply({
   content: `Isso não é um canal de texto.`,
   components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
 })

chat = client.channels.cache.get(chat.id);

  
let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }
  
  await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "starboard.chat": chat.id
     }
     })


interaction.editReply({
  content: `O chat ${chat} foi configurado pra starboard.`,
  components: [
    new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
  ]
})

  
      })
   })
}


  if (interaction.customId === `automod_${interaction.user.id}`){

  await interaction.deferUpdate()

let botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`msg_${interaction.user.id}`)
					.setLabel('Logs de Msg')
					.setStyle(ButtonStyle.Secondary),
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
        )


interaction.editReply({
  content: `${interaction.user}`,
  embeds: [
    new EmbedBuilder()
    .setTitle("Configuração de Logs")
    .setDescription(`Qual sistema você quer configurar?\nClique no botão.`)
    .setThumbnail("https://media.discordapp.net/attachments/1057275542509985802/1058525327049101372/emoji_5.png")
    .setColor("Green")
  ],
  components: [botoes]
})


  }

  if (interaction.customId === `msg_${interaction.user.id}`){
  
    await interaction.deferUpdate()

  interaction.editReply({
    content: `<:emoji_5:1058523001278177340> | ${interaction.user} mencione um canal de texto pra ser configurado..`,
    embeds: [],
    components: []
  })

  
let collector = interaction.channel.createMessageCollector({ time: tempo("5m"), max: 1 });

collector.on('collect', m => {

if (m.author.id !== interaction.user.id) return;
  
client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${m.id}`, cache: false, force: true }).then(async(msg) => {

let chat = msg.mentions.channels.first();

 if (!chat) return interaction.editReply({
   content: `Isso não é um canal de texto.`,
   components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
 })

chat = client.channels.cache.get(chat.id);



let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }
  
  await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "logs.msg": chat.id
     }
     })


interaction.editReply({
  content: `O chat ${chat} foi configurado pra logs de msg.`,
  components: [
    new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
  ]
})
  
})
})
  }

if (interaction.customId === `autorole_${interaction.user.id}`){

      await interaction.deferUpdate()

interaction.editReply({
  content: `<:emoji_5:1058523001278177340> | ${interaction.user} mencione um cargo pra ser adicionado quando um novo membro entrar...`,
  embeds: [],
  components: []
})
    

  
let collector = interaction.channel.createMessageCollector({ time: tempo("5m"), max: 1 });
  
collector.on('collect', msg => {

  if (msg.author.id !== interaction.user.id) return;

client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${msg.id}`, cache: false, force: true }).then(async(cargom) => {

  if (!cargom.mentions.roles.first()) return interaction.editReply({
    content: `Isso não é um cargo.`,
    components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
  })

  let cargo = interaction.guild.roles.cache.get(cargom.mentions.roles.first().id)


let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }
  
  await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "join.cargo": cargo.id
     }
     })

interaction.editReply({
  content: `O cargo ${cargo} foi configurado no autorole.`,
  components: [
    new ActionRowBuilder().addComponents(
    new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
  ]
})

  
  })
})
    
                    }




  
if (interaction.customId === `ticketF_${interaction.channel.id}`){


interaction.reply({
  content: `Fechando ticket em 5 segundos...`
})

  setTimeout(() => {
    interaction.channel.delete();
  }, 5000)
  
}

if (interaction.customId === `ticket_${interaction.guild.id}`){

let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }
  
  const cargo = interaction.guild.roles.cache.get(svdb.ticket.cargo);

interaction.guild.channels.create({
    name: `ticket_${interaction.user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel]
      },{
        id: interaction.user.id,
        allow: [PermissionsBitField.Flags.ViewChannel]
      },{
        id: cargo.id,
        allow: [PermissionsBitField.Flags.ViewChannel]
      }
    ]
}).then(async(chat) => {

interaction.reply({
  content: `Seu ticket foi criado em: ${chat}`,
  ephemeral: true
})

  

chat.send({
  content: `Bem vindo, ${interaction.user}! || ${cargo} ||`,
  embeds: [
    new EmbedBuilder ()
    .setDescription(`Obrigado por utilizar o meu sistema!\n`)
    .setColor("Yellow")
  ],
  components: [
     new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`ticketF_${chat.id}`)
					.setLabel('Fechar Ticket')
          .setEmoji("🔒")
					.setStyle(ButtonStyle.Secondary)
)
  ]
})
  
})
  
}

if (interaction.customId === `enviar_${interaction.user.id}`){


let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }


  
let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`ticket_${interaction.guild.id}`)
					.setLabel('Abrir Ticket')
          .setEmoji("📩")
					.setStyle(ButtonStyle.Secondary)
)
  
  client.channels.cache.get(`${svdb.ticket.chat}`).send({
    embeds: [
      new EmbedBuilder()
      .setTitle(`${svdb.ticket.title}`)
      .setDescription(`${svdb.ticket.description}`)
      .setColor("Random")
    ],
    components: [botao]
  })
  

  interaction.reply({
    content: `Ticket enviado!`
  })

}

  
if (interaction.customId === `ticket_${interaction.user.id}`){


const modal = new ModalBuilder()
			.setCustomId(`t_${interaction.user.id}`)
			.setTitle(`Configuração de Ticket`);

const titleO = new TextInputBuilder()
			.setCustomId('titulo')
			.setLabel("Titulo da Embed")
			.setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

const descriptionO = new TextInputBuilder()
			.setCustomId('descrição')
			.setLabel("Descrição da Embed")
			.setStyle(TextInputStyle.Paragraph)
      .setRequired(true);


const firstActionRow = new ActionRowBuilder().addComponents(titleO);
		const secondActionRow = new ActionRowBuilder().addComponents(descriptionO);

modal.addComponents(firstActionRow, secondActionRow);
  
await interaction.showModal(modal);
  
}


  
})


  client.on("interactionCreate", async(interaction) => {
	if (!interaction.isModalSubmit()) return;


if (interaction.customId === `sobremim_${interaction.user.id}`) {

  let membro = interaction.user;

  let userdb = await client.userdb.findOne({
         userID: membro.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: membro.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: membro.id })
     }

let sobremim = interaction.fields.getTextInputValue('1')

           await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "perfil.sobremim": sobremim
     }
     })

  interaction.reply({
    content: `<:kaede_3:1059170087141114016> | Sobremim alterado pra: **\`${sobremim}\`**`,
    ephemeral: true
  })
}

    
if (interaction.customId === `c_w_m_${interaction.user.id}`){


  let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }


    await interaction.deferUpdate()

interaction.editReply({
    content: `<:emoji_5:1058523001278177340> | ${interaction.user} mencione um canal de texto pra ser configurado..`,
    embeds: [],
    components: []
  })


    
  
let collector = interaction.channel.createMessageCollector({ time: tempo("5m"), max: 1 });

collector.on('collect', m => {

  if (m.author.id !== interaction.user.id) return;

client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${m.id}`, cache: false, force: true }).then(async(msg) => {

let chat = msg.mentions.channels.first();

 if (!chat) return interaction.editReply({
   content: `Isso não é um canal de texto.`,
   components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
 })

chat = client.channels.cache.get(chat.id);

  let mssg = interaction.fields.getTextInputValue('msg');
  
await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "welcome.embed": false,
         "welcome.description": mssg,
         "welcome.chat": chat.id,
         "welcome.ativado": true
     }
     })


  
mssg = mssg.replace(`(author)`, interaction.user).replace("(author_id)", interaction.user.id).replace("(author_tag)", interaction.user.tag).replace('(author_username)', interaction.user.username).replace("(server_name)", interaction.guild.name).replace("(server_members)", interaction.guild.members.cache.size)



  interaction.editReply({
    content: `${mssg}`,
    embeds: [],
    components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`welcome_c_test_${interaction.user.id}`)
					.setLabel('Testar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
        new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
  }). catch(err => console.log(err))
  
})
  })
    }


                                                                                                                              
if (interaction.customId === `e_w_m_${interaction.user.id}`){

let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
      }

let content1 = interaction.fields.getTextInputValue("content");

  if (content1 === null) content1 = `(author)`;


let title = interaction.fields.getTextInputValue("title");
  

let description = interaction.fields.getTextInputValue("description");





  await interaction.deferUpdate()

interaction.editReply({
    content: `<:emoji_5:1058523001278177340> | ${interaction.user} mencione um canal de texto pra ser configurado..`,
    embeds: [],
    components: []
  })


  
let collector = interaction.channel.createMessageCollector({  time: tempo("5m"), max: 1 });
  
collector.on('collect', m => {

  if (m.author.id !== interaction.user.id) return;

client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${m.id}`, cache: false, force: true }).then(async(msg) => {

let chat = msg.mentions.channels.first();


   if (!chat) return interaction.editReply({
   content: `Isso não é um canal de texto.`,
   components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
 })

chat = client.channels.cache.get(chat.id);


await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "welcome.embed": true,
         "welcome.content": content1,
         "welcome.title": title,
         "welcome.description": description,
         "welcome.chat": chat.id,
         "welcome.ativado": true
     }
     })

content1 = content1.replace(`(author)`, interaction.user).replace("(author_id)", interaction.user.id).replace("(author_tag)", interaction.user.tag).replace('(author_username)', interaction.user.username).replace("(server_name)", interaction.guild.name).replace("(server_members)", interaction.guild.members.cache.size)


title = title.replace(`(author)`, interaction.user).replace("(author_id)", interaction.user.id).replace("(author_tag)", interaction.user.tag).replace('(author_username)', interaction.user.username).replace("(server_name)", interaction.guild.name).replace("(server_members)", interaction.guild.members.cache.size)


  description = description.replace(`(author)`, interaction.user).replace("(author_id)", interaction.user.id).replace("(author_tag)", interaction.user.tag).replace('(author_username)', interaction.user.username).replace("(server_name)", interaction.guild.name).replace("(server_members)", interaction.guild.members.cache.size)



  let cor = svdb.welcome.cor;

let welcome = new EmbedBuilder()
  .setDescription(`${description}`)

  if (title === null) {
    welcome = welcome;
  } else {
    title = welcome.setTitle(`${title}`)
  }



  welcome = welcome.setColor(`${cor}`)

  
  interaction.editReply({
    content: `${content1}`,
    embeds: [welcome],
    components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`cor_${interaction.user.id}`)
					.setLabel('Alterar cor da Embed')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)

    )
    ]
  })
  
   })
})

}

    
    if (interaction.customId === `t_${interaction.user.id}`){

let title = interaction.fields.getTextInputValue('titulo');

  let description = interaction.fields.getTextInputValue('descrição');


      await interaction.deferUpdate()

  interaction.editReply({
    content: `<:emoji_5:1058523001278177340> | ${interaction.user} Mencione um canal de texto pra ser configurado o sistema...`,
    embeds: [],
    components: []
  })

      
  
const collector = interaction.channel.createMessageCollector({ time: tempo("5m"), max: 1 });

collector.on('collect', m => {

if (m.author.id !== interaction.user.id) return;

client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${m.id}`, cache: false, force: true }).then(msg => {

let chat = msg.mentions.channels.first();

 if (!chat) return interaction.editReply({
   content: `Isso não é um canal de texto.`,
   components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
 })

chat = client.channels.cache.get(chat.id);

  
interaction.editReply({
  content: `<:emoji_5:1058523001278177340> | ${interaction.user} Mencione um cargo que irá ter acesso a todos os tickets..`
})

  
  
const collector2 = interaction.channel.createMessageCollector({  time: tempo("5m"), max: 1 });
  
collector2.on('collect', mm => {

  if (mm.author.id !== interaction.user.id) return;

                   client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${mm.id}`, cache: false, force: true }).then(async(msg2) => {


  if (!msg2.mentions.roles.first()) return interaction.editReply({
    content: `Isso não é um cargo.`,
    components: [
      new ActionRowBuilder().addComponents(
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )
    ]
  })


  let botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`ticket_${interaction.guild.id}`)
					.setLabel('Abrir Ticket')
          .setEmoji("📩")
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
          new ButtonBuilder()
					.setCustomId(`enviar_${interaction.user.id}`)
					.setLabel('Enviar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
    )

let svdb = await client.svdb.findOne({
         guildId: interaction.guild.id
     }) 

      if(!svdb){
         const newuser = new client.svdb({ guildId: interaction.guild.id })
        await  newuser.save();
         
         svdb = client.svdb.findOne({ guildId: interaction.guild.id })
}


  
/*
ticket: {
    chat: { type: String },
    title: { type: String },
    description: { type: String },
    cargo: { type: String }
  }
*/


await client.svdb.updateOne({
         guildId: interaction.guild.id
     }, { $set: {
         "ticket.chat": chat.id,
         "ticket.title": title,
         "ticket.description": description,
         "ticket.cargo": msg2.mentions.roles.first().id
     }
     })

                     
interaction.editReply({
  content: `${interaction.user}`,
  embeds: [
    new EmbedBuilder()
    .setTitle(`${title}`)
    .setDescription(`${description}`)
    .setColor("Blue")
  ],
  components: [botoes]
})
                   })
})
  
      })
  
});

      
    }

  })