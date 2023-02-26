module.exports.run = (message, args) => {
    const canvas = Canvas.createCanvas(640, 160);
    const context = canvas.getContext("2d");

    Canvas.loadImage("./assets/canvas.jpg").then((background) => {
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        /*
        context.strokeStyle = "#ffffff";
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
        */

        const avatar = Canvas.loadImage(message.member.avatarURL).then((avatar) => {
            context.drawImage(avatar, 16, 16, 128, 128);

            const attachment = {file: canvas.toBuffer(), name: "Blossom-Test.png"};

            bot.createMessage(message.channel.id, "Test Message", attachment);
        });
    });
}

module.exports.settings =
{
    "createCommand": false,

    "aliases": ["test"]
}

module.exports.options =
{
    "description": "Test Command for Visual Things",

    "cooldown": 3000,
    "cooldownMessage": presetMessages.cooldown,
    "cooldownReturns": 3
}
