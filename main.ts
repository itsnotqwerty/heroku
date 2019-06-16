import { MongoController } from './db';
import * as twitch from 'tmi.js';
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
web.use(express.static(__dirname + '/public'));

var options = {
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: "qbotv3",
        password: "oauth:l9vumzpgl7ok807gnuiyvs62kdmq9o"
    },
    channels: [ "#qerwtr546" ]
}

const TwitchCli: twitch.Client = twitch.client(options);

const ioServer = new http.Server(web);
const io = require('socket.io')(ioServer);

TwitchCli.on('message', async (channel: string, userstate: twitch.ChatUserstate, message: string, self: boolean) => {
    if (self) { return };
    let user = String(userstate.username);
    v.processUser(user);
    let packet = await CommandPacket.init(message, user, "twitch");
    for (let scramble of v.scrambles) {
        if (message == scramble.trigger) {
            v.scrambles.splice(v.scrambles.findIndex(s => s.trigger == message), 1)
            io.emit('update', v.scrambles);
            await TwitchCli.say(channel, await scramble.response(packet));
            return;
        }
    }
});

var init = async () => {
    await mongoCon.initDB();
    await TwitchCli.connect();
}

setInterval(() => {
    http.get("http://infinite-dusk-64948.herokuapp.com/");
}, 600000);

init();

web.use(async (req, res, next) => {
    res.render('index', {
        'scrambles': v.scrambles
    });
});