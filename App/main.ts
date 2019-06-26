import express = require("express");
import io = require("socket.io");

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', './Views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use((req, res) => {
    return res.render('index');
});