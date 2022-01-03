import { expect } from 'chai';
import { swap } from './swap.mjs';

export function insertionSort(array) {
  let i = 1;
  while (i < array.length) {
    let j = i;
    while (j > 0 && array[j - 1] > array[j]) {
      swap(array, j, j - 1);
      j--;
    }
    i++;
  }
}

function test(array, expected) {
  insertionSort(array);
  expect(array).to.deep.equal(expected);
}

test([], []);
test([1], [1]);
test([1, 2], [1, 2]);
test([2, 1], [1, 2]);
test([1, 2, 3], [1, 2, 3]);
test([1, 3, 2], [1, 2, 3]);
test([3, 2, 1], [1, 2, 3]);
