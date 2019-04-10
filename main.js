"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const discord = __importStar(require("discord.js"));
const express_1 = __importDefault(require("express"));
const v = __importStar(require("./vars"));
const http = __importStar(require("http"));
const bot = new discord.Client();
const web = express_1.default();
const PORT = process.env.PORT || 5000;
exports.mongoCon = new db_1.MongoController();
web.listen(PORT);
bot.on('message', async (message) => {
    let userData = await exports.mongoCon.findUser(message.author.id);
    if (await userData.count() == 0) {
        await exports.mongoCon.insertUser(message.author.id);
    }
    await exports.mongoCon.addPoint(message.author.id);
    if (!message.content.startsWith('::')) {
        return;
    }
    ;
    for (let command of v.commands) {
        if (message.content.startsWith(command.trigger)) {
            message.channel.send(await command.response(message));
            return;
        }
    }
    message.channel.send(v.random(v.expletives));
});
bot.on('error', (err) => {
    console.log('Oopsies! There was a fucky wucky! uwu');
});
var init = async () => {
    await exports.mongoCon.initTestDB();
    bot.login('NTM1NTIzNzM3MTU2NTgzNDQ0.XKgv4Q.VX4OvA-lsds1RYkvZBe-uidaTM4');
};
setInterval(() => {
    http.get("http://infinite-dusk-64948.herokuapp.com/");
}, 600000);
init();
