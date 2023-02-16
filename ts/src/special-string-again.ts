import { expect } from 'chai';

/*
Key insight:

A string of all the same characters includes multiple "special" substrings,
where each character's index makes it unique:

s = 'aaaa'
substrings = 
1 'a', 'a', 'a', 'a' // 4
2 'aa', 'aa', 'aa'   // 3
3 'aaa', 'aaa'       // 2
4 'aaaa'             // 1
                  total 10 = int(s.length * (s.length + 1) / 2)
*/

/*
A string is said to be a special string if either of two conditions is met:
All of the characters are the same, e.g. aaa.
All characters except the middle one are the same, e.g. aadaa.
A special substring is any substring of a string which meets one of those criteria.
Given a string, determine how many special substrings can be formed from it.
*/
function getSpecialStringsCount(s: string): number {
  let result = 0;

  // Use "sliding window" technique
  // index is left pointer and index + charCount is right

  // find substrings for which all characters are the same
  let index = 0;
  while (index < s.length) {
    let charCount = 1;
    while (index + 1 < s.length && s[index] === s[index + 1]) {
      index++;
      charCount++;
    }
    // utilize insight that a string of all the same characters includes multiple "special" sub-strings
    result += Math.floor((charCount * (charCount + 1)) / 2);
    index++;
  }

  // find palindromes
  for (let i = 1; i < s.length - 1; i++) {
    let charCount = 1;
    while (
      i + charCount < s.length &&
      i - charCount >= 0 &&
      s[i - 1] !== s[i] &&
      s[i - charCount] === s[i - 1] &&
      s[i - charCount] === s[i + charCount]
    ) {
      charCount++;
    }
    result += charCount - 1;
  }

  return result;
}

expect(getSpecialStringsCount('mm')).to.equal(3);
expect(getSpecialStringsCount('mnonopoo')).to.equal(12);
expect(getSpecialStringsCount('asasd')).to.equal(7);
expect(getSpecialStringsCount('abcbaba')).to.equal(10);
expect(getSpecialStringsCount('aaaa')).to.equal(10);
