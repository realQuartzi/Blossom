import { CommandInteraction, Client, EmbedBuilder, User, ApplicationCommandOptionData, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Handlers/Command";
const eightBall = require("../../Assets/EightBall.json");

const options: ApplicationCommandOptionData[] =
    [
        {
            type: ApplicationCommandOptionType.String,
            name: "question",
            description: "Question to ask the 8 Ball",
            required: false
        }
    ];


export const EightBall: Command = 
{
    name: "8ball",
    description: "Ask the 8 Ball",
    dmPermission: true,
    options: options,
    run: async (bot: Client, interaction: CommandInteraction) => 
    {
        interaction.followUp({embeds: [GetEmbed(interaction, bot, interaction.user)]});
    }
};

function GetEmbed(command: CommandInteraction, bot: Client, member: User): EmbedBuilder
{
    var question: string | undefined = command.options.get("question")?.value?.toString();
    var response = eightBall.responses[Math.floor(Math.random() * eightBall.responses.length)];

    var description: string = member.username + ", " + response;
    if (question != undefined)
    {
        description = "Question: " + question + "\n\n" + member.username + ", " + response;
    }

    const embed = new EmbedBuilder()
        .setColor(61561)
        .setTitle("Magic 8 Ball :8ball:")
        .setAuthor({ name: bot.user!.username, iconURL: bot.user!.avatarURL()! })
        .setDescription(description)
        .setFooter({ text: "Requested by: " + member.username, iconURL: member.avatarURL()! });

        return embed;
}