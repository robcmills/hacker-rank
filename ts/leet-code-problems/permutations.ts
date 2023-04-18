import { expect } from 'chai';

/*
46. Permutations
Medium
15.3K
256
Companies
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.

### Approach

       nums = [1, 2, 3]
           ┌──────┴────────┬───────────────┐
          [1]             [2]             [3]
        ┌──┴────┐       ┌──┴────┐       ┌──┴────┐
      [1,2]   [1,3]   [2,1]   [2,3]   [3,1]   [3,2]
        │       │       │       │       │       │
     [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]

See exhaustive-permutations.ts for description →

*/
function permute(nums: number[]): number[][] {
  if (nums.length === 0) return [[]];

  const last = nums.pop() as number;
  const permutations = permute(nums);
  const result: number[][] = [];

  for (let permutation of permutations) {
    for (let i = 0; i <= permutation.length; i++) {
      result.push([...permutation.slice(0, i), last, ...permutation.slice(i)]);
    }
  }

  return result;
}

// Example 1:
{
  const nums = [1, 2, 3];
  const expected = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ];
  expect(permute(nums)).to.have.deep.members(expected);
}

// Example 2:
{
  const nums = [0, 1];
  const expected = [
    [0, 1],
    [1, 0],
  ];
  expect(permute(nums)).to.have.deep.members(expected);
}

// Example 3:
{
  const nums = [1];
  const expected = [[1]];
  expect(permute(nums)).to.have.deep.members(expected);
}
