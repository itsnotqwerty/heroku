import { MongoController } from './db';
import * as discord from 'discord.js';
import express from 'express';
import * as v from './vars';
import * as http from 'http';

const bot: discord.Client = new discord.Client();
const web: express.Express = express();
const PORT = process.env.PORT || 5000;
export const mongoCon = new MongoController();

web.listen(PORT);

bot.on('message', async (message: discord.Message) => {
    let userData = await mongoCon.findUser(message.author.id);
    if (userData == null) {
        await mongoCon.insertUser(message.author.id);
    }
    await mongoCon.addPoint(message.author.id);
    if (!message.content.startsWith('::')) { return };
    for (let command of v.commands) {
        if (message.content.startsWith(command.trigger)) {
            message.channel.send(await command.response(message));
            return;
        }
    }
    message.channel.send(v.random(v.expletives));
});

bot.on('error', (err: Error) => {
    console.log('Oopsies! There was a fucky wucky! uwu');
})

var init = async () => {
    await mongoCon.initTestDB();
    bot.login('NTM1NTIzNzM3MTU2NTgzNDQ0.XKgv4Q.VX4OvA-lsds1RYkvZBe-uidaTM4');
}

setInterval(() => {
    http.get("http://infinite-dusk-64948.herokuapp.com/");
}, 600000);

init();