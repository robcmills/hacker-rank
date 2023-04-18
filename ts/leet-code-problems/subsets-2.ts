import { expect } from 'chai';

/*
90. Subsets II
Medium
Companies
Given an integer array nums that may contain duplicates, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10

### Approach



*/
function subsetsWithDup(nums: number[]): number[][] {
  const result: number[][] = [];
  const subset: number[] = [];

  nums.sort(); // this will enable us to skip duplicates

  const dfs = (i: number) => {
    if (i >= nums.length) {
      result.push([...subset]);
      return;
    }

    // include current num
    subset.push(nums[i]);
    dfs(i + 1);
    subset.pop();

    // exclude current num and skip duplicates
    while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      i += 1;
    }
    dfs(i + 1);
  };

  dfs(0);
  return result;
}

// Example 1:
{
  const nums = [1, 2, 2];
  const expected = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]];
  expect(subsetsWithDup(nums)).to.have.deep.members(expected);
}

// Example 2:
{
  const nums = [0];
  const expected = [[], [0]];
  expect(subsetsWithDup(nums)).to.have.deep.members(expected);
}
