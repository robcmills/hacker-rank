import { expect } from 'chai';

/*
198. House Robber
Medium
17.5K
331
company
Cisco
company
Amazon
company
Bloomberg

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 400

### Approach

Decision tree (brute force)

  nums = [1,2,3,1];
      rob ┌─────┴───┐ not rob
         1,[1,2]   0,[1,2,3]
           ┌──┴───┐    ┌──┴───┐
          3,[]  1,[1] 3,[1]  0,[1,2]
                   │     │     ┌──┴───┐
                  2,[]  4,[]   2,[]  0,[1]
                                        │
                                       1,[]
Dynamic:

We can iterate the nums in order and build up our answer using dynamic programming.

  [1,2,3,1]
   ↑

Starting at the first house, we have two choices, to rob it or not.
If we do rob it, we will get its value in money, but then we can not rob the next house. So to maximize how much money we can steal, we would want to add that money to the maximum of remaining houses [i + 2, n]:

  [1,2,3,1]
   ↑ x └─┘

  1 + rob([3, 1])
  nums[i] + rob(nums.slice(i + 2, n))

Or, we don't steal from the first house, in which case the next adjacent house is available to steal from, so we would want to maximize that sub-range:

  [1,2,3,1]
   x └───┘

  rob([2, 3, 1])
  rob(nums.slice(i + 1, n))

So then, we would want to maximize between those two choices:

Math.max(
  nums[i] + rob(nums.slice(i + 2, n)),
  rob(nums.slice(i + 1, n))
)

Now we can start computing the DP values:

nums = [1,2,3,1]
        ↑
DP      1

For the first house, there are no previous values to look at, so we just take the max of our only choice, to rob that house or not. Which would be zero or one money. Obviously the max would be one.
This represents the maximum money we can get robbing houses in the array up to this point.

nums = [1,2,3,1]
          ↑
DP      1
      ↓ ↓ ↑
      └─┘─┘
Now we move to the second house, and we can look backwards.
We have a choice. If we rob this house, then we can't rob the first one, so we get 2 money. If we don't rob it, we can rob the previous adjacent house, and the max of all the houses before it (the DP value). In this case, 2 is greater, so we use that.

nums = [1,2,3,1]
            ↑
DP      1 2
        ↓ ↓ ↑
        └─┘─┘
When we get to house 3, is when we can start to see the pattern. 
Here is what our choices look like:

Rob house 3, and get 3 + the max of all houses up to and including house 1:

   [1,2,3,1]
        ↑
DP  1 2 4
    ↓   ↑
    └+3─┘

Or don't Rob house 3, and get the max of all houses up to and including house 2:

   [1,2,3,1]
        ↑
DP  1 2 2
      ↓ ↑
      └─┘

Clearly robbing house 3 yields more money (4).
Rinse and repeat.

   [1,2,3,1]
          ↑
DP  1 2 4 4    max(2 + 1, 4)
      ↓ ↓ ↑
      └─└─┘

Once you get to the end, the DP value represents the max money you can steal from the entire neighborhood.

In terms of implementation, you only need two variables to hold the previous two houses (and one temporary to swap).

*/
function rob(nums: number[]): number {
  let house1 = 0;
  let house2 = 0;

  for (const num of nums) {
    const next = Math.max(num + house1, house2);
    house1 = house2;
    house2 = next;
  }

  return house2;
}

// Example 1:
{
  const nums = [1, 2, 3, 1];
  const expected = 4;
  expect(rob(nums)).to.equal(expected);
  // Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
  // Total amount you can rob = 1 + 3 = 4.
}

// Example 2:
{
  const nums = [2, 7, 9, 3, 1];
  const expected = 12;
  expect(rob(nums)).to.equal(expected);
  // Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
  // Total amount you can rob = 2 + 9 + 1 = 12.
}
