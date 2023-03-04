import { expect } from 'chai';

/*
Dutch National Flag problem

Given N balls of colour red, white or blue arranged in a line in random order. You have to arrange all the balls such that the balls with the same colours are adjacent with the order of the balls, with the order of the colours being red, white and blue (i.e., all red coloured balls come first then the white coloured balls and then the blue coloured balls).

Pointer approach:

Iterate the array.
For each value, if it is 0 then move it to low range.
Else if it is 2, move it to high range.
Else value must be 1, and skip it.

[0, 0, 1, 1, 2, 2],
 ^              ^
 lm             h
*/
function segregate(a: number[]) {
  let low = 0;
  let mid = 0;
  let high = a.length - 1;

  while (mid <= high) {
    const current = a[mid];
    if (current === 0) {
      swap(low, mid, a);
      low++;
      mid++;
    } else if (current === 1) {
      mid++;
    } else if (current === 2) {
      swap(mid, high, a);
      high--;
    }
  }

  return a;
}

function swap(a: any, b: any, array: any[]) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

const testCases = [
  [
    [0, 1, 2, 0, 1, 2],
    [0, 0, 1, 1, 2, 2],
  ],
  [
    [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2],
  ],
  [
    [2, 1, 0],
    [0, 1, 2],
  ],
  [[0], [0]],
  [[1], [1]],
  [[2], [2]],
  [
    [0, 0],
    [0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [2, 2],
    [2, 2],
  ],
];

for (let [input, output] of testCases) {
  expect(segregate(input)).to.deep.equal(output);
}
