import { expect } from 'chai';

/*
You are given a string containing characters A and B only.
Your task is to change it into a string such that there are no matching adjacent characters.
To do this, you are allowed to delete zero or more characters in the string.

Your task is to find the minimum number of required deletions.
*/

function findMinimumDeletions(s: string): number {
  let alternate;
  let deletions = 0;
  for (let char of s) {
    if (alternate === undefined) {
      alternate = char;
      continue;
    }
    if (char === alternate) {
      deletions++;
    } else {
      alternate = char;
    }
  }
  return deletions;
}

expect(findMinimumDeletions('AAA')).to.equal(2);
expect(findMinimumDeletions('A')).to.equal(0);
expect(findMinimumDeletions('AB')).to.equal(0);
expect(findMinimumDeletions('ABABAB')).to.equal(0);
expect(findMinimumDeletions('BABABA')).to.equal(0);
expect(findMinimumDeletions('AABBAAA')).to.equal(4);
expect(findMinimumDeletions('AAAB')).to.equal(2);
