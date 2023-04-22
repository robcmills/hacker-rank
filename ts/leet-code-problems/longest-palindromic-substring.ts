import { expect } from 'chai';

/*
5. Longest Palindromic Substring
Medium
24.8K
1.5K
company
Cisco
company
Amazon
company
Microsoft

Given a string s, return the longest palindromic substring in s.
 
Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.

### Approach

Iterate through the indices of the array, and for each index, create two pointers, left and right:

  'babad'
   ↑↑↑
   l│r
    index

While the characters at the left and right pointers are the same, increment/decrement them. 
In each iteration, check whether the current palindromic substring is our new longest.

Note that there are two cases to check for: even and odd length substrings.

*/
function longestPalindrome(s: string): string {
  if (s.length === 0) return '';

  let longest = s[0];

  for (let i = 0; i < s.length; i++) {
    // check for even length palindrome
    // abba  abccba
    let left = i;
    let right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const length = right - left + 1;
      if (length > longest.length) {
        longest = s.slice(left, right + 1);
      }
      left -= 1;
      right += 1;
    }

    // check for odd length palindrome
    // aba abcba
    left = i - 1;
    right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const length = right - left + 1;
      if (length > longest.length) {
        longest = s.slice(left, right + 1);
      }
      left -= 1;
      right += 1;
    }
  }

  return longest;
}

// Example 1:
{
  const s = 'babad';
  const expected = 'bab';
  expect(longestPalindrome(s)).to.equal(expected);
  // Explanation: "aba" is also a valid answer.
}

// Example 2:
{
  const s = 'cbbd';
  const expected = 'bb';
  expect(longestPalindrome(s)).to.equal(expected);
}

// Example 3;
{
  const s = 'ac';
  const expected = 'a';
  expect(longestPalindrome(s)).to.equal(expected);
}
