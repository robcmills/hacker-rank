import { expect } from 'chai';

/*
Write a function, lexicalOrder, that takes in 2 words and an alphabet string as an argument. The function should return true if the first word should appear before the second word if lexically-ordered according to the given alphabet order. If the second word should appear first, then return false.

Note that the alphabet string may be any arbitrary string.

Intuitively, Lexical Order is like "dictionary" order:

You can assume that all characters are lowercase a-z.

You can assume that the alphabet contains all 26 letters.

### Approach

Create a pointer at the first letters.
If they are the same, increment the pointer and compare the next,
until you run out of (same) letters in one of the words, in which case 
the shorter word should come first.

Compare them. 
If one is larger than the other, return true or false accordingly.

Comparisons can be optimized by building a hashmap from the alphabet
of characters to their index.

Complexity:
a = length of alphabet
w = length of shorter word

Time: O(a)
Space: O(a)
*/
function lexicalOrder(word1: string, word2: string, alphabet: string): boolean {
  const alphaMap: Record<string, number> = { undefined: -1 };
  for (let i = 0; i < alphabet.length; i++) {
    alphaMap[alphabet[i]] = i;
  }

  let j = 0;
  while (word1[j] === word2[j] && j <= word1.length && j <= word2.length) {
    j++;
  }

  return alphaMap[word1[j]] <= alphaMap[word2[j]];
}

// test_00:
{
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  expect(lexicalOrder('apple', 'dock', alphabet)).to.equal(true);
}

// test_01:
{
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  expect(lexicalOrder('apple', 'ample', alphabet)).to.equal(false);
}

// test_02:
{
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  expect(lexicalOrder('app', 'application', alphabet)).to.equal(true);
}

// test_03:
{
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  expect(lexicalOrder('backs', 'backdoor', alphabet)).to.equal(false);
}

// test_04:
{
  const alphabet = 'ghzstijbacdopnfklmeqrxyuvw';
  expect(lexicalOrder('zoo', 'dinner', alphabet)).to.equal(true);
}

// test_05:
{
  const alphabet = 'ghzstijbacdopnfklmeqrxyuvw';
  expect(lexicalOrder('leaper', 'leap', alphabet)).to.equal(false);
}

// test_06:
{
  const alphabet = 'ghzstijbacdopnfklmeqrxyuvw';
  expect(lexicalOrder('backs', 'backdoor', alphabet)).to.equal(true);
}

// test_07:
{
  const alphabet = 'ghzstijbacdopnfklmeqrxyuvw';
  expect(lexicalOrder('semper', 'semper', alphabet)).to.equal(true);
}
