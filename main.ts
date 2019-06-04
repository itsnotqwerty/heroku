import { MongoController } from './db';
import * as twitch from 'tmi.js';
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
var client: twitch.Client = twitch.client(options);

client.on('message', async (channel: string, userstate: twitch.ChatUserstate, message: string, self: boolean) => {
    if (self) { return };
    let user = String(userstate.username);
    let userData = await mongoCon.findUser(user);
    if (userData == null) {
        await mongoCon.insertUser(user);
    }
    await mongoCon.addPoint(user);
    if (!message.startsWith('::')) { return };
    for (let command of v.commands) {
        if (message.startsWith(command.trigger)) {
            await client.say(channel, await command.response(userstate));
            return;
        }
    }
});

var init = async () => {
    await mongoCon.initTwitchDB();
    await client.connect();
}

setInterval(() => {
    http.get("http://infinite-dusk-64948.herokuapp.com/");
}, 600000);

init();