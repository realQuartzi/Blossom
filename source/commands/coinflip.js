module.exports.run = (message, args) => 
{
    if (args.length === 0) 
    {
        var result = Math.floor(Math.random() * 2);
        var answer = "";

        if (result === 0) // 0 = Heads
        {
            answer = "Heads"
        }
        else if (result === 1) // 1 = Tails
        {
            answer = "Tails";
        }
        else // If we get a different number we have an error
        {
            bot.createMessage(message.channel.id,
                {
                    "embed": {
                        "title": "Coin Flip",
                        "description": "Oh no... Seems like I ran into an error. You may report this as an issue on my official repo.",
                        "color": 16724557,
                        "author": {
                            "name": "Blossom",
                            "icon_url": bot.user.avatarURL
                        },
                        "footer": {
                            "icon_url": message.author.avatarURL,
                            "text": "Requested by: " + getUsername(message.member)
                        }
                    }
                });
            return;
        }

        // Create Successful Flip Message
        bot.createMessage(message.channel.id,
            {
                "embed":
                {
                    "title": "Coin Flip",
                    "description": "The result is:\n" + answer + "!",
                    "color": 61561,
                    "author": {
                        "name": "Blossom",
                        "icon_url": bot.user.avatarURL
                    },
                    "footer": {
                        "icon_url": message.author.avatarURL,
                        "text": "Requested by: " + getUsername(message.member)
                    }
                }
            });
    }
    else // Send Invalid Argument Message
    {
        invalidArguments(message, message.author, message.content.split(" ")[0]);
    }
}

module.exports.alias =
{
    "aliases": ["coin"]
}

module.exports.options = 
{
    "description": "Flip a coin to return Heads or Tails",

    "cooldown": 3000,
    "cooldownMessage": presetMessages.cooldown,
    "cooldownReturns": 3
}
