import express = require("express");
import io = require("socket.io");
import { Http2SecureServer } from "http2";
import { get } from "http";

const app = express();

app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use((req, res) => {
    return res.render('index', {
        url: req.url
    });
});

app.listen(process.env.PORT || 8080);

setInterval(() => {
    get('https://infinite-dusk-64948.herokuapp.com/')
}, 300000);