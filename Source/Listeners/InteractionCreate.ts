import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../Handlers/Commands";

export default (bot: Client): void => 
{
    bot.on("interactionCreate", async (interaction: Interaction) => 
    {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) 
        {
            await HandleSlashCommand(bot, interaction);
        }
    });
}

const HandleSlashCommand = async (bot: Client, interaction: CommandInteraction): Promise<void> => 
{
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) 
    {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();

    slashCommand.run(bot, interaction);
}