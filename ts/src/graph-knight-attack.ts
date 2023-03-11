import { expect } from 'chai';

/*
A knight and a pawn are on a chess board. Can you figure out the minimum number of moves required for the knight to travel to the same position of the pawn? On a single move, the knight can move in an "L" shape; two spaces in any direction, then one space in a perpendicular direction. This means that on a single move, a knight has eight possible positions it can move to.

Write a function, knightAttack, that takes in 5 arguments:

n, kr, kc, pr, pc

n = the length of the chess board
kr = the starting row of the knight
kc = the starting column of the knight
pr = the row of the pawn
pc = the column of the pawn

The function should return a number representing the minimum number of moves required for the knight to land ontop of the pawn. The knight cannot move out-of-bounds of the board. You can assume that rows and columns are 0-indexed. This means that if n = 8, there are 8 rows and 8 columns numbered 0 to 7. If it is not possible for the knight to attack the pawn, then return null.
*/
function knightAttack(
  n: number,
  kr: number,
  kc: number,
  pr: number,
  pc: number
): number | null {
  const visited = new Set<string>();
  const queue = [{ x: kc, y: kr, moves: 0 }];
  while (queue.length > 0) {
    const { x, y, moves } = queue.shift() as {
      x: number;
      y: number;
      moves: number;
    };

    const key = `${x},${y}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (x === pc && y === pr) return moves;

    for (let move of getMoves(n, x, y)) {
      queue.push({ ...move, moves: moves + 1 });
    }
  }
  return null;
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

function getMoves(n: number, x: number, y: number): { x: number; y: number }[] {
  const moves: { x: number; y: number }[] = [];
  for (let [deltaX, deltaY] of deltas) {
    const targetX = x + deltaX;
    const targetY = y + deltaY;
    if (targetX >= 0 && targetX < n && targetY >= 0 && targetY < n) {
      moves.push({ x: targetX, y: targetY });
    }
  }
  return moves;
}

/*
♟ □ ■
□ ■ □
♘ □ ■
*/
expect(knightAttack(3, 2, 0, 0, 0)).to.equal(2);

// test_00:
expect(knightAttack(8, 1, 1, 2, 2)).to.equal(2);

// test_01:
expect(knightAttack(8, 1, 1, 2, 3)).to.equal(1);

// test_02:
expect(knightAttack(8, 0, 3, 4, 2)).to.equal(3);

// test_03:
expect(knightAttack(8, 0, 3, 5, 2)).to.equal(4);

// test_04:
expect(knightAttack(24, 4, 7, 19, 20)).to.equal(10);

// test_05:
expect(knightAttack(100, 21, 10, 0, 0)).to.equal(11);

// test_06:
expect(knightAttack(3, 0, 0, 1, 2)).to.equal(1);

// test_07:
expect(knightAttack(3, 0, 0, 1, 1)).to.equal(null);
