const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

  bot.user.setActivity("twitch.tv/darkur", {type: "WATCHING"});
  // console.log(bot.channels);

  bot.channels.get("521630625686618115").send("Bot started up");
  
});
bot.on('messageReactionAdd', (messageReaction, user) => {
  if (user === undefined || user.bot) {
    return;
  
  }

  const member = messageReaction.message.guild.member(user);
  const fortnite = "🔫";
  const rocketleague = "🚙";
  const clearEmotes = "💱";

  if(messageReaction.emoji.name === fortnite) {
    member.addRole("521644443917484032");   // FORTNITE ROLE
    console.log("The user " + member + " has selected the Fortnite role");
    user.send("You have selected the Fortnite role!");
    messageReaction.remove(user);
    
  }
  else  if(messageReaction.emoji.name === rocketleague) {
    member.addRole("521644481427144714");   // ROCKET LEAGUE ROLE
    console.log("The user " + member + " has selected the Rocket League role");
    user.send("You have selected the Rocket Leaugue role!");
    messageReaction.remove(user);
    
  }
  else if(messageReaction.emoji.name === clearEmotes) {
    messageReaction.remove(user);
    member.removeRole("521644481427144714");
    member.removeRole("521644443917484032");
    user.send("You have succesfully removed your roles. You can choose them again by going to the #welcome channel!");
    console.log(member + " removed their role(s)");
  }
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

});

bot.login(botconfig.token);