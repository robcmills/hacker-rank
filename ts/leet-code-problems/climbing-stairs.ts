import { expect } from 'chai';

/*
70. Climbing Stairs
Easy
17.8K
556
company
Amazon
company
Apple
company
Uber

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Constraints:

1 <= n <= 45

### Approach

This could be solved with a simple binary decision tree:

  n = 3

          0
       ┌1─┴───2┐
       1       2
    ┌1─┴─2┐ ┌1─┴─2┐
    2     3 3     x
 ┌1─┴─2┐
 3     x

But this has a time complexity of O(2^n) which is not great.
This could be improved with memoization down to O(n), but there 
is a better way: dynamic programming.

  n = 5
            ┌─┐
          ┌─┤ │
        ┌─┤ │ │
      ┌─┤ │ │ │
    ┌─┤ │ │ │ │
  ──┴─┴─┴─┴─┴─┘
   0 1 2 3 4 5
DP           1 (base case)

If we start at the end (5), with the base case (1) and work backwards,
inserting the sum of the two positions to the right of the current index,
that simulates the same process of solving sub-problems as we were doing with memoization in the binary decision tree above. Where summing the two positions to the right represent taking one step and two steps. And the value at each index represents the number of distinct ways there are to reach n from that index (the original goal of the problem).

   0 1 2 3 4 5
DP         1 1 
           ↑ ↓ ↓
           └─┘─┘

   0 1 2 3 4 5
DP       2 1 1 
         ↑ ↓ ↓
         └─┘─┘

   0 1 2 3 4 5
DP     3 2 1 1 
       ↑ ↓ ↓
       └─┘─┘

   0 1 2 3 4 5
DP   5 3 2 1 1 
     ↑ ↓ ↓
     └─┘─┘

   0 1 2 3 4 5
DP 8 5 3 2 1 1 
   ↑ ↓ ↓
   └─┘─┘

Then when we get to zero, we have found our solution.
And in terms of implementation, we don't even need to use an array to store all the DP values. We can do it with just two variables.

*/
function climbStairs(n: number): number {
  let one = 1;
  let two = 1;

  for (let i = 0; i < n - 1; i++) {
    const temp = one;
    one += two;
    two = temp;
  }

  return one;
}

// Example 1:
{
  const n = 2;
  const expected = 2;
  expect(climbStairs(n)).to.equal(expected);
  // Explanation: There are two ways to climb to the top.
  // 1. 1 step + 1 step
  // 2. 2 steps
}

// Example 2:
{
  const n = 3;
  const expected = 3;
  expect(climbStairs(n)).to.equal(expected);
  // Explanation: There are three ways to climb to the top.
  // 1. 1 step + 1 step + 1 step
  // 2. 1 step + 2 steps
  // 3. 2 steps + 1 step
}

// Example 3:
{
  const n = 38;
  const expected = 63245986;
  expect(climbStairs(n)).to.equal(expected);
}
