import { expect } from './deps.ts';

function makeAnagram(a: string, b: string): number {
  let deletions = 0;

  // Build initial map of character counts
  const aMap = new Map<string, number>();
  for (const char of a) {
    aMap.has(char)
      ? aMap.set(char, (aMap.get(char) || 0) + 1)
      : aMap.set(char, 1);
  }
  const bMap = new Map<string, number>();
  for (const char of b) {
    bMap.has(char)
      ? bMap.set(char, (bMap.get(char) || 0) + 1)
      : bMap.set(char, 1);
  }

  // Compare a to b
  for (const char of aMap.keys()) {
    if (bMap.has(char)) {
      const aCount = aMap.get(char) || 0;
      const bCount = bMap.get(char) || 0;
      if (aCount > bCount) {
        deletions += aCount - bCount;
        aMap.set(char, bCount);
      } else if (bCount > aCount) {
        deletions += bCount - aCount;
        bMap.set(char, aCount);
      }
    } else {
      deletions += aMap.get(char) || 0;
      aMap.delete(char);
    }
  }

  // Compare b to a
  for (const char of bMap.keys()) {
    if (aMap.has(char)) {
      const aCount = aMap.get(char) || 0;
      const bCount = bMap.get(char) || 0;
      if (aCount > bCount) {
        deletions += aCount - bCount;
        aMap.set(char, bCount);
      } else if (bCount > aCount) {
        deletions += bCount - aCount;
        bMap.set(char, aCount);
      }
    } else {
      deletions += bMap.get(char) || 0;
      bMap.delete(char);
    }
  }

  return aMap.size && bMap.size ? deletions : 0;
}

expect(makeAnagram('', '')).to.equal(0);
expect(makeAnagram('abc', '')).to.equal(0);
expect(makeAnagram('cde', 'abc')).to.equal(4);
expect(makeAnagram('cde', 'dcf')).to.equal(2);
expect(makeAnagram('aaab', 'abbb')).to.equal(4);
expect(makeAnagram('aaab', 'cddd')).to.equal(0);
expect(makeAnagram('aaab', 'bddd')).to.equal(6);
expect(makeAnagram('showman', 'woman')).to.equal(2);
expect(
  makeAnagram('fcrxzwscanmligyxyvym', 'jxwtrhvujlmrpdoqbisbwhmgpmeoke')
).to.equal(30);
