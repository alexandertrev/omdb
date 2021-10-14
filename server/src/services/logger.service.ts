/* eslint-disable no-console */
import _ from 'lodash';

const concatArr = (x: any[]): string => {
  return _.reduce(
    x,
    (sum: string, curr: string) => {
      const currStr = typeof curr === 'object' ? JSON.stringify(curr, null, 2) : curr;
      sum = `${sum}${currStr}`;
      return sum;
    },
    '',
  );
};

const displayDate = (): string => `\x1b[96m${new Date().toISOString()}:\x1b[0m`;

const title = (title: string, ...x: any[]): void => {
  console.log(`${displayDate()} \x1b[92m[${title}]\x1b[0m ${concatArr(x)}`);
};

const log = (...x: any[]): void => {
  console.log(`${displayDate()} \x1b[92m[INFO]\x1b[0m ${concatArr(x)}`);
};

const debug = (...x: any[]): void => {
  console.log(`${displayDate()} \x1b[96m[DEBUG]\x1b[0m ${concatArr(x)}`);
};

const warn = (...x: any[]): void => {
  console.log(`${displayDate()} \x1b[93m[WARN]\x1b[0m ${concatArr(x)}`);
};

const error = (...x: any[]): void => {
  console.error(`${displayDate()} \x1b[91m[ERROR]\x1b[0m ${concatArr(x)}`);
};

export const logger = {
  log,
  warn,
  debug,
  error,
  title,
  displayDate,
};
