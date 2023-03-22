import { expect } from 'chai';

/*
Write a function, anagrams, that takes in two strings as arguments. The function should return a boolean indicating whether or not the strings are anagrams. Anagrams are strings that contain the same characters, but in any order.

Complexity:

n = string1 length
m = string2 length
Time: O(n+m)
Space: O(n+m)
*/
function anagrams(s1: string, s2: string): boolean {
  const characters: Record<string, number> = {};
  for (let char of s1) {
    if (!(char in characters)) characters[char] = 0;
    characters[char] += 1;
  }

  for (let char of s2) {
    if (!(char in characters)) return false;
    characters[char] -= 1;
  }

  for (let char in characters) {
    if (characters[char] !== 0) return false;
  }

  return true;
}

// test_00:
expect(anagrams('restful', 'fluster')).to.equal(true);

// test_01:
expect(anagrams('cats', 'tocs')).to.equal(false);

// test_02:
expect(anagrams('monkeyswrite', 'newyorktimes')).to.equal(true);

// test_03:
expect(anagrams('paper', 'reapa')).to.equal(false);

// test_04:
expect(anagrams('elbow', 'below')).to.equal(true);

// test_05:
expect(anagrams('tax', 'taxi')).to.equal(false);

// test_06:
expect(anagrams('taxi', 'tax')).to.equal(false);

// test_07:
expect(anagrams('night', 'thing')).to.equal(true);

// test_08:
expect(anagrams('abbc', 'aabc')).to.equal(false);

// test_09:
expect(anagrams('po', 'popp')).to.equal(false);

// test_10:
expect(anagrams('pp', 'oo')).to.equal(false);
