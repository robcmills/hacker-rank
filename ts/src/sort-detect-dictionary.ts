import { expect } from 'chai';

/*
Write a function, detectDictionary, that takes in a dictionary of words and an alphabet string. The function should return a boolean indicating whether or not all words of the dictionary are lexically-ordered according to the alphabet.

You can assume that all characters are lowercase a-z.

You can assume that the alphabet contains all 26 letters.
*/
function detectDictionary(dictionary: string[], alphabet: string): boolean {
  const alphaMap: Record<string, number> = { undefined: -1 };
  for (let i = 0; i < alphabet.length; i++) {
    alphaMap[alphabet[i]] = i;
  }

  for (let j = 0; j < dictionary.length - 1; j++) {
    if (!isLexicalOrder(dictionary[j], dictionary[j + 1], alphaMap)) {
      return false;
    }
  }

  return true;
}

function isLexicalOrder(
  word1: string,
  word2: string,
  alphaMap: Record<string, number>
): boolean {
  let i = 0;
  while (word1[i] === word2[i] && i <= word1.length && i <= word2.length) {
    i++;
  }
  return alphaMap[word1[i]] < alphaMap[word2[i]];
}

// test_00:
{
  const dictionary = ['zoo', 'tick', 'tack', 'door'];
  const alphabet = 'ghzstijbacdopnfklmeqrxyuvw';
  expect(detectDictionary(dictionary, alphabet)).to.equal(true);
}

// test_01:
{
  const dictionary = ['zoo', 'tack', 'tick', 'door'];
  const alphabet = 'ghzstijbacdopnfklmeqrxyuvw';
  expect(detectDictionary(dictionary, alphabet)).to.equal(false);
}

// test_02:
{
  const dictionary = ['zoos', 'zoo', 'tick', 'tack', 'door'];
  const alphabet = 'ghzstijbacdopnfklmeqrxyuvw';
  expect(detectDictionary(dictionary, alphabet)).to.equal(false);
}

// test_03:
{
  const dictionary = ['miles', 'milestone', 'proper', 'process', 'goal'];
  const alphabet = 'mnoijpqrshkltabcdefguvwzxy';
  expect(detectDictionary(dictionary, alphabet)).to.equal(true);
}

// test_04:
{
  const dictionary = [
    'miles',
    'milestone',
    'pint',
    'proper',
    'process',
    'goal',
  ];
  const alphabet = 'mnoijpqrshkltabcdefguvwzxy';
  expect(detectDictionary(dictionary, alphabet)).to.equal(true);
}

// test_05:
{
  const dictionary = [
    'miles',
    'milestone',
    'pint',
    'proper',
    'process',
    'goal',
    'apple',
  ];
  const alphabet = 'mnoijpqrshkltabcdefguvwzxy';
  expect(detectDictionary(dictionary, alphabet)).to.equal(false);
}
