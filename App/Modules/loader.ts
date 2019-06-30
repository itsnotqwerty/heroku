/*
    DO NOT EDIT LINES FIVE THROUGH TEN! IT IS MEANT TO SHOW NEW USERS THE ROPES!
*/

import { ExampleModule } from "./Example/example";
const example = new ExampleModule();
import express = require("express");
const app = express();
example.load(app);
app.listen(process.env.PORT || 8080)