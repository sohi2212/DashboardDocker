import winston from 'winston';
import { currentTime } from './timeUtils.js'; // Импортируем вашу функцию currentTime

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: currentTime() }), // Используем вашу функцию для получения времени
        winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
            )
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
});

export default logger;
