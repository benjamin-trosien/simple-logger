
import colors = require('colors');
import dateFormat = require('dateformat');
import util = require('util');

export class Logger {
    public static colors = false;
    public static format = 'isoDateTime';
    public static hidden = false;
    public static depth = null;

    public static debug(...args: any[]): void {
        if (Logger.isDebug) {
            const now = dateFormat(new Date(), Logger.format);
            process.stdout.write(`${colors.grey(`[${ now }]`)} ${colors.grey('[DEBUG]')} `);
            console.log(...args);
        }
    }

    public static error(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        process.stdout.write(`${colors.grey(`[${ now }]`)} ${colors.red('[ERROR]')} `);
        console.log(...args);
    }

    public static hint(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        process.stdout.write(`${colors.grey(`[${ now }]`)} ${colors.green('[HINT]')} `);
        console.log(...args);
    }

    public static info(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        process.stdout.write(`${colors.grey(`[${ now }]`)} ${colors.cyan('[INFO]')} `);
        console.log(...args);
    }

    public static log(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        process.stdout.write(`${colors.grey(`[${ now }]`)} [LOG] `);
        console.log(...args);
    }

    public static warn(...args: any[]): void {
        const now = dateFormat(new Date(), Logger.format);
        process.stdout.write(`${colors.grey(`[${ now }]`)} ${colors.cyan('[WARNING]')} `);
        console.log(...args);
    }

    private static isDebug = [ 'development', 'dev' ].includes(process.env.NODE_ENV || 'dev');

    private static print(arg: any): void {
        process.stdout.write(util.formatWithOptions({ colors: Logger.colors, depth: Logger.depth, showHidden: Logger.hidden }, arg));
    }

    private static printArguments(...args: any[]): void {
        args.forEach((arg: any) => {
            process.stdout.write(' ');

            if (Array.isArray(arg)) {
                process.stdout.write('[ ');
                Logger.printArguments(...arg);
                process.stdout.write(' ]');
                return;
            }

            if (typeof arg === 'object' && !!arg && Object.prototype.toString !== arg.toString) {
                Logger.print(arg.toString());
            } else {
                Logger.print(arg);
            }
        });
    }
}
