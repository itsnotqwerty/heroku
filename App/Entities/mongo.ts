import { MongoClient } from "mongodb";
import { Document, PrivateUser, Review, LoginPacket } from "./entities";


export class MongoCon {
    private db: string;

    constructor() {
        this.db = process.env.MONGO_DBNAME!;
    }

    async insertReview(entity: Document<Review>) {
        MongoClient.connect(process.env.MONGO_URI!, {useNewUrlParser: true}).then((cli: MongoClient) => {
            cli.db(this.db).collection('reviews').insertOne(entity);
            cli.close();
        });
    }

    async insertUser(entity: Document<PrivateUser>) {
        MongoClient.connect(process.env.MONGO_URI!, {useNewUrlParser: true}).then(async (cli: MongoClient) => {
            let collection = cli.db(this.db).collection('users');
            if (await collection.findOne({username: entity.entries.username}) != null) {
                return {
                    data: "USER EXISTS"
                }
            }
            await collection.insertOne(entity.entries);
            return { data: "SUCCESS" }
        });
    }

    async getPrivateUser(identifier: LoginPacket) {

    }
}