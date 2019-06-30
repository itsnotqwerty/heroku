import { MongoClient } from "mongodb";
import { Document, PrivateUser, Review, LoginPacket } from "./entities";


export class MongoCon {
    private mongoCli: MongoClient;
    private db: string;

    constructor() {
        this.mongoCli = new MongoClient(process.env.MONGO_URI!, {useNewUrlParser: true});
        this.db = process.env.MONGO_DBNAME!;
    }

    async insertReview(entity: Document<Review>) {
        await this.mongoCli.connect();
        await this.mongoCli.db(this.db).collection('reviews').insertOne(entity);
        await this.mongoCli.close();
    }

    async insertUser(entity: Document<PrivateUser>) {
        await this.mongoCli.connect();
        await this.mongoCli.db(this.db).collection('users').insertOne(entity);
        await this.mongoCli.close();
    }

    async getPrivateUser(identifier: LoginPacket) {

    }
}