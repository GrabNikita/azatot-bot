import {Markup, Telegraf} from 'telegraf';
import axios from 'axios';

console.log('run bot');

const externalServiceHost = process.env.TELEGRAM_BOT_EXTERNAL_SERVICE_HOST;

const bot = new Telegraf(process.env.BOT_TOKEN);

const defaultMarkup = Markup
	.inlineKeyboard(
		[
			[
				Markup.button.callback('callback button 1', 'callback_button_1'),
				Markup.button.callback('callback button 2', 'callback_button_2'),
			],
		],
	)
	.resize()
	.oneTime();

bot.start(context => {
	context.reply('Hello, buddy!');
	context.reply(`Your chat id ${context.message.chat.id}`);
	context.reply(`Deep link payload: ${context.startPayload}`);
	const entityId = context.startPayload;
	axios.post('http://' + externalServiceHost + '/subscribe', {
		entityId: entityId, chatId: context.message.chat.id,
	}).then(response => {
		if(response.data === 'OK') {
			context.reply(`Well done. You subscribe on entity with id - ${entityId}`);
		} else {
			context.reply('WRONG!!!');
		}
	}).catch(error => {
		context.reply('WRONG!!! Subscribe error.');
	});
});

bot.help(context => {
	return context.reply(
		`
			<b>help text</b>
			<i>help text 2</i>
			start - This command start work with bot
			help - This command display commands
		`,
		{
			parse_mode: 'HTML',
			...defaultMarkup,
		},
	);
});

bot.on('callback_query', (context) => {
	const callbackData = context.update.callback_query.data;
	switch(callbackData) {
		case 'callback_button_1':
			context.reply('you choose callback button 1', defaultMarkup);
			axios.get('http://' + externalServiceHost + '/entity-list').then(response => {
				console.log('response', response.data);
				const entities = response.data;
				const keyboardMap = [];
				entities.forEach(entity => {
					const date = new Date(entity.date);
					keyboardMap.push([Markup.button.callback(date.toLocaleString(), entity.id)]);
				});
				context.reply(
					`You see ${entities.length} entities.`,
					Markup.inlineKeyboard(keyboardMap),
				);
			}).catch(error => {
				console.error('error', error);
				context.reply('May day! MAY DAY!!!');
			});
			break;
		case 'callback_button_2':
			context.reply('you choose callback button 2', defaultMarkup);
			break;
		default:
			context.reply(`you clicked button with data ${callbackData}`, defaultMarkup);
			break;
	}
});

bot.hears('Hey', (context) => {
	context.reply('Hey you too!)');
});

bot.on('text', (context) => {
	context.reply(`You wrote - ${context.message.text}`, defaultMarkup);
});

bot.launch().then(result => {
	console.log('Bot ready');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));