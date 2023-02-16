const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const fs = require("fs");
const express = require("express");
const http = require("http");
const { Server } = require("ws");
const path = require('path');

const port = 3000;
const app = express()
const server = http.createServer(app);
const wss = new Server({ server });

const EventEmitter = require('events');
const emitter = new EventEmitter()
emitter.setMaxListeners(500)

const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
});
module.exports = client;

const { token } = require("./config");
client.config = require("./config.js");
require("./MongoDB/conection.js")(client);


client.events = new Collection();
client.cooldowns = new Collection();
client.subcmd = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.categories =  fs.readdirSync("./src/Commands/");


["event_handler", "slash_handler", "functions"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});


require("./Utils/giveawaySetup.js")(client)

client.login(token);

app.use(express.static(path.join(__dirname, "/App/website/build")));

app.get("/", async(req, res) => {
  res.sendFile(path.join(__dirname, "/App/website/build", "index.html"))
})

server.listen(process.env.PORT, async() => {
  console.log(require("colors").cyan("React conectado!"))
})