import { MongoClient } from "mongodb";
import { Node } from "./entities";


export class MongoCon {
    private db: string;

    constructor() {
        this.db = process.env.MONGO_DBNAME!;
    }

    async updateNode(node: Node) {
        let cli = await MongoClient.connect(process.env.MONGO_URI!, {useNewUrlParser: true})
        let cursor = await cli.db(this.db).collection('json').findOne({}) as Node;
        console.log(JSON.stringify(cursor));
        await cli.db(this.db).collection('json').deleteOne({});
        await cli.db(this.db).collection('json').insertOne(node);
        cli.close();
    }

    async getNode(): Promise<Node> {
        let cli = await MongoClient.connect(process.env.MONGO_URI!, {useNewUrlParser: true})
        let cursor = await cli.db(this.db).collection('json').findOne({}) as Node;
        return cursor;
        cli.close();
    }
}