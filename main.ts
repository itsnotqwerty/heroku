import * as discord from 'discord.js';
import express from 'express';

const bot: discord.Client = new discord.Client();
const web: express.Express = express();
const PORT = process.env.PORT || 5000

web.listen(PORT);

bot.on('message', (message: discord.Message) => {
    console.log(message.content);
    console.log(message.mentions.members);
    if ('109094301962625024' in messae.mentions.members) {
        message.channel.send('Fuck off!');
    }
});

bot.login('NTM1NTIzNzM3MTU2NTgzNDQ0.XKgv4Q.VX4OvA-lsds1RYkvZBe-uidaTM4');