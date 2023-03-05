import { expect } from 'chai';

/*
Given a binary input that represents binary representation of positive number n, find a binary representation of n+1.
The binary input may be and may not fit even in unsigned long long int.
*/
function binaryNext(input: string): string {
  return toBinary(parseInt(input, 2) + 1);
}

function toBinary(n: number): string {
  return (n >>> 0).toString(2);
}

/*
base 2   10
  0000 = 0
  0001 = 1
  0010 = 2
  0011 = 3
  0100 = 4
*/

const testCases = [
  ['10011', '10100'],
  ['111011101001111111', '111011101010000000'],
];

for (let [input, output] of testCases) {
  expect(binaryNext(input)).to.equal(output);
}
