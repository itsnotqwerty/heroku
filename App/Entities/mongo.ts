import { MongoClient } from "mongodb";
import { Node } from "./entities";
import { Socket } from "socket.io";


export class MongoCon {
    private db: string;

    constructor() {
        this.db = process.env.MONGO_DBNAME!;
    }

    async updateNode(node: Node) {
        MongoClient.connect(process.env.MONGO_URI!, {useNewUrlParser: true}).then(async (cli: MongoClient) => {
            let cursor = await cli.db(this.db).collection('json').findOne({}) as Node;
            console.log(JSON.stringify(cursor));
            await cli.db(this.db).collection('json').deleteOne({});
            await cli.db(this.db).collection('json').insertOne(cursor);
            cli.close();
        });
    }
}