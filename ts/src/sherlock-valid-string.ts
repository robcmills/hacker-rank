import { expect } from 'chai';

/*
Sherlock considers a string to be valid if all characters of the string appear the same number of times.
It is also valid if he can remove just 1 character at 1 index in the string,
and the remaining characters will occur the same number of times.
Given a string s, determine if it is valid. If so, return YES, otherwise return NO.
*/
function isValidString(s: string): 'YES' | 'NO' {
  const charFrequenciesMap = {} as Record<string, number>;
  for (let char of s) {
    if (typeof charFrequenciesMap[char] === 'number') {
      charFrequenciesMap[char]++;
    } else {
      charFrequenciesMap[char] = 1;
    }
  }
  const charFrequenciesArray = Object.values(charFrequenciesMap).sort();
  if (charFrequenciesArray.length === 1) return 'YES';
  const first = charFrequenciesArray[0];
  const second = charFrequenciesArray[1];
  const secondLast = charFrequenciesArray[charFrequenciesArray.length - 2];
  const last = charFrequenciesArray[charFrequenciesArray.length - 1];
  if (first === last) return 'YES';
  if (first === 1 && second === last) return 'YES';
  if (first === secondLast && last - secondLast === 1) return 'YES';
  return 'NO';
}

expect(isValidString('abc')).to.equal('YES');
expect(isValidString('abcc')).to.equal('YES');
expect(isValidString('abccc')).to.equal('NO');
expect(isValidString('aabbccddeefghi')).to.equal('NO');
expect(isValidString('abcdefghhgfedecba')).to.equal('YES');
