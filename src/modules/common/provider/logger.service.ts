import * as winston from 'winston';

export class LoggerService {
    private readonly instance: winston.Logger;

    public constructor() {
        const format = winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.errors({ stack: true })
        );

        this.instance = winston.createLogger({
            level: 'info',
            silent: false,
            format,
            transports: [
                new winston.transports.Console({
                    stderrLevels: ['error']
                })
            ]
        });
    }

    public info(message: string): void {
        this.instance.info(message);
    }

    public error(message: string, error?: Error): void {
        this.instance.error(message, error);
    }
}
