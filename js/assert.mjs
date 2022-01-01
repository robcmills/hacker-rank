'use strict';

export function assert(condition) {
  if (!condition) {
    throw 'Assertion failed';
  }
}
