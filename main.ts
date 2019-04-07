import * as discord from 'discord.js';
import express from 'express';
import * as http from 'http';

const bot: discord.Client = new discord.Client();
const web: express.Express = express();
const PORT = process.env.PORT || 5000;

const expletives = [
    'Fuck off!',
    'Go to hell!',
    'Eat shit!',
    'Die in a fire!'
]
const responses = [
    'Not likely, shithead.',
    'Go fuck yourself. Not gonna happen.',
    'Ask me again later.',
    'Maybe it\'ll happen if you ask for it nicer',
    'Mmmmm, no.',
    'It\'s *possible*',
    'Sure, whatever.',
    'I take no responsibility for what happens',
    'lmao yea',
    '*Maybe*',
    'Yes. The answer is undoubtedly yes.',
    'One can hope.',
    'Communism is gay, and so is that question.',
    'Fuck off.'
]


const commands = [
    {
        'trigger': '::8ball',
        'response': (message: discord.Message) => {
            if (!(message.content.length > 7)) {
                return 'Ask a question, dumbass!';
            }
            return `Q: ${message.content.slice(8)} \nA: ${random(responses)}`;
        }
    }
]

function random(a: any[]): any {
    return a[Math.floor(Math.random() * a.length)];
}

web.listen(PORT);

bot.on('message', (message: discord.Message) => {
    if (!message.content.startsWith('::')) { return };
    for (let command of commands) {
        if (message.content.startsWith(command.trigger)) {
            message.channel.send(command.response(message));
            return;
        }
    }
    message.channel.send(random(expletives));
});

bot.on('error', (err: Error) => {
    console.log('Oopsies! There was a fucky wucky! uwu');
})

bot.login('NTM1NTIzNzM3MTU2NTgzNDQ0.XKgv4Q.VX4OvA-lsds1RYkvZBe-uidaTM4');

setInterval(() => {
    http.get("http://infinite-dusk-64948.herokuapp.com/");
}, 600000);