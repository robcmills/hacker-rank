import { expect } from 'chai';

/*
Write a function, bestBridge, that takes in a grid as an argument. The grid contains water (W) and land (L). There are exactly two islands in the grid. An island is a vertically or horizontally connected region of land. Return the minimum length bridge needed to connect the two islands. A bridge does not need to form a straight line.
*/
function bestBridge(grid: string[][]): number {
  const islands = exploreIslands(grid);

  // For each node of the first island, do a breadth
  // first search until second island is found, record
  // distance.
  let min = Infinity;
  for (let node of islands[0]) {
    const [startX, startY] = node.split(',').map(Number);
    const queue = [[startX, startY, -1]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const [currentX, currentY, distance] = queue.shift() as [
        number,
        number,
        number
      ];
      if (islands[1].has(`${currentX},${currentY}`) && distance < min) {
        min = distance;
      }
      visited.add(`${currentX},${currentY}`);

      const deltas = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
      ];
      for (let [deltaX, deltaY] of deltas) {
        const neighborX = currentX + deltaX;
        const neighborY = currentY + deltaY;
        if (
          !visited.has(`${neighborX},${neighborY}`) &&
          !islands[0].has(`${neighborX},${neighborY}`) &&
          neighborX >= 0 &&
          neighborX < grid[0].length &&
          neighborY >= 0 &&
          neighborY < grid.length
        ) {
          queue.push([neighborX, neighborY, distance + 1]);
        }
      }
    }
  }

  return min;
}

function exploreIslands(grid: string[][]): Set<string>[] {
  const islands: Set<string>[] = [];
  // Iterate the grid until we find land.
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const val = grid[y][x];
      if (val === 'L' && !islands.some((island) => island.has(`${x},${y}`))) {
        // Explore the island, building a map of it.
        islands.push(exploreIsland(grid, x, y));
        if (islands.length === 2) return islands;
      }
    }
  }
  return islands;
}

function exploreIsland(
  grid: string[][],
  x: number,
  y: number,
  map: Set<string> = new Set<string>()
) {
  map.add(`${x},${y}`);

  const deltas = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  for (let [deltaX, deltaY] of deltas) {
    const neighborX = x + deltaX;
    const neighborY = y + deltaY;
    if (
      !map.has(`${neighborX},${neighborY}`) &&
      neighborX >= 0 &&
      neighborX < grid[0].length &&
      neighborY >= 0 &&
      neighborY < grid.length &&
      grid[neighborY][neighborX] === 'L'
    ) {
      exploreIsland(grid, neighborX, neighborY, map);
    }
  }
  return map;
}

// test_00:
{
  const grid = [
    ['W', 'W', 'W', 'L', 'L'],
    ['L', 'L', 'W', 'W', 'L'],
    ['L', 'L', 'L', 'W', 'L'],
    ['W', 'L', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W'],
  ];
  expect(bestBridge(grid)).to.equal(1);
}

// test_01:
{
  const grid = [
    ['W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W'],
    ['L', 'L', 'W', 'W', 'L'],
    ['W', 'L', 'W', 'W', 'L'],
    ['W', 'W', 'W', 'L', 'L'],
    ['W', 'W', 'W', 'W', 'W'],
  ];
  expect(bestBridge(grid)).to.equal(2);
}

// test_02:
{
  const grid = [
    ['W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'L', 'W'],
    ['L', 'W', 'W', 'W', 'W'],
  ];
  expect(bestBridge(grid)).to.equal(3);
}

// test_03:
{
  const grid = [
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'L', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'L', 'L', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'L', 'L', 'L', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'L', 'L', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'L', 'L', 'L'],
    ['L', 'L', 'L', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ];
  expect(bestBridge(grid)).to.equal(3);
}

// test_04:
{
  const grid = [
    ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'L', 'W', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
    ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
  ];
  expect(bestBridge(grid)).to.equal(2);
}

// test_05:
{
  const grid = [
    ['W', 'L', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'L', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'L', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'L', 'L'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'L'],
  ];
  expect(bestBridge(grid)).to.equal(8);
}
