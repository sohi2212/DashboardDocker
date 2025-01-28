import { currentTime } from './timeUtils.js';

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
    }
    
    critical(message) {
        this.log('CRITICAL', message);
    }
}

export default Logger;