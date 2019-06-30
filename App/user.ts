import { MongoCon } from './Entities/mongo';
import { Document, PrivateUser, LoginPacket } from './Entities/entities';
import uuid = require('uuid/v5');
import { Socket } from 'socket.io';

const mongo = new MongoCon();

export async function addUser(login: LoginPacket, socket: Socket) {
    var user: PrivateUser = {
        reviews: [],
        uuid: uuid('www.projectseveryweek.com', uuid.DNS),
        username: login.username,
        password: login.password 
    }
    mongo.insertUser(new Document(user), socket);
}