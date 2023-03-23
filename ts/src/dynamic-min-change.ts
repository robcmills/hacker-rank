import { expect } from 'chai';

/*
Write a function minChange that takes in an amount and an array of coins. The function should return the minimum number of coins required to create the amount. You may use each coin as many times as necessary.

If it is not possible to create the amount, then return -1.

### Approach

expect(minChange(8, [5, 4, 12])).to.equal(2);
 
                  8
          ┌───────┼───────┐
subtract [5       4       12]
          │       │       │
          3       4      -4
                  │
                 [4]
                  │
                  0 ←

Complexity:

a = amount
c = number of coins

Time: O(a*c)
Space: O(a)

*/
function minChange(
  amount: number,
  coins: number[],
  memo: Record<number, number> = {}
): number {
  if (amount in memo) return memo[amount];
  if (amount < 0) return -1;
  if (amount === 0) return 0;

  let min = Infinity;
  for (let coin of coins) {
    const childResult = 1 + minChange(amount - coin, coins, memo);
    if (childResult > 0 && childResult < min) min = childResult;
  }

  const result = min === Infinity ? -1 : min;
  memo[amount] = result;
  return result;
}

// test_00:
expect(minChange(8, [1, 5, 4, 12])).to.equal(2);

// test_01:
expect(minChange(13, [1, 9, 5, 14, 30])).to.equal(5);

// test_02:
expect(minChange(23, [2, 5, 7])).to.equal(4);

// test_03:
expect(minChange(102, [1, 5, 10, 25])).to.equal(6);

// test_04:
expect(minChange(200, [1, 5, 10, 25])).to.equal(8);

// test_05:
expect(minChange(2017, [4, 2, 10])).to.equal(-1);

// test_06:
expect(minChange(271, [10, 8, 265, 24])).to.equal(-1);

// test_07:
expect(minChange(0, [4, 2, 10])).to.equal(0);

// test_08:
expect(minChange(0, [])).to.equal(0);
