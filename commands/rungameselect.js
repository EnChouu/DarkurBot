const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let msg = await message.channel.send("Select your game!");
  
  msg.react("🔫");
  msg.react("🚙");
  msg.react("💱");

  // GETS ALL CUSTOM EMOTES FROM THE SERVER IT IS IN.
  // const emojiList = message.guild.emojis.map(e=>e.toString()).join(" "); 
  // message.channel.send(emojiList);

}
module.exports.help = {
    name: "startgame"
}