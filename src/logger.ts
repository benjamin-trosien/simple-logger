
import { constantCase } from 'change-case';
import * as colors from 'colors';
import * as dateFormat from 'dateformat';
import * as util from 'util';

export interface ILoggerOptions {
    colored?: boolean;
    format?: string;
    hidden?: boolean;
    level?: boolean;
    module?: string;
}

export class Logger {
    public static getLogger(options?: ILoggerOptions): Logger {
        return new Logger(options);
    }

    set colored(colored: boolean) {
        this.options.colored = colored;
    }

    set format(format: string) {
        this.options.format = format;
    }

    set hidden(hidden: boolean) {
        this.options.hidden = hidden;
    }

    set level(level: boolean) {
        this.options.level = level;
    }

    set module(name: string) {
        this.options.module = constantCase(name || '');
    }

    private options: ILoggerOptions;
    private currentDepth: number = 0;
    private isDebug = [ 'development', 'dev' ].includes(process.env.NODE_ENV || 'dev');

    constructor(options: ILoggerOptions = {}) {
        this.debug = this.debug.bind(this);
        this.error = this.error.bind(this);
        this.hint = this.hint.bind(this);
        this.info = this.info.bind(this);
        this.log = this.log.bind(this);
        this.warn = this.warn.bind(this);

        this.options = {
            colored: true,
            format: 'isoDateTime',
            hidden: false,
            level: true,
            ...options,
            module: constantCase(options?.module || ''),
        };
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
        process.stdout.write(util.formatWithOptions({ colors: this.options.colored, depth: null, showHidden: this.options.hidden }, arg));
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
                this.printElement(util.inspect(arg, this.options.hidden, null, this.options.colored));
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
        if (this.options.format) {
            const now = dateFormat(new Date(), this.format);
            process.stdout.write(this.options.colored ? `${colors.grey(`[${now}]`)} ` : `[${now}] `);
        }
        if (this.options.module) {
            process.stdout.write(`[${this.options.module}] `);
        }
        if (this.options.level) {
            process.stdout.write(this.options.colored ? `${color(`[${level}]`)} ` : `[${level}] `);
        }

        this.printArguments(...args);
        process.stdout.write('\n');
    }
}
