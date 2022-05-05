import {Telegraf} from 'telegraf';
import axios from 'axios';

console.log('run bot');

const externalServiceHost = process.env.TELEGRAM_BOT_EXTERNAL_SERVICE_HOST;

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', context => {
	context.telegram.sendMessage(context.message.chat.id, 'Hello, buddy!');
	context.telegram.sendMessage(context.message.chat.id, `Your chat id ${context.message.chat.id}`);
	const text = context.message.text;
	let entityId = text.replace(/^\/start/ig, '');
	entityId = entityId.trim();
	if(entityId === '') {
		context.telegram.sendMessage(context.message.chat.id, 'WRONG!!! Entity id is wrong. Need start parameter');
		return;
	}
	axios.post('http://' + externalServiceHost + '/subscribe', {
		entityId: entityId,
		chatId: context.message.chat.id,
	}).then(response => {
		if(response.data === 'OK') {
			context.telegram.sendMessage(context.message.chat.id, `Well done. You subsribe on entity with id - ${entityId}`);
		} else {
			context.telegram.sendMessage(context.message.chat.id, 'WRONG!!!');
		}
	}).catch(error => {
		console.error('WRONG!!! Subscribe error.');
	});
});

bot.on('text', (context) => {
	context.telegram.sendMessage(context.message.chat.id, `You wrote - ${context.message.text}`);
});

bot.launch().then(result => {
	console.log('Bot ready');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));