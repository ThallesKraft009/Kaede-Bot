const ms = require("ms");
const { ChannelType } = require("discord.js");
const messages = require("../../Utils/giveaway-config.js");

module.exports = {
  name: "sorteio",
  description: "Crie vários sorteios em seu servidor",
  default_member_permissions: "ManageMessages",
  type: 1,

  options: [
    {
      name: "criar",
      description: "Inicie um novo sorteio em seu servidor",
      type: 1,
      options: [
        {
          name: "chat",
          description: "O chat do sorteio",
          type: 7,
          required: true
        },{
          name: "premio",
          description: "O prêmio do sorteio",
          type: 3,
          required: true
        },{
          name: "tempo",
          description: "O tempo do sorteio, exemplo: 1m, 1h, 1d",
          type: 3,
          required: true
        },{
          name: "ganhadores",
          description: "Quantos ganhadores o sorteio vai ter",
          type: 10,
          required: false
        }
      ]
    },{
      name: "reroll",
      description: "Faça outra pessoa ganhar o sorteio",
      type: 1,
      options: [
        {
          name: "id",
          description: "O ID da mensagem do sorteio",
          type: 3,
          required: true
        }
      ]
    },{
      name: "encerrar",
      description: "Encerre o sorteio atual",
      type: 1,
      options: [
        {
          name: "id",
          description: "O ID da mensagem do sorteio",
          type: 3,
          required: true
        }
      ]
    }
  ],
  run: async(client, interaction) => {
let comando = interaction.options.getSubcommand()

    if (comando === "reroll") {

let id = interaction.options.getString("id");

      client.giveawaysManager
            .reroll(id, {
              messages: messages.messages
            })
            .then(() => {
                interaction.reply({
                  content: "Prontinho! Fiz outra pessoa ganhar o sorteio!",
                  ephemeral: true
                });
            })
            .catch((err) => {
                interaction.reply({
                  content: "Ocorreu um erro ao tentar fazer outra pessoa ganhar",
                  ephemeral: true
                })
            });
    }

    if (comando === "criar") {

let chat = interaction.options.getChannel("chat");
      if (chat.type === ChannelType.GuildText) {

let tempo = interaction.options.getString("tempo");

tempo = ms(`${tempo}`)
        if (!tempo) return interaction.reply({
          content: `Não conseguir indentificar o tempo que você colocou.`,
          ephemeral: true
        })

  let winnerCount = interaction.options.getNumber("ganhadores") || 1;

        let prize = interaction.options.getString("premio")

        interaction.reply({
          content: `O sorteio foi Iniciado no chat ${chat}!`,
          ephemeral: true
        })

client.giveawaysManager
            .start(chat, {
                duration: tempo,
                winnerCount,
                prize,
                messages: messages.messages
            }).catch(err => {
              interaction.editReply({
                content: `Ocorreu un erro ao iníciar o sorteio!`,
                ephemeral: true
              })
            })
      } else {
        interaction.reply({
          content: `Isso não é um canal de texto`,
          ephemeral: true
        })
      }
    }
  }
}