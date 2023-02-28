import { CommandInteraction, Client, EmbedBuilder, User } from "discord.js";
import { Command } from "../Handlers/Command";

export const CoinFlip: Command = 
{
    name: "coinflip",
    description: "Flip a coin to return Heads or Tails.",
    dmPermission: false,
    run: async (bot: Client, interaction: CommandInteraction) => 
    {
        interaction.followUp({embeds: [GetEmbed(bot, interaction.user)]});
    }
};

function GetEmbed(bot: Client, member: User): EmbedBuilder
{
    var result: number = Math.floor(Math.random() * 2);
    var answer: string = "";

    if (result === 0) // 0 = Heads
    {
        answer = "Heads"
    }
    else // 1 = Tails
    {
        answer = "Tails";
    }

    const embed = new EmbedBuilder()
        .setColor(61561)
        .setTitle("Coin Flip")
        .setAuthor({ name: bot.user!.username, iconURL: bot.user!.avatarURL()! })
        .setDescription("The result is: \n" + answer + "!")
        .setFooter({ text: "Requested by: " + member.username, iconURL: member.avatarURL()! });

        return embed;
}