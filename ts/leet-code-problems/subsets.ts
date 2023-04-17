import { expect } from 'chai';

/*
78. Subsets
Medium difficulty
Given an integer array nums of unique elements, return all possible 
subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2:

Input: nums = [0]
Output: [[],[0]]
 
Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.

### Approach

                            [ ]
include 1?       ┌───no──────┴─────yes───┐
                [ ]                     [1]
include 2? ┌─no──┴─yes─┐           ┌─no──┴─yes─┐
          [ ]         [2]         [1]        [1,2]
  3?    ┌──┴──┐     ┌──┴──┐     ┌──┴──┐     ┌──┴──┐
       [ ]   [3]   [2]  [2,3]  [1]  [1,3] [1,2] [1,2,3]

We will do a depth first search of the above decision tree.
Start with an empty subset array and index = 0.
For each recursion down the tree,
For the left branch push the number at the current index into subset and recurse down with i + 1.
For the right branch pop the number just added out of the subset and recurse down with i + 1.
Base case is when i >= nums.length; add a *copy* of subset to result and return.

*/
function subsets(nums: number[]): number[][] {
  const result: number[][] = [];

  const subset: number[] = [];
  const dfs = (i: number) => {
    if (i >= nums.length) {
      result.push([...subset]);
      return;
    }

    // include num
    subset.push(nums[i]);
    dfs(i + 1);

    // do not include num
    subset.pop();
    dfs(i + 1);
  };

  dfs(0);

  return result;
}

{
  const input = [1, 2, 3];
  const expected = new Set(
    [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]].map((subset) =>
      subset.join(',')
    )
  );
  const result = subsets(input);
  expect(
    result.every((subset) => expected.has(subset.join(','))) &&
      result.length === expected.size
  ).to.be.true;
}

{
  const input = [0];
  const expected = new Set([[], [0]].map((subset) => subset.join(',')));
  const result = subsets(input);
  expect(
    result.every((subset) => expected.has(subset.join(','))) &&
      result.length === expected.size
  ).to.be.true;
}
