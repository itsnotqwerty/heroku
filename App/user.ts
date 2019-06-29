import { MongoCon } from './Entities/mongo';
import { Document, PrivateUser, LoginPacket } from './Entities/entities';
import uuid = require('uuid/v5');

const mongo = new MongoCon();

export async function addUser(login: LoginPacket) {
    var user: PrivateUser = {
        reviews: [],
        uuid: uuid('www.projectseveryweek.com', uuid.DNS),
        username: login.username,
        password: login.password 
    }
    mongo.insertUser(new Document(user));
}