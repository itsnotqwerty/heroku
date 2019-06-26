import express = require("express");
import io = require("socket.io");

const app = express();

app.set('views', __dirname + '/Views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use((req, res) => {
    return res.render('index');
});

app.listen(process.env.PORT || 8080);