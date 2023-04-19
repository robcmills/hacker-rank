import { expect } from 'chai';

/*
48. Rotate Image
Medium
14.3K
641
Companies
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000

### Approach

     left  right
     ↓     ↓
     1, 2, 3 ← top
     4, 5, 6
     7, 8, 9 ← bottom

Create 4 pointers as shown above. 
We will rotate the outer-most rows and colums first,
and then work our way inward.

We start by storing the top left value in a temporary variable,
and then moving the corner values like so:

  row = 0
  topLeft = 1
     │
     └──4──┐
           ↓
  ┌→ 1, 2, 3 ─┐
 1│  4, 5, 6  │3
  └──7, 8, 9 ←┘
     ↑     │
     └──2──┘

Will will repeat this process for all values in the outer-most rows and
columns in a for loop where i is initially set to the left pointer, while
it is less than the right pointer:

     left  right
     ↓     ↓
 i = 0  1    for (let i = left; i < right; i++)
     1, 2, 3 ← top
     4, 5, 6
     7, 8, 9 ← bottom


Then increment the four pointers inwards, left++, right--, top++, bottom--
and repeat the rotating of values in the same way as shown above, 
until they overlap (left <= right).

        ↓  ↓
     1, 2, 3, 4 
     5, *, *, 8 ← 
     9, *, *,12 ← 
    13,14,15,16 

*/
function rotate(matrix: number[][]): void {
  const n = matrix.length;
  let left = 0;
  let right = n - 1;
  let top = 0;
  let bottom = n - 1;

  while (left < right) {
    for (let i = 0; left + i < right; i++) {
      const temp = matrix[top][left + i];
      matrix[top][left + i] = matrix[bottom - i][left];
      matrix[bottom - i][left] = matrix[bottom][right - i];
      matrix[bottom][right - i] = matrix[top + i][right];
      matrix[top + i][right] = temp;
    }
    left++;
    right--;
    top++;
    bottom--;
  }
}

// Example 1:
{
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const expected = [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ];
  rotate(matrix);
  expect(matrix).to.deep.equal(expected);
}

// Example 2:
{
  const matrix = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ];
  const expected = [
    [15, 13, 2, 5],
    [14, 3, 4, 1],
    [12, 6, 8, 9],
    [16, 7, 10, 11],
  ];
  rotate(matrix);
  expect(matrix).to.deep.equal(expected);
}

// Example 3
{
  const matrix = [
    [2, 29, 20, 26, 16, 28],
    [12, 27, 9, 25, 13, 21],
    [32, 33, 32, 2, 28, 14],
    [13, 14, 32, 27, 22, 26],
    [33, 1, 20, 7, 21, 7],
    [4, 24, 1, 6, 32, 34],
  ];
  const expected = [
    [4, 33, 13, 32, 12, 2],
    [24, 1, 14, 33, 27, 29],
    [1, 20, 32, 32, 9, 20],
    [6, 7, 27, 2, 25, 26],
    [32, 21, 22, 28, 13, 16],
    [34, 7, 26, 14, 21, 28],
  ];
  rotate(matrix);
  expect(matrix).to.deep.equal(expected);
}
