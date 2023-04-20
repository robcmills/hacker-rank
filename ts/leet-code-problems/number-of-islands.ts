import { expect } from 'chai';

/*
200. Number of Islands
Medium
19.5K
434
Companies
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.


Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.

### Approach

Iterate through every position of the grid, 
if the position is land, start a depth first search,
exploring the current island and adding to a visited set.
Once finished exploring the island, continue iterating,
skipping water and already explored islands. 
Increment a counter each time a search is started, and 
at the end return this counter's value.

*/
function numIslands(grid: string[][]): number {
  const height = grid.length;
  const width = grid[0].length;
  const visited = new Set<string>();
  let count = 0;

  const dfs = (x: number, y: number) => {
    if (
      visited.has(`${x},${y}`) ||
      x < 0 ||
      x >= width ||
      y < 0 ||
      y >= height ||
      grid[y][x] !== '1'
    ) {
      return;
    }

    visited.add(`${x},${y}`);

    // search neighbors
    dfs(x + 1, y);
    dfs(x - 1, y);
    dfs(x, y + 1);
    dfs(x, y - 1);
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === '1' && !visited.has(`${x},${y}`)) {
        count++;
        dfs(x, y);
      }
    }
  }

  return count;
}

// Example 1:
{
  const grid = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ];
  expect(numIslands(grid)).to.equal(1);
}

// Example 2:
{
  const grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ];

  expect(numIslands(grid)).to.equal(3);
}
