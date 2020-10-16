//dakotas shity discord bot lmao

const Discord = require("discord.js"); //library for interacting with discord
const fs = require("fs"); //library for file system in node js

const TOKEN = ""; //bot token 

const PREFIX = "!"; //list of prefixes that get the bot's attention
const PREFIX2 = "!<>";
const TEXTFIX = "3==>" //lmao

var servers = {};

var Bot = new Discord.Client();


//all fortunes for the 8ball command
var fortunes = [
    "yes",
    "maybe",
    "possibly",
    "with out a doubt",
    "it is certain",
    "ask again",
    "no",
    "yee",
    "naw",
    "GeT oUt Of My RoOm I'm PlAyInG mInEcRaFt!!!!111!!!!"
]

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
            message.channel.sendMessage("Pc crashed. Going to try to go to bed again");
            break;
        case "embed":
            var MEME = new Discord.RichEmbed()
                .setColor(0x0fa567)
                .setTitle('More cowbower content here')
                .setURL('https://www.reddit.com/r/CowBowser/')
                .setAuthor('~OwO~', 'https://i.imgur.com/v4Gz4b9.png', 'https://www.reddit.com/r/CowBowser/')
                .setDescription('The meme that you have called upon:')
                .setThumbnail('https://i.imgur.com/RJu2v72.png')
                .setImage((meme_links[Math.floor(Math.random() * meme_links.length)]))
                .setTimestamp()
                .setFooter('I take my leave', 'https://i.imgur.com/v4Gz4b9.png')
            message.channel.sendEmbed(MEME);
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
                        .addField(message.author.username.toString(), (descriptors[Math.floor(Math.random() * descriptors.length)]))
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