import { expect } from 'chai';

/*
79. Word Search
Medium
13.1K
533
Companies
Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.
 
Follow up: Could you use search pruning to make your solution faster with a larger board?

### Approach

Iterate through every board position and do a depth first search.
Keep track of visited positions to avoid backtracking and optimize.

*/
function exist(board: string[][], word: string): boolean {
  const search = (
    [x, y]: [number, number],
    index: number,
    visiting: Set<string>
  ) => {
    if (board[y][x] === word[index] && index === word.length - 1) return true;
    if (board[y][x] !== word[index]) return false;
    const visitingKey = `${x},${y}`;
    visiting.add(visitingKey);

    for (let [deltaX, deltaY] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const targetX = x + deltaX;
      const targetY = y + deltaY;
      const key = `${targetX},${targetY}`;
      if (
        targetX < 0 ||
        targetX >= board[0].length ||
        targetY < 0 ||
        targetY >= board.length ||
        visiting.has(key)
      ) {
        continue;
      }
      if (search([targetX, targetY], index + 1, visiting)) return true;
    }

    visiting.delete(visitingKey);
    return false;
  };

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      if (search([x, y], 0, new Set<string>())) return true;
    }
  }

  return false;
}

// Example 1:
{
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  const word = 'ABCCED';
  expect(exist(board, word)).to.equal(true);
}

// Example 2:
{
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  const word = 'SEE';
  expect(exist(board, word)).to.equal(true);
}

// Example 3:
{
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  const word = 'ABCB';
  expect(exist(board, word)).to.equal(false);
}

{
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'E', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  const word = 'ABCESEEEFS';
  expect(exist(board, word)).to.equal(true);
}
