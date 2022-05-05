import express from 'express';
import {Telegraf} from 'telegraf';

console.log('run api');

const port = 80;
const host = '0.0.0.0';

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

app.get('/', (req, res) => {
	res.send('Hello World!');
	bot.telegram.sendMessage(826060510, 'I see you...');
});

app.listen(port, host,() => {
	console.log(`Bot api listening on ${host}:${port}`);
});