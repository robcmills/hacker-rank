import { expect } from 'chai';

/*
https://structy.net/problems/premium/five-sort

### Problem

Write a function, fiveSort, that takes in an array of numbers as an argument. The function should rearrange elements of the array such that all 5s appear at the end. Your function should perform this operation in-place by mutating the original array. The function should return the array.

Elements that are not 5 can appear in any order in the output, as long as all 5s are at the end of the array.

### Approach

Create two pointers, starting at the first and last numbers:

[12,5,1,5,7]
 ^        ^
 i        j

While i < j
if a[j] is already a five, decrement j (until a[j] is not a 5)
else if a[i] is 5, swap i and j, and increment i
else increment i
*/
function fiveSort(a: number[]): number[] {
  let i = 0;
  let j = a.length - 1;
  let temp = 1;
  while (i < j) {
    if (a[j] === 5) {
      j--;
    } else if (a[i] === 5) {
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
      i++;
    } else {
      i++;
    }
  }
  return a;
}

const fives = new Array(20000).fill(5);
const fours = new Array(20000).fill(4);

const testCases = [
  [
    [12, 5, 1, 5, 12, 7],
    [12, 7, 1, 12, 5, 5],
  ],
  [
    [5, 2, 5, 6, 5, 1, 10, 2, 5, 5],
    [2, 2, 10, 6, 1, 5, 5, 5, 5, 5],
  ],
  [
    [5, 5, 5, 1, 1, 1, 4],
    [4, 1, 1, 1, 5, 5, 5],
  ],
  [
    [5, 5, 6, 5, 5, 5, 5],
    [6, 5, 5, 5, 5, 5, 5],
  ],
  [
    [5, 1, 2, 5, 5, 3, 2, 5, 1, 5, 5, 5, 4, 5],
    [4, 1, 2, 1, 2, 3, 5, 5, 5, 5, 5, 5, 5, 5],
  ],
  [
    [...fives, ...fours],
    [...fours, ...fives],
  ],
];

for (let [input, output] of testCases) {
  expect(fiveSort(input)).to.deep.equal(output);
}
console.log('All tests passed ✓');
