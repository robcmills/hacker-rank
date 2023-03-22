import { expect } from 'chai';

/*
Write a function, stringSearch, that takes in a grid of letters and a string as arguments. The function should return a boolean indicating whether or not the string can be found in the grid as a path by connecting horizontal or vertical positions. The path can begin at any position, but you cannot reuse a position more than once in the path.

You can assume that all letters are lowercase and alphabetic.

### Approach

Iterate the grid and do a breadth first traversal from each
character to see if we can string together a match for 
the whole string. Memoize visited characters to prevent reusing
positions during each traversal, but also globally memoize 
characters with target string index to optimize.

Complexity:

c = number of columns
r = number of rows
Time: O(3^rc)
Space: O(rc)
*/
function stringSearch(grid: string[][], s: string): boolean {
  const memo = new Set<string>();
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (explore(grid, x, y, s, 0, memo)) {
        return true;
      }
    }
  }
  return false;
}

const deltas = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function explore(
  grid: string[][],
  x: number,
  y: number,
  s: string,
  i: number,
  memo: Set<string>,
  visited = new Set<string>()
): boolean {
  const key = `${x},${y},${i}`;
  if (memo.has(key)) return false;
  if (grid[y][x] !== s[i]) return false;
  if (i === s.length - 1) return true;

  visited.add(`${x},${y}`);

  for (let [deltaX, deltaY] of deltas) {
    const targetX = x + deltaX;
    const targetY = y + deltaY;
    if (
      !visited.has(`${targetX},${targetY}`) &&
      inBounds(grid, targetX, targetY) &&
      explore(grid, targetX, targetY, s, i + 1, memo)
    ) {
      return true;
    }
  }

  memo.add(key);
  return false;
}

function inBounds(grid: string[][], x: number, y: number): boolean {
  return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
}

// test_00:
{
  const grid = [
    ['e', 'y', 'h', 'i', 'j'],
    ['q', 'x', 'e', 'r', 'p'],
    ['r', 'o', 'l', 'l', 'n'],
    ['p', 'r', 'x', 'o', 'h'],
    ['a', 'a', 'm', 'c', 'm'],
  ];
  expect(stringSearch(grid, 'hello')).to.equal(true);
}

// test_01:
{
  const grid = [
    ['e', 'y', 'h', 'i', 'j'],
    ['q', 'x', 'e', 'r', 'p'],
    ['r', 'o', 'l', 'l', 'n'],
    ['p', 'r', 'x', 'o', 'h'],
    ['a', 'a', 'm', 'c', 'm'],
  ];
  expect(stringSearch(grid, 'proxy')).to.equal(true);
}

// test_02:
{
  const grid = [
    ['e', 'y', 'h', 'i', 'j'],
    ['q', 'x', 'e', 'r', 'p'],
    ['r', 'o', 'l', 'l', 'n'],
    ['p', 'r', 'x', 'o', 'h'],
    ['a', 'a', 'm', 'c', 'm'],
  ];
  expect(stringSearch(grid, 'rolling')).to.equal(false);
}

// test_03:
{
  const grid = [
    ['e', 'y', 'h', 'i', 'j'],
    ['q', 'x', 'e', 'r', 'p'],
    ['r', 'o', 'l', 'l', 'n'],
    ['p', 'r', 'x', 'o', 'h'],
    ['a', 'a', 'm', 'z', 'm'],
  ];
  expect(stringSearch(grid, 'zoo')).to.equal(false);
}

// test_04:
{
  const grid = [
    ['q', 'w', 'h', 'i', 'j'],
    ['q', 'e', 'r', 'o', 'p'],
    ['h', 'y', 't', 'x', 'z'],
    ['k', 'o', 'm', 'o', 'p'],
  ];
  expect(stringSearch(grid, 'qwerty')).to.equal(true);
}

// test_05:
{
  const grid = [
    ['f', 'd', 'i', 'e', 'l', 'u', 'j', 't', 'q', 'v', 'o', 'p'],
    ['o', 'p', 'b', 'e', 'm', 'w', 'm', 'l', 'h', 'j', 's', 'v'],
    ['g', 'b', 's', 'm', 'i', 'w', 'w', 'h', 'l', 'm', 'l', 'n'],
    ['a', 'l', 's', 'k', 'p', 'c', 't', 'u', 'v', 'b', 'c', 'm'],
    ['m', 't', 'c', 'k', 'e', 'n', 'r', 'b', 'a', 'z', 'l', 'c'],
    ['q', 'm', 'a', 'p', 'a', 'p', 'i', 'i', 'u', 't', 'z', 'z'],
    ['d', 'u', 'z', 'o', 'e', 'r', 'a', 't', 't', 'c', 'q', 'k'],
    ['f', 'u', 'z', 'g', 'c', 'i', 'k', 'v', 'o', 'f', 's', 'w'],
    ['p', 'h', 'u', 'i', 'k', 'c', 'v', 'v', 'h', 'q', 'v', 'i'],
    ['l', 'q', 'w', 'f', 'y', 'g', 'w', 'f', 'a', 'u', 'x', 'q'],
  ];
  expect(stringSearch(grid, 'paprika')).to.equal(true);
}

// test_06:
{
  const grid = [
    ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's', 's', 's', 's', 's', 'x', 'x'],
    ['s', 's', 's', 's', 's', 's', 's', 's', 's', 'x', 'h'],
  ];
  expect(stringSearch(grid, 'sssssssh')).to.equal(false);
}

// test_07:
{
  const grid = [
    ['a', 'b', 'a'],
    ['t', 'x', 'x'],
    ['x', 'x', 'x'],
  ];
  expect(stringSearch(grid, 'abat')).to.equal(true);
}
