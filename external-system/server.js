import express from 'express';
import axios from 'axios';

console.log('run external service');

const port = 80;
const host = '0.0.0.0';
const botApiHost = process.env.TELEGRAM_BOT_HOST;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/subscribe', (request, response) => {
	console.log('subscribe body', request.body);
	response.send('OK');
});

app.get('/send-message', (request, response) => {
	const chatId = request.query.chatId;
	const message = request.query.message;
	axios.post('http://' + botApiHost + '/send-message', {
		chatId: chatId,
		message: message,
	});
	response.send('OK');
});

app.listen(port, host, () => {
	console.log(`External service listening on ${host}:${port}`);
});