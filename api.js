import express from 'express';
import {Telegraf} from 'telegraf';

console.log('run api');

const port = 80;
const host = '0.0.0.0';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bot = new Telegraf(process.env.BOT_TOKEN);

app.get('/', (request, response) => {
	bot.telegram.sendMessage(process.env.TEST_CHAT_ID, 'I see you...').then(result => {
		response.send('Check your telegram, dude.');
	}).catch(error => {
		response.sendStatus(400);
		response.send('Oh shit. Here we go again.');
	});
});

app.post('/send-message', (request, response) => {
	const chatId = request.body.chatId;
	const message = request.body.message;
	bot.telegram.sendMessage(chatId, message).catch(error => {
		response.sendStatus(400);
		response.send('Message wasn\'t sent');
	});
});

app.listen(port, host,() => {
	console.log(`Bot api listening on ${host}:${port}`);
});