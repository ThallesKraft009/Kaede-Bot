module.exports = (client) => {


  const c = require("colors")


const conectar = async() => {

const { connect } = require("mongoose");
  
  
    await connect(client.config.mongo).then(() => {
      console.log(c.blue("[INFO]: Ready MongoDB ✅"));
      
    })
}


client.once("ready", () => {
  conectar()
})


client.userdb = require("./Database/user.js");
client.svdb = require("./Database/sv.js");
  
 }