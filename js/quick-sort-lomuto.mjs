import { expect } from 'chai';
import { swap } from './swap.mjs';

export function lomutoPartition(array, start, end) {
  const pivot = array[end];
  let i = start - 1; // pivot index
  for (let j = start; j < end; j++) {
    if (array[j] <= pivot) {
      i++;
      swap(array, i, j);
    }
  }
  i++;
  swap(array, i, end);
  return i;
}

/**
 * Lomuto partition sheme quick sort
 * @param array Array of integers to be sorted
 * @returns array Same array as input (sort occurs in place)
 */
export function quickSort(array, start = 0, end = array.length - 1) {
  if (start >= end || start < 0) return;

  const pivot = lomutoPartition(array, start, end);

  quickSort(array, start, pivot - 1);
  quickSort(array, pivot + 1, end);
}

function test(array, expected) {
  quickSort(array);
  expect(array).to.deep.equal(expected);
}

test([], []);
test([1], [1]);
test([1, 2], [1, 2]);
test([2, 1], [1, 2]);
test([1, 2, 3], [1, 2, 3]);
test([1, 3, 2], [1, 2, 3]);
test([3, 2, 1], [1, 2, 3]);
