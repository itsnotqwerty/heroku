"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const url = 'mongodb+srv://admin:cicada3301@cluster0-fjtom.gcp.mongodb.net/test?retryWrites=true';
class MongoController {
    constructor() {
        this.initTestDB = async () => {
            this.cli = await mongodb_1.MongoClient.connect(url, { useNewUrlParser: true });
            this.db = this.cli.db('test');
        };
        this.insertUser = async (user) => {
            await this.db.collection('users').insertOne({
                username: user,
                points: 0
            });
        };
        this.deleteUser = async (user) => {
            await this.db.collection('users').deleteMany({
                username: user
            });
        };
        this.findUser = async (user) => {
            return await this.db.collection('users').find({
                username: user
            });
        };
        this.allUsers = async () => {
            return await this.db.collection('users').find({});
        };
        this.addPoint = async (user) => {
            await this.db.collection('users').updateOne({
                username: user
            }, {
                '$inc': {
                    points: 1
                }
            });
        };
        this.resetUsers = async () => {
            await this.db.collection('users').deleteMany({});
        };
    }
}
exports.MongoController = MongoController;
