import { expect } from 'chai';

/*
In computer science, the maximum sum subarray problem,
is the task of finding a contiguous subarray with the largest sum,
within a given one-dimensional array A[1...n] of numbers.

A simple single-pass algorithm known as Kadane's algorithm
solves it efficiently.
It can be solved in O(n) time and O(1) space.

Write a function maxSubarraySum that accepts a one-dimensional
array of numbers, and returns an integer representing the
maximum sum of a contiguous subarray.
*/
function maxSubarraySum(numbers: number[]): number {
  let bestSum = 0;
  let currentSum = 0;
  for (let n of numbers) {
    currentSum = Math.max(0, currentSum + n);
    bestSum = Math.max(currentSum, bestSum);
    console.log({ n, currentSum, bestSum });
  }
  return bestSum;
}

const testCases: [number[], number][] = [
  [[-2, 1, -3, 4, -1, 2, 1, -5, 4], 6],
  [[1, 1, -1, 9, -1, 1], 10],
  [[1, 2, 3], 6],
  [[-1, -2, -3], 0],
];

for (let [numbers, result] of testCases) {
  expect(maxSubarraySum(numbers)).to.equal(result);
}
