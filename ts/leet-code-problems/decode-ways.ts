import { expect } from 'chai';

/*
91. Decode Ways
Medium
9.8K
4.2K
company
TikTok
company
Amazon
company
Cisco
A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The test cases are generated so that the answer fits in a 32-bit integer.

Constraints:

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).

### Approach

This is very similar to climbing-stairs problem.

Given s = 1234

There are three ways to decode it:

  1 2 3 4
  12 3 4
  1 23 4

We could find these with a binary decision tree, where each branch represents the choice between parsing a number as a single digit or double digit (if possible) like so:
  
                      1234
              ┌───────┴───────┐
             [1]234          [12]34
           ┌────┴────┐           │ (34 > 26)
        [1,2]34   [1,23]4    [12,3]4
             │          │          │
        [1,2,3]4  [1,23,4]   [12,3,4]
               │
        [1,2,3,4]

But this has a runtime complexity of O(n^2) where n is the height of the tree.
That could be improved to O(n) with memoization, and the same space complexity.

But we can also use dynamic programming to perform the same logic with O(1) space complexity.

If we move backwards through the string, starting from a base case, and carrying values forward, we can arrive at the same solution.

Start by initializing two pointers. 
One for i + 1 with the base case value
and the other for i + 2 with an "empty" value

s = 1234
dp  ____10
        ↑↑

Now we can start iterating from the end of the string:

s = 1234
dp  ____10
       i↑↑

Basically, we are starting by looking at the sub-problem of only the last character: "4" and solving for how many ways are there to decode it.
Provided the number is valid (not a leading zero), this is our base case, and we can fill in 1. We are actually carrying the i + 1 pointer value forward, so that it works with the rest of the values.

s = 1234
dp  ___110
       i↑↑

Then move to the prev i, and move the pointers over:

s = 1234
dp  ___110
      i↑↑

Now we are looking at the sub-problem of "34". 
First we carry forward the value from i + 1:

s = 1234
dp  __1110
      i↑↑

Then we consider whether we can parse "34" as a two-digit number.
We can not, because the problem description limits the numbers to the range of 1:26.
So we just move on:

s = 1234
dp  __1110
     i↑↑

Again, carry forward i + 1 and then consider whether we can parse the ith digit as a two-digit number. We can, "23" so we add the value from i + 2 to the current ith position:

s = 1234
dp  _21110
     i↑↑

Rinse and repeat:

s = 1234
dp  321110
    i↑↑

And the zeroth dp value represents our solution.

*/
function numDecodings(s: string): number {
  let one = 1;
  let two = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    let next = 0;
    const char = s[i];
    if (char !== '0') next = one;

    // Check if digit + neighbor can be parsed as a two-digit number
    if (
      i + 1 < s.length &&
      (char === '1' || (char === '2' && '0123456'.includes(s[i + 1])))
    ) {
      next += two;
    }

    two = one;
    one = next;
  }

  return one;
}

// Example 1:
{
  const s = '12';
  const expected = 2;
  expect(numDecodings(s)).to.equal(expected);
  // Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
}

// Example 2:
{
  const s = '226';
  const expected = 3;
  expect(numDecodings(s)).to.equal(expected);
  // Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
}

// Example 3:
{
  const s = '06';
  const expected = 0;
  expect(numDecodings(s)).to.equal(expected);
  // Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
}
