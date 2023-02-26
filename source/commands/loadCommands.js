const fs = require("fs");
const path = require("path");

module.exports.run = (message, args) => {
    var commandPath = path.join(__dirname, "../commands");

    // Unregister all current Commands from Blossom Bot
    // Clear Cache while we are at it :)
    for (let i = 0; i < registeredCommands.length; i++)
    {
        bot.unregisterCommand(registeredCommands[i]);
        delete require.cache[require.resolve("../commands/" + registeredCommands[i] + ".js")];
        
        Console.LogInfo("Un-Registered Command: " + registeredCommands[i]);
    }

    Console.LogInfo("Application ID: " + bot.application);

    // Ensure registeredCommands List is Emptied
    registeredCommands = [];

    // Read through all Commands in command folder and run them.
    let i = 0;
    fs.readdirSync(commandPath).forEach(function(file) 
    {
        var curCommand = require("../commands/" + file);
        var commandName = file.replace(".js", "");
        var registeredCommand = bot.registerCommand(commandName, curCommand.run, curCommand.options);

        /*Console.Log(curCommand.settings.createCommand);
        if (curCommand.settings.createCommand == true) 
        {
            Console.Log("Create Command");
            bot.createCommand(registeredCommand);
        }*/

        registeredCommands[i] = commandName;

        Console.LogInfo("Registered Command: " + registeredCommands[i]);

        // Check if command has aliases
        aliases = curCommand.settings.aliases;
        if(aliases.length > 0)
        {
            for (let j = 0; j < aliases.length; j++) 
            {
                // Register all aliases for the current Command
                bot.registerCommandAlias(aliases[j], commandName);

                Console.LogInfo("Registered Sub Command Alias: " + commandName + " | " + aliases[j]);
            }
        }



        i++;
    });
};

module.exports.settings =
{
    "createCommand": false,

    "name": "Load Commands",
    "type": Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
    "aliases": []
}

module.exports.options = {
    "description": "Reloads all the commands on the bot",

    "cooldown": 60000,
    "cooldownMessage": presetMessages.cooldown,
    "cooldownReturns": 6
};