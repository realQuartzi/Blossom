import { CommandInteraction, Client, AttachmentBuilder } from "discord.js";
import { Command } from "../Handlers/Command";
const { request } = require('undici');

import { createCanvas, loadImage, Canvas, Image, SKRSContext2D } from "@napi-rs/canvas";

export const Rank: Command =
{
    name: "rank",
    description: "View your rank",
    dmPermission: false,
    run: async (bot: Client, interaction: CommandInteraction) => 
    {
        interaction.followUp({files: [await GetAttachement(bot, interaction)]});
    }
};

async function GetAttachement(bot: Client, interaction: CommandInteraction): Promise<AttachmentBuilder>
{
    const canvas: Canvas = createCanvas(640, 160);
    const context: SKRSContext2D = canvas.getContext("2d");

    // Background
    const background: Image = await loadImage("./Assets/canvas.jpg");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    // User Avatar
    const { body } = await request(interaction.user.displayAvatarURL({ "extension": "jpg" }));
    const avatar: Image = await loadImage(await body.arrayBuffer());
    context.drawImage(avatar, 16, 16, 128, 128);

    // User Name
    context.font = '48px Quicksand'
    context.fillStyle = '#ffffff'
    context.fillText(interaction.user.username, 128 + 24, 78);

    // Profile
    context.font = '24px Quicksand'
    context.fillStyle = '#ffffff'
    context.fillText("Profile", 128 + 24, 36);

    const attachment: AttachmentBuilder = new AttachmentBuilder(await canvas.encode('png'), {name: 'rank.png'});
    
    return attachment;
}