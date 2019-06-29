import express = require("express");
import socketio = require("socket.io");
import { get } from "http";
import { MongoCon } from "./Entities/mongo";
import { addUser } from "./user";
import { Server } from "https";
import { LoginPacket } from './Entities/entities';

const mongo = new MongoCon();

const app = express();
const https = new Server(app);
const io = socketio(https);

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
https.listen(process.env.PORT || 8080);

io.on('connect', (socket: any) => {
    socket.on('newUser', async (login: LoginPacket) => {
        await addUser(login);
    })
})

setInterval(() => {
    get('http://projectseveryweek.com/')
}, 300000);