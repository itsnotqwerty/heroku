/*
    DO NOT EDIT! IT IS AGAINST THE RULES TO EDIT THIS FILE!
    THIS IS MEANT TO BE AN EXAMPLE CODE PIECE
*/
import express = require("express");

const app = express();

export class ExampleModule {
    load() {
        app.set('views', './Views');
        app.set('view engine', 'pug');
        app.use((req, res) => {
            return res.render('index');
        })
    }
}