const { BOT_TOKEN, SRC_DIR, PREFIX } = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
client.login(BOT_TOKEN);
const fs = require("fs");
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync(`./${SRC_DIR}commands`)
  .filter((file) => file.endsWith("js"));
let args;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    status: "online", // online, idle ...
    activity: { name: "/meme", type: "WATCHING" },
  });
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(`Server error! Please tell the developer.`);
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  // console.log(reaction.toJSON());
  if (!reaction.me) {
    // console.log(reaction.emoji.toString());
    if (reaction.emoji.toString() === client.commands.get('meme').emojis.again) {
      client.commands.get('meme').sendMemes(reaction.message, args);
    }
  }
});