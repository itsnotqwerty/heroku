import { User } from './Entities/User';
import { mongoCon } from './main';
import * as twitch from 'tmi.js';

export function random(a: any[]): any {
    return a[Math.floor(Math.random() * a.length)];
}

export function parseMessage(message: string): Array<string> {
    return message.split(' ');
}

export const commands = [
    {
        'trigger': '::points',
        'response': async (userstate: twitch.Userstate, args: Array<string>) => {
            let userSelf: User = await mongoCon.findUser(userstate.username);
            return `@${userstate.username} has ${userSelf.points} points`;
        }
    },
    {
        'trigger': '::setpoints',
        'response': async (userstate: twitch.Userstate, args: Array<string>) => {
            let userSelf: User = await mongoCon.findUser(userstate.username);
            let userTarget: User = await mongoCon.findUser(args[1]);
            if (userSelf.admin != true) { return `@${userstate.username}, you don't have permission to use that!` };
            if (userTarget == null) {
                await mongoCon.insertUser(userTarget);
            }
            await mongoCon.setPoints(userTarget.username, parseInt(args[2]));
            return `@${userstate.username} now has ${parseInt(args[2])} points`;
        }
    }
]