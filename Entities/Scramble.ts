import { CommandPacket } from './CommandPacket';
import { mongoCon } from '../main';
export class Scramble {
    trigger: string;
    scrambled: string;
    response: (packet: CommandPacket) => string;
    difficulty: number;

    constructor(scrambled: string, unscrambled: string) {
        this.scrambled = scrambled;
        this.trigger = unscrambled;
        this.difficulty = unscrambled.length;
        this.response = (packet: CommandPacket) => {
            mongoCon.addPoints(packet.user.username, this.difficulty);
            return `CORRECT! The answer to the scramble was ${this.trigger}!`;
        }
    }
}