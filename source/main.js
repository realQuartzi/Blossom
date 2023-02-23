const Eris = require("eris")

const bot = new Eris("BOT TOKEN", {
    intents: []
});

bot.on("ready", async () => {
    console.log("Blossom is Ready!");
});

bot.on("error", (err) => {
    console.error(err);
});

bot.connect();