const Eris = require("eris")
const { Config } = require('./config.js');
const { Logger } = require('./logger.js');

// CTRL + C
// Kill Process Event
process.on("SIGINT", function () {
    Logger.LogInfo("Shutting Down...");
    bot.disconnect();
    Logger.LogInfo("Shut Down!")
    process.exit();
});

const bot = new Eris(Config.botToken, {
    intents: []
});

// Discord Bot Ready Event
bot.on("ready", () => {
    Logger.LogInfo("Ready Event Called!");
    Logger.LogInfo("User: " + bot.user.username);
    Logger.LogInfo("Startup Time: " + bot.startTime)

     // Set Bot Status
    bot.editStatus("online", {
        "name": "Hello World!",
        "type": 0,
        "url": "https://github.com/realQuartzi/Blossom"
    });
});

// Discord Bot Error Event
bot.on("error", (err) => {
    Logger.LogError(err);
});

// Connect ^^
bot.connect();