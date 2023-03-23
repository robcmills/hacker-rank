import { expect } from 'chai';

/*
Write a function sumPossible that takes in an amount and an array of positive numbers. The function should return a boolean indicating whether or not it is possible to create the amount by summing numbers of the array. You may reuse numbers of the array as many times as necessary.

You may assume that the target amount is non-negative.

### Approach

This can be solved with some simple recursion.
Just iterate over the numbers, subtracting each from
the target amount for each recursion down.
This makes out base case when amount becomes
zero exactly (solution) or less than zero (overshot).

Example:

expect(sumPossible(8, [5, 12, 4])).to.equal(true);

 target amount 8
          ┌────┼────────┐
subtract [5    12       4]
          │    │        │
          3   -4        4
     ┌────┼────┐   ┌────┼────┐
    [5    12   4] [5    12   4]
     │    │    │   │    │    │
    -2   -9   -1  -1   -8    0 ←  solution found

Complexity:

n = number of numbers
a = amount
Time: O(n*a)
Space: O(a)

*/
function sumPossible(
  amount: number,
  numbers: number[],
  memo: Record<string, boolean> = {}
): boolean {
  if (amount === 0) return true;
  if (amount < 0) return false;
  if (amount in memo) return memo[amount];

  for (let n of numbers) {
    if (sumPossible(amount - n, numbers, memo)) {
      memo[amount] = true;
      return true;
    }
  }

  memo[amount] = false;
  return false;
}

// test_00:
expect(sumPossible(8, [5, 12, 4])).to.equal(true);

// test_01:
expect(sumPossible(15, [6, 2, 10, 19])).to.equal(false);

// test_02:
expect(sumPossible(13, [6, 2, 1])).to.equal(true);

// test_03:
expect(sumPossible(103, [6, 20, 1])).to.equal(true);

// test_04:
expect(sumPossible(12, [])).to.equal(false);

// test_05:
expect(sumPossible(12, [12])).to.equal(true);

// test_06:
expect(sumPossible(0, [])).to.equal(true);

// test_07:
expect(sumPossible(271, [10, 8, 265, 24])).to.equal(false);

// test_08:
expect(sumPossible(2017, [4, 2, 10])).to.equal(false);

// test_09:
expect(sumPossible(13, [3, 5])).to.equal(true);
