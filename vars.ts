import { User } from './Entities/User';
import { mongoCon } from './main'

export function random(a: any[]): any {
    return a[Math.floor(Math.random() * a.length)];
}

export function parseMessage(message: string): Array<string> {
    return message.split(' ');
}

export async function process(message: string, user: string) {
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
        'response': async (user: string, args: Array<string>) => {
            let userSelf: User = await mongoCon.findUser(user);
            return `@${user} has ${userSelf.points} points`;
        }
    },
    {
        'trigger': '::setpoints',
        'response': async (user: string, args: Array<string>) => {
            let userSelf: User = await mongoCon.findUser(user);
            let userTarget: User = await mongoCon.findUser(args[1]);
            if (userSelf.admin != true) { return `@${user}, you don't have permission to use that!` };
            if (args.length != 3) { return `@${user}, you're not using the command properly!` };
            if (userTarget == null) {
                await mongoCon.insertUser(args[1]);
            }
            await mongoCon.setPoints(userTarget.username, parseInt(args[2]));
            return `@${user} now has ${parseInt(args[2])} points`;
        }
    },
    {
        'trigger': '::addpoints',
        'response': async (user: string, args: Array<string>) => {
            let userSelf: User = await mongoCon.findUser(user);
            let userTarget: User = await mongoCon.findUser(args[1]);
            if (userSelf.admin != true) { return `@${user}, you don't have permission to use that!` };
            if (args.length != 3) { return `@${user}, you're not using the command properly!` };
            if (userTarget == null) {
                await mongoCon.insertUser(args[1]);
            }
            await mongoCon.addPoints(userTarget.username, parseInt(args[2]));
            return `@${user} now has ${parseInt(args[2])} more points`;
        }
    },
    {
        'trigger': '::subpoints',
        'response': async (user: string, args: Array<string>) => {
            let userSelf: User = await mongoCon.findUser(user);
            let userTarget: User = await mongoCon.findUser(args[1]);
            if (userSelf.admin != true) { return `@${user}, you don't have permission to use that!` };
            if (args.length != 3) { return `@${user}, you're not using the command properly!` };
            if (userTarget == null) {
                await mongoCon.insertUser(args[1]);
            }
            await mongoCon.subPoints(userTarget.username, parseInt(args[2]));
            return `@${user} now has ${parseInt(args[2])} less points`;
        }
    }
]