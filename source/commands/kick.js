module.exports.run = (message, args) => {
    // Check whether the message was sent in a Private Message
    if(!message.channel.guild)
    {
        return "This command can only be used in a guild!";
    }

    // Check if valid arguments where passed
    if((args.length === 1 || args.length === 2) && message.mentions.length === 1 && !message.mentionEveryone)
    {
        if(message.member.permissions.has("kickMembers"))
        {
            if(args.length === 1)
            {
                bot.kickGuildMember(message.channel.guild.id, message.mentions[0].id);
            }
            else
            {
                bot.kickGuildMember(message.channel.guild.id, message.mentions[0].id, args[1]);
            }
        }
        else
        {
            permissionDenied(message, message.author, message.content.split(" ")[0]);
        }
    }
    else // Send Invalid Argument Message
    {
        invalidArguments(message, message.author, message.content.split(" ")[0]);
    }
}

module.exports.alias =
{
    "aliases": []
}

module.exports.options =
{
    "argsRequired": true,

    "description": "Kicks the mentioned user from the guild.",

    "usage": ["@User", "Reason"],

    "deleteCommand": true,

    "cooldown": 15000,
    "cooldownMessage": presetMessages.cooldown,
    "cooldownReturns": 3
}
