import {MongoClient, Db} from 'mongodb';
const url = 'mongodb+srv://admin:cicada3301@cluster0-fjtom.gcp.mongodb.net/test?retryWrites=true';

export class MongoController {
    cli!: MongoClient;
    db!: Db;
    
    initDB = async () => {
        this.cli = await MongoClient.connect(url, { useNewUrlParser: true });
        this.db = this.cli.db('twitch');
    }

    insertUser = async (user: string) => {
        await this.db.collection('users').insertOne({
            username: user,
            points: 0
        });
    }

    findUser = async (user: string) => {
        return await this.db.collection('users').findOne({
            username: user
        });
    }

    orderUsers = async () => {
        let unordered = await this.db.collection('users').find({}).toArray()
        return unordered.sort((a, b) => {
            return b.points - a.points;
        });
    }

    addPoints = async (user: string, add: number) => {
        await this.db.collection('users').updateOne({
            username: user
        }, {
            '$inc': {
                points: add
            } 
        })
    }
}