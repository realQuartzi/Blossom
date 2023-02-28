import { CommandInteraction, Client, EmbedBuilder, User, ApplicationCommandOptionData, ApplicationCommandOptionType, ApplicationCommandOptionChoiceData } from "discord.js";
import { Command } from "../Handlers/Command";

const choices: ApplicationCommandOptionChoiceData<string>[] = 
[
    {
        name: "Rock",
        value: "Rock"
    },
    {
        name: "Paper",
        value: "Paper"
    },
    {
        name: "Scissors",
        value: "Scissors"
    }
];

const options: ApplicationCommandOptionData[] = 
[
    {
        type: ApplicationCommandOptionType.String,
        name: "decision",
        description: "Pick Rock, Paper, or Scissors",
        required: true,
        choices: choices
    }
];

export const RPS: Command =
{
    name: "rps",
    description: "Play Rock, Paper, Scissors against Blossom",
    dmPermission: true,
    options: options,
    run: async (bot: Client, interaction: CommandInteraction) => 
    {
        interaction.followUp({ embeds: [GetEmbed(interaction, bot, interaction.user)] });
    }
};

function GetEmbed(command: CommandInteraction, bot: Client, member: User): EmbedBuilder 
{
    var rnd: number = Math.random();
    var result: string = "Rock";
    if (rnd < 0.34) 
    {
        result = "Rock";
    }
    else if (rnd <= 0.67) 
    {
        result = "Paper";
    }
    else 
    {
        result = "Scissors"
    }

    var userInput: string = command.options.get("decision")?.value?.toString()!;

    var winResult = GetResult(userInput, result);

    var embed;

    if(winResult === "Tie")
    {
        embed = new EmbedBuilder()
            .setColor(61561)
            .setTitle("Rock, Paper, Scissors")
            .setAuthor({ name: bot.user!.username, iconURL: bot.user!.avatarURL()! })
            .setDescription("Blossom picked: " + result + "\n" +
                member.username + " picked: " + userInput + "\n\n" +
                "**We " + winResult + "d!**")
            .setFooter({ text: "Requested by: " + member.username, iconURL: member.avatarURL()! });
    }
    else
    {
        embed = new EmbedBuilder()
            .setColor(61561)
            .setTitle("Rock, Paper, Scissors")
            .setAuthor({ name: bot.user!.username, iconURL: bot.user!.avatarURL()! })
            .setDescription("Blossom picked: " + result + "\n" +
                member.username + " picked: " + userInput + "\n\n" +
                "**You " + winResult + "!**")
            .setFooter({ text: "Requested by: " + member.username, iconURL: member.avatarURL()! });
    }

    return embed;
}

function GetResult(userChoice: string, botChoice: string): string
{
    switch (userChoice) 
    {
        case "Rock":
            if (botChoice == "Rock") return "Tie";
            else if (botChoice == "Paper") return "Lose";
            else return "Win";
        case "Paper":
            if (botChoice == "Rock") return "Win";
            else if (botChoice == "Paper") return "Tie";
            else return "Lose";
        case "Scissors":
            if (botChoice == "Rock") return "Lose";
            else if (botChoice == "Paper") return "Win";
            else return "Tie";
        default:
            return "Tie";
    }
}