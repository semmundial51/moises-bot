const { IntentsBitField, Client } = require('discord.js');

const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers);

const client = new Client({
    intents: myIntents
});

const token = 'MTE5ODc1NzU3NzExOTUxNDY5NA.GOyHyZ.cgoY1-v526etf7p4_HGvXaYBz6LSqcq_iTLWDA';

client.on('ready', () => {
    console.log(`Bot está online como ${client.user.tag}!`);
});

client.on('message', (message) => {
    if (message.content.toLowerCase() === 'ping') {
        message.reply('Pong!');
    }
});

client.login(token);