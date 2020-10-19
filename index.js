//the game bot
//version 0.1
const Discord = require("discord.js"); //library for interacting with discord
const fs = require("fs"); //library for file system in node js
const TOKEN = "NzY3ODI0OTQ3MTc5NDIxNzM5.X43itA.OsXLusO5KndKJi0elKpHmM83r24"; //bot token 
const PREFIX = "!"; //list of prefixes that get the bot's attention
const PREFIX2 = "!<>";
const TEXTFIX = "3==>" //lmao
var Bot = new Discord.Client();

Bot.on('ready', () => {
    console.log("ready");
});

//main commands
Bot.on("message", function(message) {
    if (message.author.equals(Bot.user)) return; //dont let bots msg bots
    if (!message.content.startsWith(PREFIX)) return; //ignore if not start with prefix
    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLocaleLowerCase()) {
        case "ping":
            message.channel.sendMessage("pong");
            break;
        case "place":
            var place = new Discord.RichEmbed()
                .setColor(0x0fa567)
                .setTitle('place')
                .setURL('')
                .setAuthor('rpgbot', 'https://i.imgur.com/v4Gz4b9.png', 'https://www.reddit.com/r/CowBowser/')
                .setDescription('The place that was chosen')
                .setThumbnail('https://i.imgur.com/RJu2v72.png')
                .setImage("https://i.imgur.com/RJu2v72.png")
                .setTimestamp()
                .setFooter('bottom text', 'https://i.imgur.com/v4Gz4b9.png')
            message.channel.sendEmbed(place);
            break;
        case "profile":
            //either get specific user or assign a random profile
            switch (message.author.username.toString()) {
                case 'ch33s3': //ch33s3
                    var ch33s3 = new Discord.RichEmbed()
                        .addField(message.author.username.toString(), "They call him bot man...")
                        .addField("about:", "the one resposible for coding me and all my functions")
                        .setColor(0x0fa655)
                        .setThumbnail(message.author.avatarURL)
                    message.channel.sendEmbed(ch33s3);
                    break;
                default:
                    var prof = new Discord.RichEmbed()
                        .addField("text here")
                        .setColor(0x0fa655)
                        .setThumbnail(message.author.avatarURL)
                    message.channel.sendEmbed(prof);
                    break;
            }
            break;
        case "args":
            message.channel.sendMessage(args);
            break;
        default:
            message.channel.sendMessage("Invalid comand");
            break;
    }
});

//write description file
Bot.on("message", function(message) {
    if (message.author.equals(Bot.user)) return;
    if (!message.content.startsWith(PREFIX2)) return;
    //actually writes the file
    var words = message.content.substring(PREFIX2.length).split(" ")
    var args = message.content.substring(PREFIX2.length);
    switch (args[0].toLocaleLowerCase()) {
        default: fs.writeFile(words[0].toLocaleLowerCase() + '.txt', args, (err) => {
            // In case of a error throw err. 
            if (err) throw err;
        })
    }
});


//read description file
Bot.on("message", function(message) {
    if (message.author.equals(Bot.user)) return;
    if (!message.content.startsWith(TEXTFIX)) return;
    var args = message.content.substring(TEXTFIX.length);
    fs.readFile(args.toLocaleLowerCase() + ".txt", "utf8", function(err, data) { //read the file
        if (err) throw err;
        message.channel.sendMessage(data);
    });
});



//log everyonesmessages, ID and, name in console so i can add them to the profile list
Bot.on("message", function(message) {
    console.log(message.content + " " + message.author.id + " " + message.author.username);
});

Bot.login(TOKEN); //login (makes the bot actually come online)
