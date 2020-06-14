import { Logger } from './src';

const logger = Logger.getLogger({ format: 'default', module: 'example-module' });
logger.info('example message')

class CustomToString {
    private value: number;

    constructor(value: number) {
        this.value = value;
    }

    public toString(): string {
        return `My value is ${ this.value }`;
    }
}

logger.level = false;
logger.format = null;
logger.module = null;

console.log('=========> Log levels <=========');
logger.debug('debug');
logger.error('error');
logger.hint('hint');
logger.info('info');
logger.log('log');
logger.warn('warn');

console.log('=========> Basic types <=========');
console.log(1);
logger.log(1);
console.log(undefined);
logger.log(undefined);
console.log(true);
logger.log(true);
console.log(null);
logger.log(null);
console.log('test');
logger.log('test');
console.log(1, undefined, true, null, 'test');
logger.log(1, undefined, true, null, 'test');

console.log('\n\n=========> Class with "toString" implementation <=========');
console.log(new CustomToString(1));
logger.log(new CustomToString(1));

console.log('\n\n=========> Objects <=========');
console.log({ sample: true, value: 1, title: 'test' });
logger.log({ sample: true, value: 1, title: 'test' });

console.log('\n\n=========> Arrays <=========');
console.log([1, undefined, true, null, 'test', { sample: 1 } ]);
logger.log([ 1, undefined, true, null, 'test', { sample: 1 } ]);

console.log('\n\n=========> Array of a single string <=========');
console.log([ 'single string' ]);
logger.log([ 'single string' ]);

console.log('\n\n=========> Array of objects <=========');
console.log([ { sample: true, _private: true }, new CustomToString(2)]);
logger.log([ { sample: true, _private: true }, new CustomToString(2) ]);

console.log('\n\n=========> Arrays with nested objects <=========');
console.log([ { parent: [ { child: true } ] } ]);
logger.log([ { parent: [ { child: true } ] } ]);

console.log('\n\n=========> Object with array property <=========');
console.log({ list: [ { nested: true }, new CustomToString(3) ] });
logger.log({ list: [ { nested: true }, new CustomToString(3) ] });
