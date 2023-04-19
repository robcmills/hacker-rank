import { expect } from 'chai';

/*
51. N-Queens
Hard
Companies
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

Constraints:

1 <= n <= 9

### Approach

Example:

  n = 4     n = 5      n = 8

  . Q . .   . Q . . .  . Q . . . . . .
  . . . Q   . . . . Q  . . . . . . . Q
  Q . . .   . . Q . .  . . . Q . . . .
  . . Q .   Q . . . .  . . . . . Q . .
            . . . Q .  . . Q . . . . .
  . . Q .              . . . . Q . . .
  Q . . .   . . . Q .  Q . . . . . . .
  . . . Q   Q . . . .  . . . . . . Q .
  . Q . .   . . Q . .
            . . . . Q
            . Q . . .

Key Insight:
Due to the way that queens move in chess (rank, file and diagonal)
we know that each row, colum and diagonal can only have one queen.

We can use three Sets to keep track of this:
columnSet, downDiagonalSet, upDiagonalSet

Key Insight:
We can create constants for each diagonal by performing
row and column calculations like so:

    0   1   2   3
  ┌───┬───┬───┬───┐
0 │ 0 │-1 │-2 │-3 │ down right diagonals:
  ├───┼───┼───┼───┤
1 │ 1 │ 0 │-1 │-2 │ row - column
  ├───┼───┼───┼───┤
2 │ 2 │ 1 │ 0 │-1 │
  ├───┼───┼───┼───┤
3 │ 3 │ 2 │ 1 │ 0 │
  └───┴───┴───┴───┘

    0   1   2   3
  ┌───┬───┬───┬───┐
0 │ 0 │ 1 │ 2 │ 3 │ up right diagonals:
  ├───┼───┼───┼───┤
1 │ 1 │ 2 │ 3 │ 4 │ row + column
  ├───┼───┼───┼───┤
2 │ 2 │ 3 │ 4 │ 5 │
  ├───┼───┼───┼───┤
3 │ 3 │ 4 │ 5 │ 6 │
  └───┴───┴───┴───┘

These calculations allow us to easily add/remove and check board 
positions against our sets.

We will iterate over each row of the board, and attempt to 
place a queen somewhere in that row, but skip any positions already
added to our sets, because that would mean there is already a queen on 
that diagonal or column, and would be able to attack. 

If we get through all the rows, successfully placing a queen in each row,
then we have found a valid board configuration and we add it to the result
(base case).

We can use recursion, incrementing the row with each step down the decision
tree. And then removing positions and resetting the board as we step back up 
the tree (backtrack).

           ┌──────────────────────┬──┴───────┬───────┐
row=0      Q...                  .Q..      ..Q.   ...Q
       ┌─┬─┴─┬────────┐        ┌─┬┴┬────┐
row=1  x x ..Q.    ...Q        x x x ...Q    etc...
          ┌─┬┴┬─┐ ┌──┬┴──┬─┐      ┌────┬┴┬─┐
row=2     x x x x x .Q.. x x      Q... x x x
                  ┌─┬┴┬─┐     ┌─┬─┴─┬──┐
row=3             x x x x     x x ..Q. x
                                    ↑
                                 solution

Note how previous placements prevent placements in lower rows, by way of 
checking the column and diagonals sets:

    Q x x x  Q x x x
    x x Q x  x x x Q
    x x x x  x . x x
    x . x x  x x . x

*/
function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const columnSet = new Set<number>();
  const upDiagonalSet = new Set<number>(); // row + column
  const downDiagonalSet = new Set<number>(); // row - column
  const board: string[][] = [];
  for (let i = 0; i < n; i++) {
    board.push(Array(n).fill('.'));
  }

  const search = (row: number) => {
    if (row === n) {
      result.push(board.map((r) => r.join('')));
      return;
    }

    for (let column = 0; column < n; column++) {
      if (
        columnSet.has(column) ||
        upDiagonalSet.has(row + column) ||
        downDiagonalSet.has(row - column)
      ) {
        continue;
      }

      columnSet.add(column);
      upDiagonalSet.add(row + column);
      downDiagonalSet.add(row - column);
      board[row][column] = 'Q';

      search(row + 1);

      // backtrack
      columnSet.delete(column);
      upDiagonalSet.delete(row + column);
      downDiagonalSet.delete(row - column);
      board[row][column] = '.';
    }
  };

  search(0);

  return result;
}

// Example 1:
{
  const n = 4;
  const expected = [
    ['.Q..', '...Q', 'Q...', '..Q.'],
    ['..Q.', 'Q...', '...Q', '.Q..'],
  ];
  expect(solveNQueens(n)).to.have.deep.members(expected);
}

// Example 2:
{
  const n = 5;
  const expected = [
    ['Q....', '..Q..', '....Q', '.Q...', '...Q.'],
    ['Q....', '...Q.', '.Q...', '....Q', '..Q..'],
    ['.Q...', '...Q.', 'Q....', '..Q..', '....Q'],
    ['.Q...', '....Q', '..Q..', 'Q....', '...Q.'],
    ['..Q..', 'Q....', '...Q.', '.Q...', '....Q'],
    ['..Q..', '....Q', '.Q...', '...Q.', 'Q....'],
    ['...Q.', 'Q....', '..Q..', '....Q', '.Q...'],
    ['...Q.', '.Q...', '....Q', '..Q..', 'Q....'],
    ['....Q', '.Q...', '...Q.', 'Q....', '..Q..'],
    ['....Q', '..Q..', 'Q....', '...Q.', '.Q...'],
  ];
  expect(solveNQueens(n)).to.have.deep.members(expected);
}

// Example 3:
{
  const n = 1;
  const expected = [['Q']];
  expect(solveNQueens(n)).to.have.deep.members(expected);
}
