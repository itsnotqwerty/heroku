/*
    DO NOT EDIT! IT IS AGAINST THE RULES TO EDIT THIS FILE!
    THIS IS MEANT TO BE AN EXAMPLE CODE PIECE
*/
import * as core from "express-serve-static-core";

export class ExampleModule {
    load(app: core.Express) {
        app.set('views', __dirname + '/Views');
        app.set('view engine', 'pug');
        app.use((req, res) => {
            return res.render('index');
        })
    }
}