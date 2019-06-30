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
        this.mongoCli.connect().then((cli: MongoClient) => {
            cli.db(this.db).collection('reviews').insertOne(entity);
            cli.close();
        });
    }

    async insertUser(entity: Document<PrivateUser>) {
        this.mongoCli.connect().then((cli: MongoClient) => {
            cli.db(this.db).collection('users').insertOne(entity);
            cli.close();
        });
    }

    async getPrivateUser(identifier: LoginPacket) {

    }
}