import { expect } from 'chai';

/*
https://structy.net/problems/summing-squares
### Problem

Write a function, summingSquares, that takes a target number as an argument.
The function should return the minimum number of perfect squares that sum to
the target. A perfect square is a number of the form (i*i) where i >= 1.

For example: 1, 4, 9, 16 are perfect squares, but 8 is not perfect square.

Given 12:

summingSquares(12) -> 3

The minimum squares required for 12 is three, by doing 4 + 4 + 4.

Another way to make 12 is 9 + 1 + 1 + 1, but that requires four perfect squares.

### Approach

For each perfect square less than or equal to the target,
recursively find the minimum.

            (5)
          1/  \4 (subtract perfect squares)
          /    \ 
        (4)    (1) // 5 - 4 = 1
       1/ \2   1|
       /   \    0
      /     \
    (3)     (2) 
   1/ \2   1/ \2
  (2) (1) (1) (0)
 1/ \2 |1  |1
(1)(0)(0) (0)
1|
(0)

*/
function summingSquares(
  target: number,
  memo: Record<number, number> = {}
): number {
  if (target in memo) return memo[target];
  if (target === 0) return 0;

  let min = Infinity;
  for (let s = 1; s * s <= target; s++) {
    min = Math.min(min, 1 + summingSquares(target - s * s, memo));
  }
  memo[target] = min;
  return min;
}

const testCases = [
  [8, 2],
  [9, 1],
  [12, 3],
  [1, 1],
  [31, 4],
  [50, 2],
  [68, 2],
  [87, 4],
];

for (let [input, output] of testCases) {
  expect(summingSquares(input)).to.equal(output);
}
