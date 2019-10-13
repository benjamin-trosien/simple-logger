# ts-node-logger

Lightweight logger written in typescript

## Getting Started

Install by using npm

```
npm install ts-node-logger --save
```

### Usage

```
import { Logger } from 'ts-node-logger';

Logger.info('your message')
// [2019-10-13T17:31:21+0200] [INFO] your message

Logger.format = 'dddd, mmmm dS, yyyy, h:MM:ss TT';
Logger.info('your message')
// [Saturday, June 9th, 2007, 5:46:21 PM] [INFO] your message
```

You can use all format options provided by https://www.npmjs.com/package/dateformat