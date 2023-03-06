import { expect } from 'chai';

/*
https://structy.net/problems/counting-change

### Problem

Write a function, countingChange, that takes in an amount and an array of coins. The function should return the number of different ways it is possible to make change for the given amount using the coins.

You may reuse a coin as many times as necessary.

For example,

countingChange(4, [1,2,3]) -> 4

There are four different ways to make an amount of 4:

1. 1 + 1 + 1 + 1
2. 1 + 1 + 2
3. 1 + 3
4. 2 + 2

### Approach

The intuitive approach does not work, because you will
get duplicate paths that use the same coins in a different
order:

                  4 target amount
                / | \
              [1, 2, 3] subtract coins
             /    |   \
             3    2    1
           / | \  
         [1, 2, 3]
         /   |   \
        2    1    0
       / \
     [1, 2]
     /    \
    1     0
   /
 [1]
 /
0

Would give us [3, 1] and [1, 3] valid paths, which
would result in too many base cases. 

A better way is to structure the tree levels based
on coin type, and the edges based on quantity of 
that coin type:

                                 4
                 ┌────────┬──────┼─────┬───┐
coin 1          x0       x1     x2    x3  x4
                 │        │      │     │   │
                 4        3      2     1  (0)
            ┌────┼───┐   ┌┴─┐   ┌┴─┐   │
coin 2     x0   x1  x2  x0 x1  x0 x1  x0  
            │    │   │   │  │   │  │   │
            4    2  (0)  3  1   2 (0)  1
           ┌┴─┐  │       │  │   │      │
coin 3    x0 x1 x0      x1 x0  x0     x0
           │  │  │       │  │   │      │
           4  1  2      (0) 1   2      1

And this way we hit (4) base cases, which is the correct
answer.
*/
function countingChange(
  amount: number,
  coins: number[],
  coinIndex: number = 0,
  memo: Record<string, number> = {}
): number {
  const key = `${amount},${coinIndex}`;
  if (key in memo) return memo[key];
  if (amount === 0) return 1;

  let sum = 0;
  const coin = coins[coinIndex];
  for (let q = 0; q * coin <= amount; q++) {
    sum += countingChange(amount - q * coin, coins, coinIndex + 1, memo);
  }
  memo[key] = sum;
  return sum;
}

const testCases: [number, number[], number][] = [
  [4, [1, 2, 3], 4],
  [8, [1, 2, 3], 10],
  [24, [5, 7, 3], 5],
  [13, [2, 6, 12, 10], 0],
  [512, [1, 5, 10, 25], 20119],
  [1000, [1, 5, 10, 25], 142511],
  [240, [1, 2, 3, 4, 5, 6, 7, 8, 9], 1525987916],
];

for (let [amount, coins, output] of testCases) {
  expect(countingChange(amount, coins)).to.equal(output);
}
