import { ActivityType, Client } from "discord.js";
import { Commands } from "../Handlers/Commands";
import { Logger } from "../Logger"

const fs = require('fs');

const Console = new Logger();

export default (bot: Client): void =>
 {
    bot.once("ready", async () => 
    {
        Console.LogInfo("Ready Event Started...");

        if (!bot.user || !bot.application) 
        {
            Console.LogError("You are not who you think you are...");
            return;
        }

        Console.LogInfo("Connected User: " + bot.user.username);

        Console.LogInfo("Setting up all Commands...");
        await bot.application.commands.set(Commands).then(console.log).catch(console.error);
        Console.LogInfo("Commands Setup!");

        Console.LogInfo("Setting Activity...");
        bot.user.setActivity("The people around me o.o", { type: ActivityType.Watching, url: "https://www.twitch.tv/quartzi" });
        Console.LogInfo("Activity Set!");

        Console.LogInfo("Ready Event Completed...");
    });
}