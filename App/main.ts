import express = require("express");
import socketio = require("socket.io");
import { get, createServer } from "http";
import { Node } from './Entities/entities';
import { MongoCon } from './Entities/mongo';

const app = express();
const mongo = new MongoCon();

app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');

app.use('/styles', express.static(__dirname + '/Public/Styles'));
app.use('/images', express.static(__dirname + '/Public/Images'));
app.use('/scripts', express.static(__dirname + '/Public/Scripts'));

app.use('/', async (req, res) => {
    return res.render('index', {
        title: "The JSON File",
        json: JSON.stringify(await mongo.getNode(), null, 2)
    });
});

const server = createServer(app);
const io = socketio(server);

io.on('connect', (socket: SocketIO.Socket) => {
    console.log('Connected!');

    socket.on('nodeUpdate', (packet: Node) => {
        io.sockets.emit('nodeUpdate', packet);
        mongo.updateNode(packet);
    });
})

server.listen(process.env.PORT || 8080);

setInterval(() => {
    get('http://projectseveryweek.com/');
}, 300000);