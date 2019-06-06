import { MongoController } from './db';
import * as twitch from 'tmi.js';
import * as discord from 'discord.js';
import express from 'express';
import * as v from './vars';
import * as http from 'http';

const web: express.Express = express();
const PORT = process.env.PORT || 5000;
export const mongoCon = new MongoController();

web.listen(PORT);

var options = {
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: "qbotv3",
        password: "oauth:l9vumzpgl7ok807gnuiyvs62kdmq9o"
    },
    channels: [ "#qerwtr546", "kraslin", "ninjabunny9000", "cmgriffing", "#museun" ]
}

var TwitchCli: twitch.Client = twitch.client(options);
var DiscordCli: discord.Client = new discord.Client();

TwitchCli.on('message', async (channel: string, userstate: twitch.ChatUserstate, message: string, self: boolean) => {
    if (self) { return };
    let user = String(userstate.username);
    let userData = await mongoCon.findUser(user);
    if (userData == null) {
        await mongoCon.insertUser(user);
    }
    await mongoCon.addPoints(user, 1);
    if (!message.startsWith('::')) { return };
    for (let command of v.commands) {
        if (message.startsWith(command.trigger)) {
            await TwitchCli.say(channel, await command.response(userstate, v.parseMessage(message)));
            return;
        }
    }
});

DiscordCli.on('message', async (message: discord.Message) => {
    console.log(message.content);
});

var init = async () => {
    await mongoCon.initTwitchDB();
    await TwitchCli.connect();
    await DiscordCli.login("NTM1NTIzNzM3MTU2NTgzNDQ0.XPh4AA.pgS25ju26vM8YjosChz5faA5iMU");
}

setInterval(() => {
    http.get("http://infinite-dusk-64948.herokuapp.com/");
}, 600000);

init();