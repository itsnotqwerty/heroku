import express = require("express");
import socketio = require("socket.io");
import { addUser } from "./user";
import { LoginPacket } from './Entities/entities';
import { createServer, get } from "https";

const app = express();

app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');

app.use('/styles', express.static(__dirname + '/Public/Styles'));
app.use('/images', express.static(__dirname + '/Public/Images'));
app.use('/scripts', express.static(__dirname + '/Public/Scripts'));

app.get('/', async (req, res) => {
    return res.render('index', {
        title: "Placeholder Title!"
    });
});

const server = createServer(app);
const io = socketio(server);

io.on('connect', (socket: any) => {
    console.log('Connected!');

    socket.on('newUser', (login: LoginPacket) => {
        addUser(login);
        console.log('NEW USER RECEIVED!');
    })
});

server.listen(process.env.PORT || 8080);

setInterval(() => {
    get('https://projectseveryweek.com/')
}, 300000);