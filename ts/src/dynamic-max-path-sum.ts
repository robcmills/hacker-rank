import { expect } from 'chai';

/*
Write a function, maxPathSum, that takes in a grid as an argument. The function should return the maximum sum possible by traveling a path from the top-left corner to the bottom-right corner. You may only travel through the grid by moving down or right.

You can assume that all numbers are non-negative.
*/
function maxPathSum(
  grid: number[][],
  x: number = 0,
  y: number = 0,
  memo: Record<string, number> = {}
): number {
  const key = `${x},${y}`;
  if (key in memo) return memo[key];

  const gridWidth = grid[0].length - 1;
  const gridHeight = grid.length - 1;

  if (x > gridWidth || y > gridHeight) return 0; // out of grid bounds

  if (x === gridWidth && y === gridHeight) return grid[y][x];

  const current = grid[y][x];
  const leftSum = current + maxPathSum(grid, x, y + 1, memo);
  const rightSum = current + maxPathSum(grid, x + 1, y, memo);
  const max = Math.max(leftSum, rightSum);
  memo[key] = max;
  return max;
}

const testCases: [number[][], number][] = [
  [
    [
      [1, 3, 12],
      [5, 1, 1],
      [3, 6, 1],
    ],
    18,
  ],
  [
    [
      [1, 2, 8, 1],
      [3, 1, 12, 10],
      [4, 0, 6, 3],
    ],
    36,
  ],
  [
    [
      [1, 2, 8, 1],
      [3, 10, 12, 10],
      [4, 0, 6, 3],
    ],
    39,
  ],
  [
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    27,
  ],
  [
    [
      [1, 1, 3, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 1, 1, 6, 1, 1, 5, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 5, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [2, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1],
      [2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 42, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    82,
  ],
];

for (let [grid, result] of testCases) {
  expect(maxPathSum(grid)).to.equal(result);
}
