"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoCon {
    constructor() {
        this.mongoCli = new mongodb_1.MongoClient(process.env.MONGO_URI);
        this.db = process.env.MONGO_DBNAME;
    }
    async insertReview(entity) {
        await this.mongoCli.connect();
        await this.mongoCli.db(this.db).collection('reviews').insertOne(entity);
        await this.mongoCli.close();
    }
    async insertUser(entity) {
        await this.mongoCli.connect();
        await this.mongoCli.db(this.db).collection('users').insertOne(entity);
        await this.mongoCli.close();
    }
    async getPrivateUser(identifier) {
    }
}
exports.MongoCon = MongoCon;
