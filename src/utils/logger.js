import { currentTime } from './timeUtils.js';
import TelegramNotificationBot from '../service/TelegramBot.js';

const token = process.env.TELEGRAM_TOKEN;
const chatId = '-1002388090403'; 
const telegramBot = new TelegramNotificationBot(token, chatId);


class Logger {
    constructor() {
        if (typeof require !== 'undefined'){
            this.fs = require('fs');
            this.appLogFile = "../logs/app.log";
            this.criticalLogFile = "../logs/critical.log";
        }
    }

    getTimeStamp(){
        return currentTime();
    }

    log(level, message) {
        const timeStamp = this.getTimeStamp();
        const logMessage = `[${timeStamp}][${level}] ${message}`;

        console.log(logMessage);

        let logFile = this.appLogFile;
        if(level === "CRITICAL"){
            logFile = this.criticalLogFile;
        }

        if (this.fs) {
            this.fs.appendFile(logFile, logMessage + '\n', (err) => {
              if (err) {
                console.error('Ошибка записи в файл логов:', err);
              }
            });
          }
          

    }

    info(message) {
        this.log('INFO', message);
    }
    
    warn(message) {
        this.log('WARN', message);
    }
    
    error(message) {
        this.log('ERROR', message);
        telegramBot.sendMessage(`⛔В работе сайта произошла ошибка: ` + message + '⛔');
    }
    
    critical(message) {
        this.log('CRITICAL', message);
        const timeStamp = this.getTimeStamp();
        telegramBot.sendMessage(`⛔В работе сайта произошла критическая ошибка: ` + message + '⛔');
    }
}

export default Logger;