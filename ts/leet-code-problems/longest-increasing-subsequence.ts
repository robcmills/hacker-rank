import { expect } from 'chai';

/*
300. Longest Increasing Subsequence
Medium
16.9K
319
company
TikTok
TuSimple
company
Google

Given an integer array nums, return the length of the longest strictly increasing subsequence.

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 
Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

### Approach

The brute force solution would involve a decision tree that branches on whether or not to include each number. This would have a time complexity of O(2^n) where n is the number of numbers.

Or use a standard dynamic programming approach.

Start by considering the sub-problem, starting at the end of the numbers.
What is the lengthOfLIS for just 4? Clearly with one digit this is a base case:

  nums = [1, 2, 3, 5, 4]
  dp                  1

Now working backwards, what is lengthOfLIS for [5, 4]?
Well, since 5 > 4 we can not consider subsequent values, so it would also be 1:

  nums = [1, 2, 3, 5, 4]
  dp               1  1

Now for [3,5,4] we can introduce the generic logic. Starting at 3, we could omit any subsequent numbers (according to subsequence rules), and pick up an increasing subsequence from any of them (so long as they are greater):

  lengthOfLIS at index 3 = 1 + max(lis at index 4, lis at index 5)
  lis[i] = 1 + max(lis[i+1], lis[i+2]... lis[i+n])

So following that logic, both 5 and 4 are greater than 3, so the max is 1 + 1:

  nums = [1, 2, 3, 5, 4]
  dp            2  1  1

Rinse and repeat:

  nums = [1, 2, 3, 5, 4]
  dp      4  3  2  1  1


*/
// function lengthOfLIS(nums: number[]): number {
//   const dp = Array(nums.length).fill(1);
//   let max = 1;
//
//   for (let i = nums.length - 2; i >= 0; i--) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[j] > nums[i]) {
//         dp[i] = Math.max(dp[i], 1 + dp[j]);
//         max = Math.max(max, dp[i]);
//       }
//     }
//   }
//
//   return max;
// }

function lengthOfLIS(nums: number[]): number {
  const sub: number[] = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    if (num > sub[sub.length - 1]) {
      sub.push(num);
    } else {
      let j = 0;
      while (num > sub[j]) {
        j++;
      }
      sub[j] = num;
    }
  }

  return sub.length;
}

// Example 1:
{
  const nums = [10, 9, 2, 5, 3, 7, 101, 18];
  const expected = 4;
  expect(lengthOfLIS(nums)).to.equal(expected);
  // Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
}

// Example 2:
{
  const nums = [0, 1, 0, 3, 2, 3];
  const expected = 4;
  expect(lengthOfLIS(nums)).to.equal(expected);
}

// Example 3:
{
  const nums = [7, 7, 7, 7, 7, 7, 7];
  const expected = 1;
  expect(lengthOfLIS(nums)).to.equal(expected);
}
