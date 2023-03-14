import { expect } from 'chai';

/*
A knight is on a chess board. Can you figure out the total number of ways the knight can move to a target position in exactly m moves? On a single move, the knight can move in an "L" shape; two spaces in any direction, then one space in a perpendicular direction. This means that on a single move, a knight has eight possible positions it can move to.

Write a function, knightlyNumber, that takes in 6 arguments:

n, m, kr, kc, pr, pc

n = the length of the chess board
m = the number of moves that must be used
kr = the starting row of the knight
kc = the starting column of the knight
pr = the target row
pc = the target column
The function should return the number of different ways the knight can move to the target in exactly m moves. The knight can revisit positions of the board if needed. The knight cannot move out-of-bounds of the board. You can assume that rows and columns are 0-indexed. This means that if n = 8, there are 8 rows and 8 columns numbered 0 to 7.

### Approach

Explore a tree, where each node represents a board position,
and each branch represents a valid move. Recurse m times and
if you have reached the target position, return 1 else 0.
Sum the returns as you return back up the tree. Memoize results
to optimize.

Example: knightlyNumber(3, 4, 0, 0, 2, 2) = 2

  0 1 2
1 ♘ ■ □ 
2 ■ □ ■                                        0,0
3 □ ■ ♟                 ┌───────────────────────┴───────────────────────┐
                       1,2                     m=3                     2,1
            ┌───────────┴───────────┐                       ┌───────────┴───────────┐
           0,0                     2,0         m=2         0,0                     0,2
      ┌─────┴─────┐           ┌─────┴─────┐           ┌─────┴─────┐           ┌─────┴─────┐
     1,2         2,1         0,1         1,2   m=1   1,2         2,1         1,0         2,1
   ┌──┴──┐     ┌──┴──┐     ┌──┴──┐                                         ┌──┴──┐
  0,0   2,0   0,0   0,2   0,2   2,2            m=0                        0,2   2,2
                                 ^                                               ^

Complexity:
n = board size
m = number of moves
Time: O(m*n^2)
Space: O(m*n^2)
*/
function knightlyNumber(
  n: number,
  m: number,
  kr: number,
  kc: number,
  pr: number,
  pc: number,
  memo: Record<string, number> = {}
): number {
  const key = `${kc},${kr},${m}`;
  if (key in memo) return memo[key];
  if (m === 0) return kc === pc && kr === pr ? 1 : 0;

  let sum = 0;
  for (let [x, y] of getValidMoves(n, kc, kr)) {
    sum += knightlyNumber(n, m - 1, y, x, pr, pc, memo);
  }
  memo[key] = sum;
  return sum;
}

const deltas = [
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
];

function getValidMoves(size: number, x: number, y: number) {
  const moves = [];
  for (let [deltaX, deltaY] of deltas) {
    const targetX = x + deltaX;
    const targetY = y + deltaY;
    if (targetX >= 0 && targetX < size && targetY >= 0 && targetY < size) {
      moves.push([targetX, targetY]);
    }
  }
  return moves;
}

// test_00:
expect(knightlyNumber(8, 2, 4, 4, 5, 5)).to.equal(2);

// test_01:
expect(knightlyNumber(8, 2, 7, 1, 7, 1)).to.equal(3);

// test_02:
expect(knightlyNumber(8, 2, 5, 4, 5, 4)).to.equal(8);

// test_03:
expect(knightlyNumber(8, 3, 5, 2, 4, 4)).to.equal(21);

// test_04:
expect(knightlyNumber(20, 6, 18, 7, 10, 15)).to.equal(60);

// test_05:
expect(knightlyNumber(20, 12, 8, 3, 9, 14)).to.equal(98410127);

// test_06:
expect(knightlyNumber(8, 2, 0, 0, 1, 1)).to.equal(0);
