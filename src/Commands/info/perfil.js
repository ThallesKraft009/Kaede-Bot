const canvas = require("canvas");
const { AttachmentBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { Image } = require("canvas");

module.exports = {
  name: "perfil",
  description: "Informações sobre seu perfil na Kaede",
  type: 1,
  options: [
    {
      name: "ver",
      description: "Veja seu perfil ou de outro membro",
      type: 1,
      options: [
        {
          name: "membro",
          description: "Selecione o membro ou insira o ID",
          type: 6,
          required: false
        }
      ]
    },{
      name: "sobremim",
      description: "Altere seu sobremim",
      type: 1
    }
  ],
  run: async(client, interaction) => {

let comando = interaction.options.getSubcommand()

  if (comando === "sobremim") {

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

if (comando === "ver") {
   let Canvas = canvas.createCanvas(900, 500)
   let ctx = Canvas.getContext("2d")

  let membro = interaction.options.getUser("membro") || interaction.user

  let userdb = await client.userdb.findOne({
         userID: membro.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: membro.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: membro.id })
     }

  let kaedecoins = userdb.economia.money;
  kaedecoins = client.numero(kaedecoins)

let kaedecoins_banco = userdb.economia.banco;
  kaedecoins_banco = client.numero(kaedecoins_banco)

  let sobremim = userdb.perfil.sobremim;

  let sobremim_texto = `Sobremim de ${membro.username}`;

  if (membro === interaction.user) sobremim_texto = "Seu sobremim"

            


 ctx.fillStyle = "#000080"
  ctx.fillRect(0,00, 900,195)

  ctx.fillStyle = "#343434"
  ctx.fillRect(0,170,900, 500)


  ctx.fillStyle = "#28282b"
  ctx.fillRect(0, 130, 900, 70)

let avatar = await canvas.loadImage(`https://cdn.discordapp.com/avatars/${membro.id}/${membro.avatar}.png`)

  
  
  ctx.drawImage(avatar, 60, 70, 110, 110)
  ctx.beginPath();
ctx.arc(115, 125, 75, 0, 2 * Math.PI);
    ctx.stroke()

  ctx.arc(115, 125, 55, (Math.PI/180)* 0, (Math.PI/180) * 360, true, 0.5)
  ctx.closePath()
  ctx.fillStyle = "#353935"
  ctx.fill()

    ctx.fillStyle = "#28282b"
  ctx.fillRect(0, 390, 900, 40)
  
  ctx.fillStyle = "#ffffff"
  ctx.font = "35px sans";
  ctx.fillText(membro.tag, 210, 180)

  let img = await canvas.loadImage("https://cdn.discordapp.com/emojis/796824943429287957.png")


  ctx.drawImage(img, 60, 230, 50, 50);
  ctx.beginPath();

  ctx.font = "25px serif";
  ctx.fillText(kaedecoins + " KaedeCoins", 120, 265)

  let img_2 = await canvas.loadImage("https://cdn.discordapp.com/attachments/1071057188228972634/1074089717815066674/imagem_2023-02-11_190836383-removebg-preview.png")

 ctx.drawImage(img_2, 55, 290, 65, 65);
  ctx.beginPath();

  ctx.font = "25px serif";
  ctx.fillText("Banco: " + kaedecoins_banco, 120, 330)

  ctx.font = "29px serif";
  ctx.fillText(sobremim_texto, 70, 420)
  ctx.font = "20px serif";
  ctx.fillText(sobremim, 70, 460)

  ctx.save()

   
const attachment = new AttachmentBuilder(Canvas.toBuffer('image/jpeg', { quality: 0.5 })
, { name: 'perfil.png' });

	interaction.reply({ files: [attachment], content: `🌧️ | Perfil de ${membro}` });

  
}

   }
}