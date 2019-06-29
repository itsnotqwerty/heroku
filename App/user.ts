import { MongoCon } from './Entities/mongo';
import { Document, PrivateUser } from './Entities/entities';
import uuid = require('uuid/v5');

const mongo = new MongoCon();

export async function addUser(username: string, password: string) {
    var user: PrivateUser = {
        reviews: [],
        uuid: uuid('www.projectseveryweek.com', uuid.DNS),
        username: username,
        password: password 
    }
    mongo.insertUser(new Document(user));
}