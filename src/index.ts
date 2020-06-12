
import { constantCase } from 'change-case';
import * as colors from 'colors';
import * as dateFormat from 'dateformat';
import * as util from 'util';

export class Logger {
    public static getLogger(module?: string): Logger {
        return new Logger(module);
    }

    public colors: boolean = true;
    public hidden: boolean = false;
    public printLevel: boolean = true;
    public format: string | null = 'isoDateTime';

    private type: string;
    private isDebug = [ 'development', 'dev' ].includes(process.env.NODE_ENV || 'dev');
    private currentDepth: number = 0;

    constructor(type: string = '') {
        this.debug = this.debug.bind(this);
        this.error = this.error.bind(this);
        this.hint = this.hint.bind(this);
        this.info = this.info.bind(this);
        this.log = this.log.bind(this);
        this.warn = this.warn.bind(this);
        this.type = constantCase(type);
    }

    public debug(...args: any[]): void {
        if (this.isDebug) {
            this.printLine(colors.grey, 'DEBUG', ...args);
        }
    }

    public error(...args: any[]): void {
        this.printLine(colors.red, 'ERROR', ...args);
    }

    public hint(...args: any[]): void {
        this.printLine(colors.green, 'HINT', ...args);
    }

    public info(...args: any[]): void {
        this.printLine(colors.cyan, 'INFO', ...args);
    }

    public log(...args: any[]): void {
        this.printLine(colors.grey, 'LOG', ...args);
    }

    public warn(...args: any[]): void {
        this.printLine(colors.yellow, 'WARNING', ...args);
    }

    private printElement(arg: any): void {
        process.stdout.write(util.formatWithOptions({ colors: true, depth: null, showHidden: this.hidden }, arg));
    }

    private printArguments(...args: any[]): void {
        args.forEach((arg: any, index: number) => {
            if (index > 0) {
                process.stdout.write(' ');
            }

            if (Array.isArray(arg)) {
                process.stdout.write('[ ');
                this.currentDepth++;
                this.printArguments(...arg);
                this.currentDepth--;
                process.stdout.write(' ]');
            } else if (typeof arg === 'string' && (this.currentDepth > 0 || args.length > 1)) {
                this.printElement(util.inspect(arg, this.hidden, null, true));
            } else if (typeof arg === 'number' || typeof arg === 'boolean' || arg === null || arg === undefined) {
                this.printElement(arg);
            } else if (typeof arg === 'object' && Object.prototype.toString !== arg.toString) {
                this.printElement(arg.toString());
            } else {
                this.printElement(arg);
            }

            if (this.currentDepth > 0 && index < args.length - 1) {
                process.stdout.write(',');
            }
        });
    }

    private printLine(color: colors.Color, level: string, ...args: any[]): void {
        if (this.format !== null) {
            const now = dateFormat(new Date(), this.format);
            process.stdout.write(this.colors ? `${colors.grey(`[${now}]`)} `: `[${now}] `);
        }
        if (this.type !== '') {
            process.stdout.write(this.colors ? `${colors.grey(`[${this.type}]`)} `: `[${this.type}] `);
        }
        if (this.printLevel) {
            process.stdout.write(this.colors ? `${color(`[${level}]`)} `: `[${level}] `);
        }

        this.printArguments(...args);
        process.stdout.write('\n');
    }
}
