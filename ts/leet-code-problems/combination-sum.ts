import { expect } from 'chai';

/*
39. Combination Sum
Medium
15.6K
312
Companies
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the 
frequency
 of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

 

Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []
 

Constraints:

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40

### Approach

candidates = [2, 3, 6, 7];
target = 7;

                        [ ]
                 ┌──i++──┴───2────┐
                [ ]              [2]
               ┌─┴3┐           ┌──┴───2─────────┐
              [ ] [3]         [2]             [2,2]
             ┌─┴6┐           ┌─┴─3─┐          ┌─┴──2────────┐
            [ ] [6]         [2]  [2,3]      [2,2]        [2,2,2]
           ┌─┴7┐          ┌──┴─6───┐       ┌──┴─3─┐       ┌─┘ (2)
          [ ] [7]        [2]     [2,6]   [2,2] [2,2,3] [2,2,2]
               ↑        ┌─┴─7─┐          ┌─┘ (6)  ↑     ┌─┘ (3)
                       [2]  [2,7]      [2,2]         [2,2,2] 
                                       ┌─┘ (7)        ┌─┘ (6)
                                     [2,2]         [2,2,2]
                                                    ┌─┘ (7)
                                                 [2,2,2]

Similar to the base subsets problem, we start with two variables: 
result: number[][] which holds all the valid subsets we find 
subset: number[] the current subset as we traverse the tree

Perform a depth first search, passing in the index of the current candidate (starting at 0) and current sum (of subset).
The base case is when the sum of the subset == target, in which case we can add a *copy* of the current subset to the result.

Then branch on whether to continue adding the current candidate to subset,
or not and increment the current candidate index.
Push candidates into subset accordingly and update total.
Then pop candidates out of subset when returning (backtrack).

Once the dfs finishes we should have found all combinations and just return result.

*/
function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const subset: number[] = [];

  const dfs = (i: number, total: number) => {
    if (total === target) {
      result.push([...subset]);
      return;
    }
    if (total > target || i >= candidates.length) {
      return;
    }

    const candidate = candidates[i];
    // include current candidate
    subset.push(candidate);
    dfs(i, total + candidate);
    subset.pop();

    // not include current candidate
    dfs(i + 1, total);
  };

  dfs(0, 0);

  return result;
}

// Example 1:
{
  const candidates = [2, 3, 6, 7];
  const target = 7;
  const expected = [[2, 2, 3], [7]];
  expect(combinationSum(candidates, target)).to.have.deep.members(expected);
  // Explanation:
  // 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
  // 7 is a candidate, and 7 = 7.
  // These are the only two combinations.
}

// Example 2:
{
  const candidates = [2, 3, 5];
  const target = 8;
  const expected = [
    [2, 2, 2, 2],
    [2, 3, 3],
    [3, 5],
  ];
  expect(combinationSum(candidates, target)).to.have.deep.members(expected);
}

// Example 3:
{
  const candidates = [2];
  const target = 1;
  const expected: number[][] = [];
  expect(combinationSum(candidates, target)).to.have.deep.members(expected);
}
