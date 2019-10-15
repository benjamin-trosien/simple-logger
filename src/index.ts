import { inspect } from 'util';

const colors = require('colors');
const dateFormat = require('dateformat');

export class Logger {
    private static format = 'isoDateTime';
    private static isDebug = [ 'development', 'dev' ].includes(process.env.NODE_ENV || 'dev');

    static debug(...args: any[]) {
        if (Logger.isDebug) {
            const now = dateFormat(new Date(), Logger.format);
            const message = Logger.getMessage(...args);
            console.log(colors.grey(`[${ now }]`), colors.grey('[DEBUG]'), message);
        }
    }

    static error(...args: any[]) {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.red('[ERROR]'), message);
    }

    static hint(...args: any[]) {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.magenta('[HINT]'), message);
    }

    static info(...args: any[]) {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.cyan('[INFO]'), message);
    }

    static log(...args: any[]) {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), '[LOG]', message);
    }

    static warn(...args: any[]) {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.yellow('[WARN]'), message);
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
