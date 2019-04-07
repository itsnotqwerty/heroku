import * as discord from 'discord.js';
import express from 'express';
import * as http from 'http';

const bot: discord.Client = new discord.Client();
const web: express.Express = express();
const PORT = process.env.PORT || 5000;

const expletives = [
    'Fuck off!',
    'Go to hell!',
    'Eat shit!',
    'Die in a fire!'
]

function random(a: any[]): any {
    return a[Math.floor(Math.random() * a.length)];
}

web.listen(PORT);

bot.on('message', (message: discord.Message) => {
    console.log(message.content);
    if (!message.mentions.members.first()) { return };
    if ('535523737156583444' == message.mentions.members.first().id) {
        message.channel.send(random(expletives));
    }
});

bot.on('error', (err: Error) => {
    console.log('Oopsies! There was a fucky wucky! uwu');
})

bot.login('NTM1NTIzNzM3MTU2NTgzNDQ0.XKgv4Q.VX4OvA-lsds1RYkvZBe-uidaTM4');

setInterval(() => {
    http.get("https://infinite-dusk-64948.herokuapp.com/");
}, 600000);