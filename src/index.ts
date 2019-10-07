import { inspect } from 'util';

const colors = require('colors');
const dateFormat = require('dateformat');

export class Logger {
    static format = 'isoDateTime';

    static warn(...args: any[]) {
        const now = dateFormat(new Date(), this.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.yellow('[WARN]'), message);
    }

    static error(...args: any[]) {
        const now = dateFormat(new Date(), this.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.red('[ERROR]'), message);
    }

    static debug(...args: any[]) {
        const now = dateFormat(new Date(), this.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.grey('[DEBUG]'), message);
    }

    static info(...args: any[]) {
        const now = dateFormat(new Date(), this.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.cyan('[INFO]'), message);
    }

    static hint(...args: any[]) {
        const now = dateFormat(new Date(), this.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.magenta('[HINT]'), message);
    }

    static log(...args: any[]) {
        const now = dateFormat(new Date(), this.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), '[LOG]', message);
    }

    private static getMessage(...args: any[]): string {
        return args.map((arg) => {
            if (arg === undefined || arg === null) {
                return JSON.stringify(arg);
            }
            if (Object.prototype.toString === arg.toString) {
                return inspect(arg);
            }
            return arg.toString();
        }).join(' ');
    }
}
