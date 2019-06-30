/*
    DO NOT EDIT LINES FIVE THROUGH TEN! IT IS MEANT TO SHOW NEW USERS THE ROPES!
*/

import express = require("express");
const app = express();

import { ExampleModule } from "./Example/example";
const example = new ExampleModule();
example.load(app);