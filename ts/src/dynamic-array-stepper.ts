import { expect } from 'chai';

/*
https://structy.net/problems/array-stepper

### Problem

Write a function, arrayStepper, that takes in an array of numbers as an argument. You start at the first position of the array. The function should return a boolean indicating whether or not it is possible to reach the last position of the array. When situated at some position of the array, you may take a maximum number of steps based on the number at that position.

For example, given:

    idx =  0  1  2  3  4  5
numbers = [2, 4, 2, 0, 0, 1]

The answer is true.
We start at idx 0, we could take 1 step or 2 steps forward.
The correct choice is to take 1 step to idx 1.
Then take 4 steps forward to the end at idx 5.

### Approach

 [2, 4, 2, 0, 0, 1] 

      index [0]
          ┌──┴──┐
    steps 1     2
          │     │
         [1]   [2]
    ┌───┬─┴─┬───┐
    1   2   3   4
    │   │   │   │
   [2] [3] [4] [5] 
  ┌─┴─┐ x   x   *
  1   2
  │   │
 [3] [4]
  x   x
*/
function arrayStepper(
  numbers: number[],
  index: number = 0,
  memo: Record<number, boolean> = {}
): boolean {
  if (index in memo) return memo[index];
  if (index === numbers.length - 1) return true;
  if (numbers[index] === 0) return false;

  for (let steps = 1; steps <= numbers[index]; steps++) {
    if (arrayStepper(numbers, index + steps, memo)) {
      memo[index] = true;
      return true;
    }
  }
  memo[index] = false;
  return false;
}

const testCases: [number[], boolean][] = [
  [[2, 4, 2, 0, 0, 1], true],
  [[2, 3, 2, 0, 0, 1], false],
  [[3, 1, 3, 1, 0, 1], true],
  [[4, 1, 5, 1, 1, 1, 0, 4], true],
  [[4, 1, 2, 1, 1, 1, 0, 4], false],
  [[1, 1, 1, 1, 1, 0], true],
  [[1, 1, 1, 1, 0, 0], false],
  [
    [
      31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14,
      13, 12, 11, 10, 9, 8, 7, 6, 5, 3, 2, 1, 0, 0, 0,
    ],
    false,
  ],
];

for (let [numbers, output] of testCases) {
  expect(arrayStepper(numbers)).to.equal(output);
}
