import { expect } from 'chai';

/*
A string is said to be a child of another string if it can be formed by deleting 0 or more characters from the other string.
Letters cannot be rearranged.
Given two strings of equal length, what's the longest string that can be constructed such that it is a child of both?
*/
function longestCommonSubsequence(s1: string, s2: string): number {
  // dynamic programming solution
  const dp = Array(s2.length + 1)
    .fill(0)
    .map(() => Array(s1.length + 1).fill(0));

  for (let i = s1.length - 1; i >= 0; i--) {
    for (let j = s2.length - 1; j >= 0; j--) {
      if (s1[i] === s2[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  return dp[0][0];
}

expect(longestCommonSubsequence('abcd', 'abdc')).to.equal(3);
expect(longestCommonSubsequence('harry', 'sally')).to.equal(2);
expect(longestCommonSubsequence('aa', 'bb')).to.equal(0);
expect(longestCommonSubsequence('shinchan', 'noharaaa')).to.equal(3);
expect(longestCommonSubsequence('abcdef', 'fbdamn')).to.equal(2);
