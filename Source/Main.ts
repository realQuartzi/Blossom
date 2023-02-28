import { Client, IntentsBitField } from "discord.js";
import { Logger } from "./Logger";

import ready from "./Listeners/Ready";
import interactionCreate from "./Listeners/InteractionCreate";

const Config = require('./Config.json');
const Console = new Logger();

Console.LogInfo("Application Starting...");

const bot = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers]
});

ready(bot);
interactionCreate(bot);


bot.login(Config.token);