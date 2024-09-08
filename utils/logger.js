const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, json, colorize } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const devLogFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), 
        process.env.NODE_ENV === 'production' 
            ? json() 
            : combine(
                colorize({ all: true }), 
                devLogFormat 
            )
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d', 
            level: 'info'
        }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV === 'test') {
    logger.level = 'warn'; 
}

module.exports = logger;
