import { expect } from 'chai';
import { arrayManipulation } from './array-manipulation.mjs';

expect(
  arrayManipulation(10, [
    [1, 5, 3],
    [4, 8, 7],
    [6, 9, 1],
  ])
).to.equal(10);
expect(
  arrayManipulation(5, [
    [1, 2, 100],
    [2, 5, 100],
    [3, 4, 100],
  ])
).to.equal(200);
