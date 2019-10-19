import { Logger } from './src';

Logger.debug('debug');
Logger.error('error');
Logger.hint('hint');
Logger.info('info');
Logger.log('log');
Logger.warn('warn');

class CustomToString {
    private value: number;

    constructor(value: number) {
        this.value = value;
    }

    public toString(): string {
        return `My value is ${ this.value }`;
    }
}

console.log('=========> Basic types <=========');
console.log(1);
Logger.log(1);
console.log(undefined);
Logger.log(undefined);
console.log(true);
Logger.log(true);
console.log(null);
Logger.log(null);
console.log('test');
Logger.log('test');
console.log(1, undefined, true, null, 'test');
Logger.log(1, undefined, true, null, 'test');

console.log('\n\n=========> Class with "toString" implementation <=========');
console.log(new CustomToString(1));
Logger.log(new CustomToString(1));

console.log('\n\n=========> Objects <=========');
console.log({ sample: true, value: 1, title: 'test' });
Logger.log({ sample: true, value: 1, title: 'test' });

console.log('\n\n=========> Array of primitives <=========');
console.log([ 1, undefined, true, null, 'test' ]);
Logger.log([ 1, undefined, true, null, 'test' ]);

console.log('\n\n=========> Array of objects <=========');
console.log([ { sample: true } ]);
Logger.log([ { sample: true } ]);

console.log('\n\n=========> Array of class with "toString" implementation <=========');
console.log([ new CustomToString(1) ]);
Logger.log([ new CustomToString(1) ]);
