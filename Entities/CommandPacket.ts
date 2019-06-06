import { User } from './User';
import { mongoCon } from '../main';
import * as v from '../vars';

export class CommandPacket {
    user: User;
    platform: string;
    args: string[];

    constructor() {
        this.user = new User("ERROR", NaN);
        this.platform = "ERROR";
        this.args = [];
    }

    public static init = async (message: string, username: string, platform: string) => {
        let packet = new CommandPacket();
        let user = await packet.getUser(username);
        packet.user = user;
        packet.platform = platform;
        packet.args = v.parseMessage(message);
        return packet;
    }
    
    public getUser = async (username: string) => {
        return await mongoCon.findUser(username);
    }
}