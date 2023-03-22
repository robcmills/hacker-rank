import { expect } from 'chai';

/*
Write a function, mostFrequentChar, that takes in a string as an argument. The function should return the most frequent character of the string. If there are ties, return the character that appears earlier in the string.

You can assume that the input string is non-empty.

Complexity:

n = length of string
Time: O(n)
Space: O(n)

*/
function mostFrequentChar(s: string): string {
  const count: Record<string, number> = {};

  for (let char of s) {
    if (!(char in count)) {
      count[char] = 0;
    }
    count[char] += 1;
  }

  let best: string | null = null;
  for (let char of s) {
    if (best === null || count[char] > count[best]) {
      best = char;
    }
  }

  return best!;
}

// test_00:
expect(mostFrequentChar('bookeeper')).to.equal('e');

// test_01:
expect(mostFrequentChar('david')).to.equal('d');

// test_02:
expect(mostFrequentChar('abby')).to.equal('b');

// test_03:
expect(mostFrequentChar('mississippi')).to.equal('i');

// test_04:
expect(mostFrequentChar('potato')).to.equal('o');

// test_05:
expect(mostFrequentChar('eleventennine')).to.equal('e');

// test_06:
expect(mostFrequentChar('riverbed')).to.equal('r');
