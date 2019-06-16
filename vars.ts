import { mongoCon } from './main'
import { CommandPacket } from './Entities/CommandPacket';

export function random(a: any[]): any {
    return a[Math.floor(Math.random() * a.length)];
}

export function parseMessage(message: string): Array<string> {
    return message.split(' ');
}

export async function processUser(user: string) {
    let userData = await mongoCon.findUser(user);
    if (userData == null) {
        await mongoCon.insertUser(user);
    }
    return true;
}

export const commands = [
    {
        'trigger': '::points',
        'response': async (packet: CommandPacket) => {
            switch (packet.platform) {
                case "discord":
                    return `you have ${packet.user.points} points`;
                default:
                    return `${packet.user.username}, you have ${packet.user.points} points`;
            }
        }
    }
]