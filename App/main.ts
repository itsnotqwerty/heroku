import express = require("express");
import socketio = require("socket.io");
import { addUser } from "./user";
import { LoginPacket } from './Entities/entities';
import { get, createServer } from "http";

const app = express();

app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');

app.use('/styles', express.static(__dirname + '/Public/Styles'));
app.use('/images', express.static(__dirname + '/Public/Images'));
app.use('/scripts', express.static(__dirname + '/Public/Scripts'));

app.use('/', async (req, res) => {
    return res.render('index', {
        title: "Placeholder Title!"
    });
});

const server = createServer(app);
const io = socketio(server);

io.on('connect', (socket: SocketIO.Socket) => {
    console.log('Connected!');

    socket.on('newUser', (login: LoginPacket) => {
        addUser(login, socket);
    })
})

server.listen(process.env.PORT || 8080);

setInterval(() => {
    get('http://projectseveryweek.com/');
}, 300000);