const TelegramBot = require('node-telegram-bot-api');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = require('./config');

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

module.exports = {
    sendMessage: (message) => {
        bot.sendMessage(TELEGRAM_CHAT_ID, message)
            .catch(error => console.error('Error sending telegram message:', error));
    }
}; 