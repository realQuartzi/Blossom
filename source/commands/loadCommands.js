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

    // Ensure registeredCommands List is Emptied
    registeredCommands = [];

    // Read through all Commands in command folder and run them.
    let i = 0;
    fs.readdirSync(commandPath).forEach(function(file) 
    {
        var curCommand = require("../commands/" + file);
        var commandName = file.replace(".js", "");
        bot.registerCommand(commandName, curCommand.run, curCommand.options);
        registeredCommands[i] = commandName;

        Console.LogInfo("Registered Command: " + registeredCommands[i]);

        // Check if command has aliases
        aliases = curCommand.alias.aliases;
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

module.exports.alias = {
    "aliases": []
}

module.exports.options = {
    "cooldown": 60000,
    "cooldownMessage": presetMessages.cooldown,
    "cooldownReturns": 6
};