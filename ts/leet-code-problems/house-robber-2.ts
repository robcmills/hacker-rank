import { expect } from 'chai';
import { rob as _rob } from './house-robber';

/*
213. House Robber II
Medium
8.2K
118
company
Google
company
Adobe
company
TikTok

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 1000

### Approach

This is mostly the same as house-robber, with one change: the street is a circle.
So this means we can not rob both houses at index 0 and n (where n = nums.length).

We can however, reuse the solution from house-robber, and adapt it to this problem.
All we have to do is apply it twice to sub-arrays of nums:

  rob(nums.slice(1, n)) // exclude first house
  rob(nums.slice(0, n - 1)) // exclude last house

Because if we exlude the first or last house, then that avoids the added complication of the first and last being adjacent.

Then our solution is simply the max of those two results.

  nums = [2, 3, 2];
          └──┘
  DP      2  3

  nums = [2, 3, 2];
             └──┘
  DP         3  3

  return max(3, 3)

See house-robber for explanation of DP algorithm.

*/
function rob(nums: number[]): number {
  if (nums.length === 1) return nums[0];
  const n = nums.length;
  return Math.max(_rob(nums.slice(1, n)), _rob(nums.slice(0, n - 1)));
}

// Example 1:
{
  const nums = [2, 3, 2];
  const expected = 3;
  expect(rob(nums)).to.equal(expected);
  // Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
}

// Example 2:
{
  const nums = [1, 2, 3, 1];
  const expected = 4;
  expect(rob(nums)).to.equal(expected);
  // Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
  // Total amount you can rob = 1 + 3 = 4.
}

// Example 3:
{
  const nums = [1, 2, 3];
  const expected = 3;
  expect(rob(nums)).to.equal(expected);
}

// Example 4;
{
  const nums = [1];
  const expected = 1;
  expect(rob(nums)).to.equal(expected);
}
