function GetResult(userChoice, botChoice)
{
    switch(userChoice)
    {
        case "Rock":
            if(botChoice == "Rock") return "Tie";
            else if(botChoice == "Paper") return "Lose";
            else return "Win";
        case "Paper":
            if (botChoice == "Rock") return "Win";
            else if (botChoice == "Paper") return "Tie";
            else return "Lose";
        case "Scissors":
            if (botChoice == "Rock") return "Lose";
            else if (botChoice == "Paper") return "Win";
            else return "Tie";
    }
}

module.exports.run = (message, args) => 
{
    if (args.length === 1) 
    {
        // Get Bot Result
        var result = Math.random();
        if(result < 0.34)
        {
            result = "Rock";
        }
        else if (result <= 0.67)
        {
            result = "Paper";
        }
        else
        {
            result = "Scissors"
        }

        // Get User Result
        var arg = args[0];
        var userInput = "";
        if(arg === "1" || arg.toLowerCase() === "rock")
        {
            userInput = "Rock";
        }
        else if (arg === "2" || arg.toLowerCase() === "paper")
        {
            userInput = "Paper";
        }
        else if (arg === "3" || arg.toLowerCase() === "scissors" || arg.toLowerCase() === "scissor")
        {
            userInput = "Scissors";
        }
        else // Other Arguments cause Error
        {
            invalidArguments(message, message.author, message.content.split(" ")[0]);
        }

        var winResult = GetResult(userInput, result);

        // Create Tie Message
        if(winResult === "Tie")
        {
            bot.createMessage(message.channel.id,
                {
                    "embed":
                    {
                        "title": "Rock, Paper, Scissors",
                        "description": "Blossom picked: " + result + "\n" +
                            getUsername(message.member) + " picked: " + userInput + "\n\n**We " + winResult + "d!**",
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
        else 
        {
            bot.createMessage(message.channel.id,
                {
                    "embed":
                    {
                        "title": "Rock, Paper, Scissors",
                        "description": "Blossom picked: " + result + "\n" +
                            getUsername(message.member) + " picked: " + userInput + "\n\n**You " + winResult + "!**",
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
    }
    else // Send Invalid Argument Message
    {
        invalidArguments(message, message.author, message.content.split(" ")[0]);
    }
}

module.exports.settings =
{
    "createCommand": true,

    "aliases": ["rps"]
}

module.exports.options = 
{
    "description": "Flip a coin to return Heads or Tails",

    "usage": ["Rock"],

    "cooldown": 3000,
    "cooldownMessage": presetMessages.cooldown,
    "cooldownReturns": 3
}
