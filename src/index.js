require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    // permissions
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

eventHandler(client);

client.login(process.env.TOKEN);