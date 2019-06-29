import express = require("express");
import socketio = require("socket.io");
import { get } from "http";
import { MongoCon } from "./Entities/mongo";
import { addUser } from "./user";
import { Server } from "https";
import { LoginPacket } from './Entities/entities';

const mongo = new MongoCon();

const app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');

const https = new Server(app);
const io = socketio(https);

app.use('/styles', express.static(__dirname + '/Public/Styles'));
app.use('/images', express.static(__dirname + '/Public/Images'));
app.use('/scripts', express.static(__dirname + '/Public/Scripts'));

app.use(async (req, res) => {
    return res.render('index', {
        title: "Placeholder Title!"
    });
});

io.on('connect', (socket: any) => {
    console.log('Connected!');

    socket.on('newUser', (login: LoginPacket) => {
        addUser(login);
        console.log('NEW USER RECEIVED!');
    })
})

app.listen(process.env.PORT || 8080);

setInterval(() => {
    get('http://projectseveryweek.com/')
}, 300000);