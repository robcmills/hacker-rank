import { expect } from 'chai';

/*
https://structy.net/problems/non-adjacent-sum
### Problem

Write a function, nonAdjacentSum, that takes in an array of numbers as an argument. The function should return the maximum sum of non-adjacent elements in the array. There is no limit on how many elements can be taken into the sum as long as they are not adjacent.

### Approach

This problem can be broken down into a sub problems tree like so:

         (7,5,5,12)
include 7/       \exclude 7
      (5,12)   (5,5,12)
      5/  \    5/    \ 
     (o) (12) (12)  (5,12)
        12/ \
        (o) (o)

*/
function nonAdjacentSum(
  nums: number[],
  i = 0,
  memo: Record<number, number> = {}
): number {
  if (i in memo) return memo[i];
  if (i >= nums.length) return 0;

  const include = nums[i] + nonAdjacentSum(nums, i + 2, memo);
  const exclude = nonAdjacentSum(nums, i + 1, memo);
  memo[i] = Math.max(include, exclude);
  return memo[i];
}

const testCases: [number[], number][] = [
  [[2, 4, 5, 12, 7], 16],
  [[7, 5, 5, 12], 19],
  [[7, 5, 5, 12, 17, 29], 48],
  [
    [
      72, 62, 10, 6, 20, 19, 42, 46, 24, 78, 30, 41, 75, 38, 23, 28, 66, 55, 12,
      17, 9, 12, 3, 1, 19, 30, 50, 20,
    ],
    488,
  ],
  [
    [
      72, 62, 10, 6, 20, 19, 42, 46, 24, 78, 30, 41, 75, 38, 23, 28, 66, 55, 12,
      17, 83, 80, 56, 68, 6, 22, 56, 96, 77, 98, 61, 20, 0, 76, 53, 74, 8, 22,
      92, 37, 30, 41, 75, 38, 23, 28, 66, 55, 12, 17, 72, 62, 10, 6, 20, 19, 42,
      46, 24, 78, 42,
    ],
    1465,
  ],
];

for (let [nums, result] of testCases) {
  expect(nonAdjacentSum(nums)).to.equal(result);
}
