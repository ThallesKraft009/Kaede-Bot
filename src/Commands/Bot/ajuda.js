const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "ajuda",
  description: "Veja minha lista de comandos",
  type: 1,
  run: async(client, interaction) => {

    let cmds = {};

const fs = require('fs');

function getId(nomeObjeto, nomeArquivo) {
  return new Promise((resolve, reject) => {
    // Lendo o conteúdo do arquivo JSON
    fs.readFile(nomeArquivo, 'utf8', (err, data) => {
      if (err) {
        return reject('Erro ao ler o arquivo JSON: ' + err);
      }

      try {
        // Analisando os dados JSON para um objeto JavaScript
        const dados = JSON.parse(data);

        // Procurando o objeto com o nome fornecido
        const objetoEncontrado = dados.find(item => item.name === nomeObjeto);

        if (objetoEncontrado) {
          // Retornando o valor "id" do objeto encontrado
          resolve(objetoEncontrado.id);
        } else {
          reject('Objeto com nome "' + nomeObjeto + '" não encontrado.');
        }
      } catch (parseError) {
        reject('Erro ao analisar o JSON: ' + parseError);
      }
    });
  });
}

async function obterIds() {
  try {

    cmds.kaede = await getId("kaede", "src/commands.json");
    cmds.kaedecoins = await getId("kaedecoins", "src/commands.json");
    cmds.chat = await getId("chat", "src/commands.json");
    cmds.perfil = await getId("perfil", "src/commands.json");
    cmds.sorteio = await getId("sorteio", "src/commands.json");
    cmds.configurar = await getId("configurar", "src/commands.json");

    

                      let embed = new EmbedBuilder()
    .setDescription(`**🔨 | Comandos de Administrador**
  </configurar:${cmds.configurar}>
  </chat abrir:${cmds.chat}>
  </chat fechar:${cmds.chat}>
  </chat criar:${cmds.chat}>
  </chat deletar:${cmds.chat}>
  </sorteio criar:${cmds.sorteio}>
  </sorteio encerrar:${cmds.sorteio}>
  </sorteio reroll:${cmds.sorteio}>
  
**💰 | Comandos de Economia**
  </kaedecoins daily:${cmds.kaedecoins}>
  </kaedecoins banco:${cmds.kaedecoins}>
  </kaedecoins roubar:${cmds.kaedecoins}>
  </kaedecoins apostar:${cmds.kaedecoins}>
  </kaedecoins depositar:${cmds.kaedecoins}>
  </kaedecoins sacar:${cmds.kaedecoins}>
  </kaedecoins pagar:${cmds.kaedecoins}>
      
**☁️ | Comandos Sociais**
  </perfil ver:${cmds.perfil}>
  </perfil sobremim:${cmds.perfil}>
  
**📌 | Comandos Úteis**
  </kaede info:${cmds.kaede}>
  </kaede ping:${cmds.kaede}>`)
    .setTitle("**Lista de Comandos**")
    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
    .setColor("Random")

      interaction.reply({
        embeds: [embed]
      })

    console.log(cmds);
  } catch (err) {
    console.error(err);
  }
}

// Chamando a função para obter os IDs e atribuir ao objeto cmds
obterIds();




  }
}

  