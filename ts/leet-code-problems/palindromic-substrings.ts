import { expect } from 'chai';

/*
647. Palindromic Substrings
Medium
8.9K
188
company
Goldman Sachs
company
Amazon
company
Facebook
Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.

### Approach

Iterate each index of the string, and look for palindromes by using two pointers,
left and right. While they point to equal characters, increment result count and expand the pointers outwards (decrement left and increment right).
Search for odd length palindromes as well as even length.

*/
function countSubstrings(s: string): number {
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    // always count palindromes of length 1
    result += 1;

    // count odd length palindromes
    let left = i - 1;
    let right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      result += 1;
      left -= 1;
      right += 1;
    }

    // count even length palindromes
    left = i;
    right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      result += 1;
      left -= 1;
      right += 1;
    }
  }

  return result;
}

// Example 1:
{
  const s = 'abc';
  const expected = 3;
  expect(countSubstrings(s)).to.equal(expected);
  // Explanation: Three palindromic strings: "a", "b", "c".
}

// Example 2:
{
  const s = 'aaa';
  const expected = 6;
  expect(countSubstrings(s)).to.equal(expected);
  // Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
}

// Example 3:
{
  const s = 'a';
  const expected = 1;
  expect(countSubstrings(s)).to.equal(expected);
}

// Example 4:
{
  const s = 'aaaa';
  const expected = 10;
  expect(countSubstrings(s)).to.equal(expected);
}

// Example 5:
{
  const s = 'abccba';
  const expected = 9;
  expect(countSubstrings(s)).to.equal(expected);
}

// Example 6:
{
  const s = 'abcba';
  const expected = 7;
  expect(countSubstrings(s)).to.equal(expected);
}
