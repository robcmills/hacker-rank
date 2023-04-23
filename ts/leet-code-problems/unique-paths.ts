import { expect } from 'chai';

/*
62. Unique Paths
Medium
13.5K
380
company
Bloomberg
company
Google
company
TikTok

There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 109.

Constraints:

1 <= m, n <= 100

## Approach

  m = 3, n = 2

  3 2 1
  1 1 0


*/
function uniquePaths(m: number, n: number): number {
  // m = width;  n = height
  const dp: number[][] = Array(n).fill([]);
  for (let i = 0; i < n; i++) {
    dp[i] = Array(m).fill(0);
  }

  for (let r = n - 1; r >= 0; r--) {
    for (let c = m - 1; c >= 0; c--) {
      // right-most column or bottom row
      if (
        (c + 1 === m - 1 && r === n - 1) ||
        (c === m - 1 && r + 1 === n - 1) ||
        (c === m - 1 && r === n - 1)
      ) {
        if (dp[r]) dp[r][c] = 1;
        continue;
      }
      if (c + 1 < m && dp[r]) {
        dp[r][c] += dp[r][c + 1];
      }
      if (r + 1 < n && dp[r]) {
        dp[r][c] += dp[r + 1][c];
      }
    }
  }

  return dp[0][0];
}

// Example 1:
{
  const m = 3;
  const n = 7;
  const expected = 28;
  expect(uniquePaths(m, n)).to.equal(expected);
}

// Example 2:
{
  const m = 3;
  const n = 2;
  const expected = 3;
  expect(uniquePaths(m, n)).to.equal(expected);
  // Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
  // 1. Right -> Down -> Down
  // 2. Down -> Down -> Right
  // 3. Down -> Right -> Down
}

// Example 3:
{
  const m = 1;
  const n = 1;
  const expected = 1;
  expect(uniquePaths(m, n)).to.equal(expected);
}
