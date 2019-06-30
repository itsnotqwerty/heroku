import express = require("express");
import * as WebSocket from 'ws';
import { addUser } from "./user";
import { LoginPacket } from './Entities/entities';
import { createServer, get } from "https";
import { SocketEvent } from "./Entities/sockets";

const app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');

app.use('/styles', express.static(__dirname + '/Public/Styles'));
app.use('/images', express.static(__dirname + '/Public/Images'));
app.use('/scripts', express.static(__dirname + '/Public/Scripts'));

app.use(async (req, res) => {
    return res.render('index', {
        title: "Placeholder Title!"
    });
});

app.listen(process.env.PORT || 8080);

const server = createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (event: SocketEvent) => {
        switch(event.type) {
            case 'newUser':
                addUser(event.data as LoginPacket);
            default:
                console.log('Invalid event!');
        }
    })
})

setInterval(() => {
    get('https://projectseveryweek.com/')
}, 300000);