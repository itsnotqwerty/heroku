import { User } from './Entities/User';
import { mongoCon } from './main';
import * as discord from 'discord.js';

export function random(a: any[]): any {
    return a[Math.floor(Math.random() * a.length)];
}

export const expletives = [
    'Fuck off!',
    'Go to hell!',
    'Eat shit!',
    'Die in a fire!'
]

export const responses = [
    'Not likely, shithead.',
    'Go fuck yourself. Not gonna happen.',
    'Ask me again later.',
    'Maybe it\'ll happen if you ask for it nicer',
    'Mmmmm, no.',
    'It\'s *possible*',
    'Sure, whatever.',
    'lmao yea',
    '*Maybe*',
    'Yes. The answer is undoubtedly yes.',
    'One can hope.',
    'Communism is gay, and so is that question.',
    'Fuck off.'
]

export const commands = [
    {
        'trigger': '::8ball',
        'response': async (message: discord.Message) => {
            if (!(message.content.length > 7)) {
                return 'Ask a question, dumbass!';
            }
            return `Q: ${message.content.slice(8)} \nA: ${random(responses)}`;
        }
    },
    {
        'trigger': '::points',
        'response': async (message: discord.Message) => {
            let userData: User = await mongoCon.findUser(message.author.id);
            return `<@${message.author.id}> has ${userData.points} points`;
        }
    }
]
