"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./Entities/mongo");
const entities_1 = require("./Entities/entities");
const uuid = require("uuid/v5");
const mongo = new mongo_1.MongoCon();
async function addUser(username, password) {
    var user = {
        reviews: [],
        uuid: uuid('www.projectseveryweek.com', uuid.DNS),
        username: username,
        password: password
    };
    mongo.insertUser(new entities_1.Document(user));
}
exports.addUser = addUser;
