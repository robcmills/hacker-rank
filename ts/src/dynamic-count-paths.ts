import { expect } from 'chai';

/*
https://structy.net/problems/count-paths

### Problem

Write a function, countPaths, that takes in a grid as an argument.
In the grid, 'X' represents walls and 'O' represents open spaces.
You may only move down or to the right and cannot pass through walls.
The function should return the number of ways possible to travel from
the top-left corner of the grid to the bottom-right corner.

### Approach

Insight: We can model movement through the grid as a binary tree.

Given the following grid:

  0,1,2 x
0[O,O,O]
1[O,O,X]
2[X,O,O]
y

Starting at position 0,0 we have two available movements:
(down or to the right) which can be modeled using x,y coordinates
for node values:

    0,0
   /   \
 0,1   1,0

And so on, recursively, until we get to the bottom right
(preventing movements outside the bounds of the grid or through "walls")
Resulting in a tree like so:

    0,0
   /   \
 0,1    1,0
  |    /   \ 
 1,1  2,0  1,1
  |         |
 1,2       1,2
  |         |
 2,2       2,2

Each leaf node with a value that matches the destination
represents a valid path through the grid. 
If we return the value 1 from each valid leaf, and bubble
the sum of all values to the root node, we can get the
solution, which is the total number of paths.
*/
function countPaths(
  grid: string[][],
  x: number = 0,
  y: number = 0,
  memo: Record<string, number> = {}
): number {
  const key = `${x},${y}`;
  if (key in memo) return memo[key];

  const gridWidth = grid[0].length - 1;
  const gridHeight = grid.length - 1;
  if (x > gridWidth || y > gridHeight || grid[x][y] === 'X') return 0;

  if (x === gridWidth && y === gridHeight) return 1;

  const leftCount = countPaths(grid, x, y + 1, memo);
  const rightCount = countPaths(grid, x + 1, y, memo);
  const total = leftCount + rightCount;
  memo[key] = total;
  return total;
}

const testCases: [string[][], number][] = [
  [
    [
      ['O', 'O'],
      ['O', 'O'],
    ],
    2,
  ],
];

for (let [grid, result] of testCases) {
  expect(countPaths(grid)).to.equal(result);
}
