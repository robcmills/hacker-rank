import { expect } from 'chai';

/*
Write a function, breakingBoundaries, that takes in 5 arguments: a number of rows (m), a number of columns (n), a number of moves (k), a starting row (r), and a starting column (c). Say you were situated in a grid with dimensions m * n. If you had to start at position (r,c), in how many different ways could you move out of bounds if you could take at most k moves. A single move is moving one space up, down, left, or right. During a path you may revisit a position.

For example:

Given m, n, k, r, c:

3, 4, 2, 0, 0

This input asks us to count the numbers of ways
to move out of bounds in a 3 by 4 grid, starting at
position (0, 0) if we could take at most 2 moves.

The answer is 4 because of these 4 distinct ways:
 1. left
 2. up
 3. right, up
 4. down, left
The function should return a number representing how many ways you can move out of bounds.

### Approach

We can model potential moves as a tree.

Given m, n, k, r, c:
      3, 4, 2, 0, 0

  0 1 2 3                         0,0
 ┌─┬─┬─┬─┐           ┌────────┬────┴────┬──────────┐
0│S│ │ │ │         (0,-1)    0,1     (-1,0)       1,0 
 ├─┼─┼─┼─┤            ┌────┬──┴──┬────┐    ┌─────┬─┴──┬────┐
1│ │ │ │ │           0,0  0,2 (-1,1) 1,1 (1,-1) 1,1  0,0  2,0
 ├─┼─┼─┼─┤
2│ │ │ │ │
 └─┴─┴─┴─┘

Once an out-of-bounds position is reached, we don't have to explore that sub-tree.
Once we have recursed down the tree k times, then we just return the sum of all
out-of-bounds nodes in descendents.

Optimization:

If we store coordinates as well as k values in nodes, then we can utilize standard
memoization to prune duplicate sub-trees.

Complexity:

Time: O(mnk)
Space: O(mnk)

*/
function breakingBoundaries(
  m: number,
  n: number,
  k: number,
  r: number,
  c: number,
  memo: Record<string, number> = {}
): number {
  const key = `${r},${c},${k}`;
  if (key in memo) return memo[key];
  if (k < 0) return 0;
  if (r < 0 || r >= m || c < 0 || c >= n) return 1;

  const sum =
    breakingBoundaries(m, n, k - 1, r - 1, c, memo) +
    breakingBoundaries(m, n, k - 1, r + 1, c, memo) +
    breakingBoundaries(m, n, k - 1, r, c - 1, memo) +
    breakingBoundaries(m, n, k - 1, r, c + 1, memo);
  memo[key] = sum;
  return sum;
}

// test_00:
expect(breakingBoundaries(3, 4, 2, 0, 0)).to.equal(4);

// test_01:
expect(breakingBoundaries(2, 2, 2, 1, 1)).to.equal(6);

// test_02:
expect(breakingBoundaries(3, 4, 3, 0, 0)).to.equal(11);

// test_03:
expect(breakingBoundaries(4, 4, 5, 2, 1)).to.equal(160);

// test_04:
expect(breakingBoundaries(5, 6, 9, 2, 5)).to.equal(11635);

// test_05:
expect(breakingBoundaries(6, 6, 12, 3, 4)).to.equal(871065);

// test_06:
expect(breakingBoundaries(6, 6, 15, 3, 4)).to.equal(40787896);

// test_07:
expect(breakingBoundaries(6, 8, 16, 2, 1)).to.equal(137495089);
