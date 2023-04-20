import { expect } from 'chai';

/*
54. Spiral Matrix
Medium
11.1K
1K
Companies
Given an m x n matrix, return all elements of the matrix in spiral order.

 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100

### Approach

Keep track of current position (start at 0,0), current direction,
and all visited positions (greater space complexity).

Iterate in the current direction, adding values to result,
until the next position in that direction is either out of bounds
or already visited. In that case, "turn right" to the next direction
and continue until both the next position in the current direction 
and the direction after turning are already in the visited set.

*/
function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  const visited = new Set<string>();
  let direction = 'R';
  let x = 0;
  let y = 0;
  const height = matrix.length;
  const width = matrix[0].length;

  while (
    !visited.has(`${x},${y}`) &&
    x < width &&
    y < height &&
    x >= 0 &&
    y >= 0
  ) {
    result.push(matrix[y][x]);
    visited.add(`${x},${y}`);

    if (direction === 'R' && (x + 1 >= width || visited.has(`${x + 1},${y}`))) {
      direction = turn('R');
    } else if (
      direction === 'D' &&
      (y + 1 >= height || visited.has(`${x},${y + 1}`))
    ) {
      direction = turn('D');
    } else if (
      direction === 'L' &&
      (x - 1 < 0 || visited.has(`${x - 1},${y}`))
    ) {
      direction = turn('L');
    } else if (
      direction === 'U' &&
      (y - 1 < 0 || visited.has(`${x},${y - 1}`))
    ) {
      direction = turn('U');
    }

    if (direction === 'R') {
      x += 1;
    } else if (direction === 'D') {
      y += 1;
    } else if (direction === 'L') {
      x -= 1;
    } else if (direction === 'U') {
      y -= 1;
    }
  }

  return result;
}

function turn(d: string) {
  return {
    R: 'D',
    D: 'L',
    L: 'U',
    U: 'R',
  }[d] as string;
}

// // Example 1:
// {
//   const matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ];
//   const expected = [1, 2, 3, 6, 9, 8, 7, 4, 5];
//   expect(spiralOrder(matrix)).to.deep.equal(expected);
// }
//
// // Example 2:
// {
//   const matrix = [
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//   ];
//   const expected = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7];
//   expect(spiralOrder(matrix)).to.deep.equal(expected);
// }
//
// // Example 3
// {
//   const matrix = [[1]];
//   const expected = [1];
//   expect(spiralOrder(matrix)).to.deep.equal(expected);
// }

// Example 4
{
  const matrix = [[3], [2]];
  const expected = [3, 2];
  expect(spiralOrder(matrix)).to.deep.equal(expected);
}
