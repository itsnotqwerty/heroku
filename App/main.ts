import express = require("express");
import io = require("socket.io");
import { get } from "http";
import { MongoCon } from "./Entities/mongo";
import { addUser } from "./user";

const mongo = new MongoCon();

const app = express();

app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');

app.use('/styles', express.static(__dirname + '/Public/Styles'));
app.use('/images', express.static(__dirname + '/Public/Images'));
app.use('/videos', express.static(__dirname + '/Public/Videos'));

app.use(async (req, res) => {
    await addUser('admin', 'admin');
    return res.render('index', {
        title: "Placeholder Title!"
    });
});

app.listen(process.env.PORT || 8080);

setInterval(() => {
    get('https://projectseveryweek.com/')
}, 300000);