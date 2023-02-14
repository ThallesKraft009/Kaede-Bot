const { ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js');

const ms = require("ms");

module.exports = {
  name: "membro",
  description: "Gerenciador de membros",
  type: 1,
  options: [
    {
      name: "banir",
      description: "Dê ban em algum usuário",
      default_member_permissions: 1 << 2,
      type: 1,
      options: [
        {
          name: "usuário",
          description: "Selecione o usuário a ser banido",
          type: 6,
          required: true
        },{
          name: "motivo",
          description: "Especifique o motivo do banimento",
          type: 3,
          required: false
        }
      ]
    },{
      name: "expulsar",
      description: "Expulse algum usuário",
      default_member_permissions: 1 << 2,
      type: 1,
      options: [
        {
          name: "usuário",
          description: "Selecione o usuário a ser expulso",
          type: 6,
          required: true
        }
     ]
    }
  ],
   run: async(client, interaction) => {
let comando = interaction.options.getSubcommand()

     if (comando === "banir") {

let membro = interaction.options.getUser("usuário");
let motivo = interaction.options.getString("motivo") || "Não específicado";

membro = client.users.cache.get(`${membro.id}`);


    if (membro === interaction.user) {
      interaction.reply({
        content: `:x: | Você não pode banir você mesmo!`,
        ephemeral: true
      })
    } else {

      

 let botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`banir_${interaction.user.id}`)
					.setLabel('Banir')
					.setStyle(ButtonStyle.Success),
     new ButtonBuilder()
   .setCustomId(`cancelarBan_${interaction.user.id}`)
   .setLabel("Cancelar")
   .setStyle(ButtonStyle.Danger)
  )
      
      interaction.reply({
        content: `Você quer mesmo banir **\`${membro.tag}\`**?`,
        components: [botoes]
      })

const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: ms("5m")});

collector.on('collect', i => {

  if (i.customId === `banir_${interaction.user.id}`) {

    interaction.editReply({
      content: `🔨 | **\`${membro.tag}\`** foi banido pelo motivo: **\`${motivo}\`**.`,
      components: []
    })

    motivo = `Banido por ${interaction.user.tag} | ${motivo}`;

  membro.ban({ reason: `${motivo}` })
    
  }

  if (i.customId === `cancelarBan_${interaction.user.id}`) {

    interaction.editReply({
      content: `❌ | O banimento de **\`${membro.tag}\`** foi cancelado.`,
      components: []
    }).then(a => {
      setTimeout(() => {
        a.delete()
      }, 10000)
    })
  }
  
});

collector.on('end', collected => {

  interaction.editReply({
    content: `O tempo pra selecionar o botão expirou.`,
    components: []
  })
});
    }


     }
   }
}