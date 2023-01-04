module.exports = {
  name: "ping",
  description: "Veja minha latência atual",
  type: 1,

   run: async(client, interaction) => {

let gatewayPing = client.ws.ping;
let apiPing = Date.now() - interaction.createdTimestamp;

     interaction.reply({
       content: `Pong!\nGateway Ping: **\`${gatewayPing}ms\`**\nApi Ping: **\`${apiPing}ms\`**`
     })
     
   }
}