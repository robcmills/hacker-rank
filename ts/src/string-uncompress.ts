import { expect } from 'chai';

/*
https://structy.net/problems/premium/uncompress

### Problem

Write a function, uncompress, that takes in a string as an argument. The input string will be formatted into multiple groups according to the following pattern:

<number><char>

for example, '2c' or '3a'.
The function should return an uncompressed version of the string where each 'char' of a group is repeated 'number' times consecutively. You may assume that the input string is well-formed according to the previously mentioned pattern.
*/
function uncompress(s: string): string {
  // Strings in javascript are immutable, meaning if we used a string
  // for the result, every concatenation would create a new string in
  // O(n) time where n is the length of the string. Arrays however,
  // can be concatenated in constant O(1) time.
  let result = [];
  let i = 0;
  let j = 0;
  let num = 0;
  const numbers = '0123456789';

  while (j < s.length) {
    if (numbers.includes(s[j])) {
      j++;
    } else {
      num = Number(s.slice(i, j));
      for (let k = 0; k < num; k++) {
        result.push(s[j]);
      }
      j++;
      i = j;
    }
  }

  return result.join('');
}

const testCases = [
  ['2c3a1t', 'ccaaat'],
  ['4s2b', 'ssssbb'],
  ['2p1o5p', 'ppoppppp'],
  ['3n12e2z', 'nnneeeeeeeeeeeezz'],
  [
    '127y',
    'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
  ],
];

for (let [s, output] of testCases) {
  expect(uncompress(s)).to.equal(output);
}
