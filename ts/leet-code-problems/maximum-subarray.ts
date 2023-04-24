import { expect } from 'chai';

/*
53. Maximum Subarray
Medium
29.3K
1.3K
company
Amazon
company
Apple
company
Adobe

Given an integer array nums, find the subarray with the largest sum, and return its sum.

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104

## Approach



*/
function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = 0;

  for (let num of nums) {
    if (currentSum < 0) currentSum = 0;
    currentSum += num;
    if (currentSum > maxSum) maxSum = currentSum;
  }

  return maxSum;
}

// Example 1:
{
  const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  const expected = 6;
  expect(maxSubArray(nums)).to.equal(expected);
  // Explanation: The subarray [4,-1,2,1] has the largest sum 6.
}

// Example 2:
{
  const nums = [1];
  const expected = 1;
  expect(maxSubArray(nums)).to.equal(expected);
  // Explanation: The subarray [1] has the largest sum 1.
}

// Example 3:
{
  const nums = [5, 4, -1, 7, 8];
  const expected = 23;
  expect(maxSubArray(nums)).to.equal(expected);
  // Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
}
