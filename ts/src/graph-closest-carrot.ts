import { expect } from 'chai';

/*
Write a function, closestCarrot, that takes in a grid, a starting row, and a starting column. In the grid, 'X's are walls, 'O's are open spaces, and 'C's are carrots. The function should return a number representing the length of the shortest path from the starting position to a carrot. You may move up, down, left, or right, but cannot pass through walls (X). If there is no possible path to a carrot, then return -1.
*/
function closestCarrot(
  grid: string[][],
  startY: number,
  startX: number
): number {
  const visited = new Set<string>();
  const queue = [[startX, startY, 0]];

  while (queue.length > 0) {
    const [x, y, distance] = queue.shift() as number[];
    if (grid[y][x] === 'C') return distance;
    visited.add(`${x},${y}`);

    // up
    if (y - 1 >= 0 && !visited.has(`${x},${y - 1}`) && grid[y - 1][x] !== 'X') {
      queue.push([x, y - 1, distance + 1]);
      visited.add(`${x},${y - 1}`);
    }
    // down
    if (
      y + 1 < grid.length &&
      !visited.has(`${x},${y + 1}`) &&
      grid[y + 1][x] !== 'X'
    ) {
      queue.push([x, y + 1, distance + 1]);
      visited.add(`${x},${y + 1}`);
    }
    // left
    if (x - 1 >= 0 && !visited.has(`${x - 1},${y}`) && grid[y][x - 1] !== 'X') {
      queue.push([x - 1, y, distance + 1]);
      visited.add(`${x - 1},${y}`);
    }
    // right
    if (
      x + 1 < grid[0].length &&
      !visited.has(`${x + 1},${y}`) &&
      grid[y][x + 1] !== 'X'
    ) {
      queue.push([x + 1, y, distance + 1]);
      visited.add(`${x + 1},${y}`);
    }
  }

  return -1;
}

// test_00:
{
  const grid = [
    ['O', 'O', 'O', 'O', 'O'],
    ['O', 'X', 'O', 'O', 'O'],
    ['O', 'X', 'X', 'O', 'O'],
    ['O', 'X', 'C', 'O', 'O'],
    ['O', 'X', 'X', 'O', 'O'],
    ['C', 'O', 'O', 'O', 'O'],
  ];

  expect(closestCarrot(grid, 1, 2)).to.equal(4);
}

// test_01:
{
  const grid = [
    ['O', 'O', 'O', 'O', 'O'],
    ['O', 'X', 'O', 'O', 'O'],
    ['O', 'X', 'X', 'O', 'O'],
    ['O', 'X', 'C', 'O', 'O'],
    ['O', 'X', 'X', 'O', 'O'],
    ['C', 'O', 'O', 'O', 'O'],
  ];

  expect(closestCarrot(grid, 0, 0)).to.equal(5);
}

// test_02:
{
  const grid = [
    ['O', 'O', 'X', 'X', 'X'],
    ['O', 'X', 'X', 'X', 'C'],
    ['O', 'X', 'O', 'X', 'X'],
    ['O', 'O', 'O', 'O', 'O'],
    ['O', 'X', 'X', 'X', 'X'],
    ['O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'C', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O'],
  ];

  expect(closestCarrot(grid, 3, 4)).to.equal(9);
}

// test_03:
{
  const grid = [
    ['O', 'O', 'X', 'O', 'O'],
    ['O', 'X', 'X', 'X', 'O'],
    ['O', 'X', 'C', 'C', 'O'],
  ];

  expect(closestCarrot(grid, 1, 4)).to.equal(2);
}

// test_04:
{
  const grid = [
    ['O', 'O', 'X', 'O', 'O'],
    ['O', 'X', 'X', 'X', 'O'],
    ['O', 'X', 'C', 'C', 'O'],
  ];

  expect(closestCarrot(grid, 2, 0)).to.equal(-1);
}

// test_05:
{
  const grid = [
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'C'],
  ];

  expect(closestCarrot(grid, 0, 0)).to.equal(-1);
}

// test_06:
{
  const grid = [
    ['O', 'O', 'X', 'C', 'O'],
    ['O', 'X', 'X', 'X', 'O'],
    ['C', 'X', 'O', 'O', 'O'],
  ];

  expect(closestCarrot(grid, 2, 2)).to.equal(5);
}
