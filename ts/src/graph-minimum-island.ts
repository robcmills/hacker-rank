import { expect } from 'chai';

/*
Write a function, minimumIsland, that takes in a grid containing Ws and Ls.
W represents water and L represents land.
The function should return the size of the smallest island.
An island is a vertically or horizontally connected region of land.
You may assume that the grid contains at least one island.
*/
function minimumIsland(grid: string[][]): number {
  let minimum = Infinity;
  let visited = new Set<string>();
  const height = grid.length;
  const width = grid[0].length;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const size = exploreSize(grid, col, row, visited);
      if (size > 0 && size < minimum) minimum = size;
    }
  }
  return minimum;
}

function exploreSize(
  grid: string[][],
  col: number,
  row: number,
  visited: Set<string>
): number {
  if (row < 0 || row >= grid.length) return 0;
  if (col < 0 || col >= grid[0].length) return 0;
  if (grid[row][col] === 'W') return 0;
  const key = `${row},${col}`;
  if (visited.has(key)) return 0;

  visited.add(key);
  let size = 1;
  size += exploreSize(grid, col, row - 1, visited);
  size += exploreSize(grid, col + 1, row, visited);
  size += exploreSize(grid, col, row + 1, visited);
  size += exploreSize(grid, col - 1, row, visited);
  return size;
}

const testCases: [string[][], number][] = [
  [
    [
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'W', 'W', 'L', 'W'],
      ['W', 'W', 'L', 'L', 'W'],
      ['L', 'W', 'W', 'L', 'L'],
      ['L', 'L', 'W', 'W', 'W'],
    ],
    2,
  ],
];

for (let [grid, count] of testCases) {
  expect(minimumIsland(grid)).to.equal(count);
}
