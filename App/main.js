"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
const app = express();
app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');
app.use('/styles', express.static(__dirname + '/Public/Styles'));
app.use('/images', express.static(__dirname + '/Public/Images'));
app.use('/videos', express.static(__dirname + '/Public/Videos'));
app.use((req, res) => {
    return res.render('index', {
        title: 'DataBin'
    });
});
app.listen(process.env.PORT || 8080);
setInterval(() => {
    http_1.get('http://infinite-dusk-64948.herokuapp.com/');
}, 300000);
