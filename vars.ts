import { mongoCon } from './main';
import { Scramble } from './Entities/Scramble';
import { words } from './Data/WordList'

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

export const scrambles: Scramble[] = [];

setInterval(() => {
    if (scrambles.length >= 10) { return }; 
    let unscrambled = random(words);
    let scrambled = unscrambled.split('').sort(() => {return 0.5-Math.random()}).join('');
    scrambles.push(new Scramble(scrambled, unscrambled));
}, 5000);