import express = require("express");
import io = require("socket.io");

const app = express();

app.set('port', 80);
app.set('views', './Views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use((req, res) => {
    return res.render('index');
})