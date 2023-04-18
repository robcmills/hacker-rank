import { expect } from 'chai';

/*
40. Combination Sum II
Medium
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

Constraints:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30

### Approach

  candidates = [1, 1, 2, 3];
  target = 3;
  expected = [[1, 2], [3]];

                            [ ]
              ┌─skip all 1s──┴────┐ increment i normally
        i=2  [ ]                 [1] i=1
           ┌──┴─────┐          ┌──┴──────────┐
     i=3  [ ]      [2]        [1]    i=2   [1,1] 
        ┌──┴──┐   ┌─┴───┐    ┌─┴──────┐     ┌┴─────┐
       [ ]   [3] [2]  [2,3] [1] i=3 [1,2] [1,1] [1,1,2]
              ↑            ┌─┴──┐     ↑  ┌──┴───┐
                          [1] [1,3]    [1,1] [1,1,3]


We have to use a slightly modified decision tree to avoid duplicate
combinations. Instead of just branching on whether to include the 
current number in the subset combination, we branch on whether to 
include it and increment the index normally (by 1), or exclude all
occurrences of that number (increment index until a different number
is reached). This also means we need to sort the candidates array
before starting. 

Other than that, it is a pretty basic depth first search with backtracking.
We pass as arguments the current index (into candidates) and the current total 
(sum of subset) to check for our base cases:
  (subtract each candidate from target when recursing)
  total === 0 (found a valid combination, add copy to result)
  total < 0 (overshot, early return)

*/
function combinationSum2(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const subset: number[] = [];

  candidates.sort();

  const dfs = (i: number, total: number) => {
    if (total === 0) {
      result.push([...subset]);
    }
    if (total <= 0) {
      return;
    }

    let prev = -1;
    for (let j = i; j < candidates.length; j++) {
      const candidate = candidates[j];
      if (candidate === prev) continue;
      subset.push(candidate);
      dfs(j + 1, total - candidate);
      subset.pop();
      prev = candidate;
    }
  };

  dfs(0, target);
  return result;
}

{
  const candidates = [1, 1, 1, 1, 2, 3];
  const target = 3;
  const expected = [[1, 1, 1], [1, 2], [3]];
  expect(combinationSum2(candidates, target)).to.have.deep.members(expected);
}

// // Example 1:
// {
//   const candidates = [10, 1, 2, 7, 6, 1, 5];
//   const target = 8;
//   const expected = [
//     [1, 1, 6],
//     [1, 2, 5],
//     [1, 7],
//     [2, 6],
//   ];
//   expect(combinationSum2(candidates, target)).to.have.deep.members(expected);
// }
//
// // Example 2:
// {
//   const candidates = [2, 5, 2, 1, 2];
//   const target = 5;
//   const expected = [[1, 2, 2], [5]];
//   expect(combinationSum2(candidates, target)).to.have.deep.members(expected);
// }
