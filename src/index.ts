import { inspect } from 'util';

import colors = require('colors');
import dateFormat = require('dateformat');

export class Logger {

    public static debug(...args: any[]): void {
        if (Logger.isDebug) {
            const now = dateFormat(new Date(), Logger.format);
            const message = Logger.getMessage(...args);
            console.debug(colors.grey(`[${ now }]`), colors.grey('[DEBUG]'), message);
        }
    }

    public static error(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.error(colors.grey(`[${ now }]`), colors.red('[ERROR]'), message);
    }

    public static hint(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), colors.green('[HINT]'), message);
    }

    public static info(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.info(colors.grey(`[${ now }]`), colors.cyan('[INFO]'), message);
    }

    public static log(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.log(colors.grey(`[${ now }]`), '[LOG]', message);
    }

    public static warn(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        const message = Logger.getMessage(...args);
        console.warn(colors.grey(`[${ now }]`), colors.yellow('[WARN]'), message);
    }

    private static format = 'isoDateTime';
    private static isDebug = [ 'development', 'dev' ].includes(process.env.NODE_ENV || 'dev');

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
