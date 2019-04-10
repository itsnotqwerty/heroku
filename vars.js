"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
function random(a) {
    return a[Math.floor(Math.random() * a.length)];
}
exports.random = random;
exports.expletives = [
    'Fuck off!',
    'Go to hell!',
    'Eat shit!',
    'Die in a fire!'
];
exports.responses = [
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
];
exports.commands = [
    {
        'trigger': '::8ball',
        'response': async (message) => {
            if (!(message.content.length > 7)) {
                return 'Ask a question, dumbass!';
            }
            return `Q: ${message.content.slice(8)} \nA: ${random(exports.responses)}`;
        }
    },
    {
        'trigger': '::points',
        'response': async (message) => {
            let userData = await main_1.mongoCon.findUser(message.author.id);
            return `<@${message.author.id}> has ${userData}`;
        }
    }
];
