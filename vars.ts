import { User } from './Entities/User';
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
    await mongoCon.addPoints(user, 1);
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
    },
    {
        'trigger': '::setpoints',
        'response': async (packet: CommandPacket) => {
            switch (packet.platform) {
                case "discord":
                    if (packet.user.admin != true) { return `you don't have permission to use that!` };
                    if (packet.args.length != 3) { return `you're not using the command properly!` };
                default:
                    if (packet.user.admin != true) { return `${packet.user.username}, you don't have permission to use that!` };
                    if (packet.args.length != 3) { return `${packet.user.username}, you're not using the command properly!` };
            }
            let target = mongoCon.findUser(packet.args[1]);
            if (target == null) {
                await mongoCon.insertUser(packet.args[1]);
            }
            await mongoCon.setPoints(packet.args[1], parseInt(packet.args[2]));
            switch (packet.platform) {
                case "discord":
                    return `<@${packet.args[1]}> now has ${packet.user.points + parseInt(packet.args[2])} points`;
                default:
                    return `${packet.args[1]} now has ${packet.user.points + parseInt(packet.args[2])} points`;
            }
        }
    },
    {
        'trigger': '::addpoints',
        'response': async (packet: CommandPacket) => {
            switch (packet.platform) {
                case "discord":
                    if (packet.user.admin != true) { return `you don't have permission to use that!` };
                    if (packet.args.length != 3) { return `you're not using the command properly!` };
                default:
                    if (packet.user.admin != true) { return `${packet.user.username}, you don't have permission to use that!` };
                    if (packet.args.length != 3) { return `${packet.user.username}, you're not using the command properly!` };
            }
            let target: User = await mongoCon.findUser(packet.args[1]);
            if (target == null) {
                await mongoCon.insertUser(packet.args[1]);
            }
            await mongoCon.addPoints(packet.args[1], parseInt(packet.args[2]));
            switch (packet.platform) {
                case "discord":
                    return `<@${packet.args[1]}> now has ${parseInt(packet.args[2])} more points`;
                default:
                    return `${packet.args[1]} now has ${parseInt(packet.args[2])} more points`;
            }
        }
    },
    {
        'trigger': '::subpoints',
        'response': async (packet: CommandPacket) => {
            switch (packet.platform) {
                case "discord":
                    if (packet.user.admin != true) { return `you don't have permission to use that!` };
                    if (packet.args.length != 3) { return `you're not using the command properly!` };
                default:
                    if (packet.user.admin != true) { return `${packet.user.username}, you don't have permission to use that!` };
                    if (packet.args.length != 3) { return `${packet.user.username}, you're not using the command properly!` };
            }
            let target: User = await mongoCon.findUser(packet.args[1]);
            if (target == null) {
                await mongoCon.insertUser(packet.args[1]);
            }
            await mongoCon.subPoints(packet.args[1], parseInt(packet.args[2]));
            switch (packet.platform) {
                case "discord":
                    return `<@${packet.args[1]}> now has ${parseInt(packet.args[2])} less points`;
                default:
                    return `${packet.args[1]} now has ${parseInt(packet.args[2])} less points`;
            }
        }
    }
]