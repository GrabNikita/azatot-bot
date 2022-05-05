import {Telegraf} from 'telegraf';

console.log('run bot');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
	ctx.telegram.sendMessage(ctx.message.chat.id, 'Hello, buddy!');
	ctx.telegram.sendMessage(ctx.message.chat.id, JSON.stringify(ctx.message));
});

bot.on('text', (ctx) => {
	ctx.telegram.sendMessage(ctx.message.chat.id, `You wrote powerful ${ctx.message.text}`);
	ctx.telegram.sendMessage(ctx.message.chat.id, `Your chat id ${ctx.message.chat.id}`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));