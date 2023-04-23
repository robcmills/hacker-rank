import { expect } from 'chai';

/*
1143. Longest Common Subsequence
Medium
10.7K
131
company
Amazon
company
DoorDash
company
Apple

Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.

## Approach

This is a standard dynamic programming problem with a relatively simple recurrence relation:

  dp[r][c] =
    text1[c] === text2[r]
      ? 1 + dp[r + 1][c + 1] 
      : max(dp[r][c + 1], dp[r + 1][c])

and a simple base case: 

  if (text1.length === 0 && text2.length === 0) return 0;

For example, given text1 = 'abcde' and text2 = 'ace', the dp matrix would look like this:

    a b c d e
  a 3 2 2 1 1 0
  c 2 2 2 1 1 0
  e 1 1 1 1 1 0 ← row1 r
    0 0 0 0 0 0 ← row2
            ↑
            c

Time complexity will be O(m*n) where m = text1.length and n = text2.length
Space complexity can be O(m or n whichever is shorter) if we implement the
DP solution using only two row arrays.

*/
function longestCommonSubsequence(text1: string, text2: string): number {
  let row1 = Array(text1.length + 1).fill(0);
  let row2 = Array(text1.length + 1).fill(0);

  // rows = text2; columns = text1
  for (let r = text2.length - 1; r >= 0; r--) {
    for (let c = text1.length - 1; c >= 0; c--) {
      row1[c] =
        text1[c] === text2[r]
          ? 1 + row2[c + 1]
          : Math.max(row1[c + 1], row2[c]);
    }
    row2 = [...row1];
  }

  return row1[0];
}

// Example 1:
{
  const text1 = 'abcde';
  const text2 = 'ace';
  const expected = 3;
  expect(longestCommonSubsequence(text1, text2)).to.equal(expected);
  // Explanation: The longest common subsequence is "ace" and its length is 3.
}

// Example 2:
{
  const text1 = 'abc';
  const text2 = 'abc';
  const expected = 3;
  expect(longestCommonSubsequence(text1, text2)).to.equal(expected);
  // Explanation: The longest common subsequence is "abc" and its length is 3.
}

// Example 3:
{
  const text1 = 'abc';
  const text2 = 'def';
  const expected = 0;
  expect(longestCommonSubsequence(text1, text2)).to.equal(expected);
  // Explanation: There is no such common subsequence, so the result is 0.
}

// Example 4:
{
  const text1 = 'bsbininm';
  const text2 = 'jmjkbkjkv';
  const expected = 1;
  expect(longestCommonSubsequence(text1, text2)).to.equal(expected);
}
