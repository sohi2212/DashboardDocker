import TelegramBot from 'node-telegram-bot-api';

class TelegramNotificationBot {
    constructor(token, chatId) {
        this.bot = new TelegramBot(token, { polling: false });
        this.chatId = chatId;
    }

    async sendMessage(message) {
        try {
            await this.bot.sendMessage(this.chatId, message);
            console.log(`Сообщение отправлено: ${message}`);
        } catch (error) {
            console.error(`Ошибка при отправке сообщения: ${error.message}`);
        }
    }
}

export default TelegramNotificationBot;

    