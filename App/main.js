"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
const mongo_1 = require("./Entities/mongo");
const user_1 = require("./user");
const mongo = new mongo_1.MongoCon();
const app = express();
app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');
app.use('/styles', express.static(__dirname + '/Public/Styles'));
app.use('/images', express.static(__dirname + '/Public/Images'));
app.use('/videos', express.static(__dirname + '/Public/Videos'));
app.use(async (req, res) => {
    await user_1.addUser('admin', 'admin');
    return res.render('index', {
        title: "Placeholder Title!"
    });
});
app.listen(process.env.PORT || 8080);
setInterval(() => {
    http_1.get('https://projectseveryweek.com/');
}, 300000);
