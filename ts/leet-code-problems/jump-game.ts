import { expect } from 'chai';

/*
55. Jump Game
Medium
15.9K
813
company
Amazon
company
Microsoft
company
Apple
You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

 
Constraints:

1 <= nums.length <= 104
0 <= nums[i] <= 105

## Approach

If we start at the end of the array and work backwards with two pointers:

  nums = [2,3,1,1,4]
                ↑ ↑
                │ target = nums.length
                start

And in a loop check whether it is possible to jump from start to target.

  target - start <= nums[start]

If it is, then set the target to the start and start to target - 1.

  nums = [2,3,1,1,4]
              ↑ ↑

  nums = [2,3,1,1,4]
            ↑ ↑
  etc...

Until the target reaches the beginning, and we can return true.

  nums = [2,3,1,1,4]
        ↑ ↑

If at any point it is not possible to jump from start to target:

  nums = [3,2,1,0,4]
                ↑ ↑
                x

Then decrement only the start pointer:

  nums = [3,2,1,0,4]
              ↑   ↑

And repeat until either a jump to target is possible, or the start reaches a negative index and the target is not at the zero index, in which case we would return False.

  nums = [3,2,1,0,4]
        ↑         ↑
        x

*/
function canJump(nums: number[]): boolean {
  let target = nums.length - 1;
  let start = target - 1;

  while (target > 0) {
    if (start < 0) return false;
    if (target - start <= nums[start]) {
      target = start;
      start = target - 1;
    } else {
      start -= 1;
    }
  }

  return true;
}

// Example 1:
{
  const nums = [2, 3, 1, 1, 4];
  const expected = true;
  expect(canJump(nums)).to.equal(expected);
  // Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
}

// Example 2:
{
  const nums = [3, 2, 1, 0, 4];
  const expected = false;
  expect(canJump(nums)).to.equal(expected);
  // Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
}

// Example 3:
{
  const nums = [0];
  const expected = true;
  expect(canJump(nums)).to.equal(expected);
}
