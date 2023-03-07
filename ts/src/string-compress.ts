import { expect } from 'chai';

/*
Write a function, compress, that takes in a string as an argument. The function should return a compressed version of the string where consecutive occurrences of the same characters are compressed into the number of occurrences followed by the character. Single character occurrences should not be changed.

'aaa' compresses to '3a'
'cc' compresses to '2c'
't' should remain as 't'
You can assume that the input only contains alphabetic characters.
*/
function compress(s: string): string {
  let result = [];
  let i = 0;
  let j = 0;
  while (j <= s.length) {
    let iChar = s[i];
    let jChar = j === s.length ? '' : s[j];
    if (iChar === jChar) {
      j++;
    } else {
      const count = j - i;
      result.push(`${count === 1 ? '' : count}${iChar}`);
      i = j;
      j++;
    }
  }
  return result.join('');
}

const testCases = [
  ['ccaaatsss', '2c3at3s'],
  ['ssssbbz', '4s2bz'],
  ['ppoppppp', '2po5p'],
  ['nnneeeeeeeeeeeezz', '3n12e2z'],
  [
    'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
    '127y',
  ],
];

for (let [s, output] of testCases) {
  expect(compress(s)).to.equal(output);
}
