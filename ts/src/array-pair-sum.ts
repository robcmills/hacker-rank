import { expect } from 'chai';

/*
Write a function, pairSum, that takes in an array and a target sum as arguments. The function should return an array containing a pair of indices whose elements sum to the given target. The indices returned must be unique.

Be sure to return the indices, not the elements themselves.

There is guaranteed to be one such pair that sums to the target.
*/
function pairSum(a: number[], sum: number): number[] | undefined {
  const prev: Record<number, number> = {};
  for (let i = 0; i < a.length; i++) {
    const num = a[i];
    const complement = sum - num;
    if (complement in prev) return [prev[complement], i];
    prev[num] = i;
  }
}

const testCases: [number[], number, number[]][] = [
  [[3, 2, 5, 4, 1], 8, [0, 2]],
  [[4, 7, 9, 2, 5, 1], 5, [0, 5]],
  [[4, 7, 9, 2, 5, 1], 3, [3, 5]],
  [[1, 6, 7, 2], 13, [1, 2]],
  [[9, 9], 18, [0, 1]],
  [[6, 4, 2, 8], 12, [1, 3]],
];

for (let [a, sum, output] of testCases) {
  expect(pairSum(a, sum)).to.deep.equal(output);
}
console.log('All tests passed ✓');
