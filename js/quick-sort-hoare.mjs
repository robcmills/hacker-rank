import { expect } from 'chai';
import { swap } from './swap.mjs';

function partition(array, start, end) {
  const p = array[Math.floor((start + end) / 2)];
  let i = start - 1;
  let j = end + 1;
  while (true) {
    do {
      i++;
    } while (array[i] < p);
    do {
      j--;
    } while (array[j] > p);
    if (i >= j) return j;
    swap(array, i, j);
  }
}

export function quickSortHoare(array, start = 0, end = array.length - 1) {
  if (start < 0 || end < 0 || start >= end) return;
  const p = partition(array, start, end);
  quickSortHoare(array, start, p); // inclusive of pivot
  quickSortHoare(array, p + 1, end);
}

function test(array, expected) {
  quickSortHoare(array);
  expect(array).to.deep.equal(expected);
}

test([], []);
test([1], [1]);
test([1, 2], [1, 2]);
test([2, 1], [1, 2]);
test([1, 2, 3], [1, 2, 3]);
test([1, 3, 2], [1, 2, 3]);
test([3, 2, 1], [1, 2, 3]);
