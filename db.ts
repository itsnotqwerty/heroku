import {MongoClient, Db} from 'mongodb';
const url = 'mongodb+srv://admin:cicada3301@cluster0-fjtom.gcp.mongodb.net/test?retryWrites=true';

export class MongoController {
    cli!: MongoClient;
    db!: Db;
    
    initTwitchDB = async () => {
        this.cli = await MongoClient.connect(url, { useNewUrlParser: true });
        this.db = this.cli.db('twitch');
    }

    insertUser = async (user: string) => {
        await this.db.collection('users').insertOne({
            username: user,
            points: 0
        });
    }

    deleteUser = async (user: string) => {
        await this.db.collection('users').deleteMany({
            username: user
        });
    }

    findUser = async (user: string) => {
        return await this.db.collection('users').findOne({
            username: user
        });
    }

    allUsers = async () => {
        return await this.db.collection('users').find({});
    }

    addPoints = async (user: string, inc: number) => {
        await this.db.collection('users').updateOne({
            username: user
        }, {
            '$inc': {
                points: inc
            } 
        })
    }

    setPoints = async (user: string, set: number) => {
        await this.db.collection('users').updateOne({
            username: user
        }, {
            '$set': {
                points: set
            } 
        })
    }

    resetUsers = async () => {
        await this.db.collection('users').deleteMany({});
    }
}