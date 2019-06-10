import { MongoController } from './db';
import * as twitch from 'tmi.js';
import * as discord from 'discord.js';
import express from 'express';
import * as v from './vars';
import * as http from 'http';
import { CommandPacket } from './Entities/CommandPacket';

const web: express.Express = express();
const PORT = process.env.PORT || 5000;
export const mongoCon = new MongoController();

web.listen(PORT);

web.set( "views", "./Views" );
web.set( "view engine", "ejs" );

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
    v.processUser(user);
    if (!message.startsWith('::')) { return };
    let packet = await CommandPacket.init(message, user, "twitch");
    for (let command of v.commands) {
        if (message.startsWith(command.trigger)) {
            await TwitchCli.say(channel, await command.response(packet));
            return;
        }
    }
});

DiscordCli.on('message', async (message: discord.Message) => {
    let user = String(message.author.id);
    console.log(user);
    v.processUser(user);
    let packet = await CommandPacket.init(message.content, user, "discord");
    if (!message.content.startsWith('::')) { return };
    for (let command of v.commands) {
        if (message.content.startsWith(command.trigger)) {
            await message.reply(await command.response(packet));
            return;
        }
    }
});

DiscordCli.on('error', async (error: discord.DiscordAPIError) => {
    console.log('Big error uwu');
})

var init = async () => {
    await mongoCon.initTwitchDB();
    await TwitchCli.connect();
    await DiscordCli.login("NTM1NTIzNzM3MTU2NTgzNDQ0.XPh4AA.pgS25ju26vM8YjosChz5faA5iMU");
}

setInterval(() => {
    http.get("http://infinite-dusk-64948.herokuapp.com/");
}, 600000);

init();

web.use(async (req, res, next) => {
    res.render('index', {
        'user': await mongoCon.randomUser()
    });
})