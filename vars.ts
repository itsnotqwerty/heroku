import { User } from './Entities/User';
import { mongoCon } from './main';
import * as twitch from 'tmi.js';

export function random(a: any[]): any {
    return a[Math.floor(Math.random() * a.length)];
}

export const commands = [
    {
        'trigger': '::points',
        'response': async (userstate: twitch.Userstate) => {
            let userData: User = await mongoCon.findUser(userstate.username);
            return `@${userstate.username} has ${userData.points} points`;
        }
    }
]