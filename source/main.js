global.Eris = require("eris")
global.presetMessages = require('../assets/Messages.json');
global.registeredCommands = [];
global.Console = require('./logger.js');

const { Config } = require('./config.js');

// CTRL + C
// Kill Process Event
process.on("SIGINT", function () {
    Console.LogInfo("Shutting Down...");
    bot.disconnect();
    Console.LogInfo("Shut Down!")
    process.exit();
});

// -- Helpful Functions -- //

//#region Get Username

// Get Username by member
function GetUsername(member) 
{
    if (member.nick === null) 
    {
        return member.username;
    } 
    else 
    {
        return member.nick;
    }
}

global.getUsername = GetUsername;

//#endregion

//#region Invalid Argument

// Returns a message to users about invalid arguments used for commands
function InvalidArguments(message, user, command) 
{
    bot.createMessage(message.channel.id, {
        "embed": {
            "title": "Wrong Command Usage!",
            "description": messages.wrongargs.replace("$user", user.mention).replace("$command", command.replace("*", "")),
            "color": 16724557,
            "thumbnail": 
            {
                "url": user.avatarURL
            },
            "author": {
                "name": "Blossom",
                "icon_url": bot.user.avatarURL
            }
        }
    }); // Send an "Invalid arguments" message.
}

global.invalidArguments = InvalidArguments;

//#endregion

// -- Discord Bot -- //

//#region Discord Bot

global.bot = new Eris.CommandClient(Config.botToken,
    {
        defaultImageSize: 512,
        autoreconnect: true,
        intents: [1 << 0, 1 << 1, 1 << 9]
    },
    {
        defaultHelpCommand: false,
        owner: "Quartzi",
        prefix: "/"
    }
);


// Load all Commands!
require("./commands/loadCommands.js").run(undefined, undefined);

//#region Bot Events

// Discord Bot Ready Event
bot.on("ready", () => {
    Console.LogInfo("Ready Event Called!");
    Console.LogInfo("User: " + bot.user.username);
    Console.LogInfo("Startup Time: " + bot.startTime)

     // Set Bot Status
    bot.editStatus("online", {
        "name": "Hello World!",
        "type": 0,
        "url": "https://github.com/realQuartzi/Blossom"
    });
});

// Discord Bot Error Event
bot.on("error", (err) => {
    Console.LogError(err);
});

//#endregion

//#endregion

// Connect ^^
bot.connect();