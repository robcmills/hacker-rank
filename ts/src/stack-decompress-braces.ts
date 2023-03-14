import { expect } from 'chai';

/*
Write a function, decompressBraces, that takes in a compressed string as an argument. The function should return the string decompressed.

The compression format of the input string is 'n{subString}', where the subString within braces should be repeated n times.

You may assume that every number n is guaranteed to be an integer between 1 through 9.

You may assume that the input is valid and the decompressed string will only contain alphabetic characters.

### Approach

Create a stack to store the following: 

- n (repeats)
- subString 

Iterate through the string. 
For each character, 

*/
const digits = '0123456789';

function decompressBraces(compressed: string): string {
  let decompressed = '';
  const stack: [number, string][] = [];

  let n = 0;
  for (let char of compressed) {
    if (digits.includes(char)) {
      n = parseInt(char, 10);
    } else if (char === '{') {
      stack.push([n, '']);
    } else if (char === '}') {
      const current = stack.pop() as [number, string];
      let subString = '';
      for (let i = 0; i < current[0]; i++) {
        subString += current[1];
      }
      if (stack.length > 0) {
        stack[stack.length - 1][1] += subString;
      } else {
        decompressed += subString;
      }
    } else {
      if (stack.length > 0) {
        stack[stack.length - 1][1] += char;
      } else {
        decompressed += char;
      }
    }
  }

  return decompressed;
}

// test_00:
expect(decompressBraces('2{q}3{tu}v')).to.equal('qqtututuv');

// test_01:
expect(decompressBraces('ch3{ao}')).to.equal('chaoaoao');

// test_02:
expect(decompressBraces('2{y3{o}}s')).to.equal('yoooyooos');

// test_03:
expect(decompressBraces('z3{a2{xy}b}')).to.equal('zaxyxybaxyxybaxyxyb');

// test_04:
expect(decompressBraces('2{3{r4{e}r}io}')).to.equal(
  'reeeerreeeerreeeerioreeeerreeeerreeeerio'
);

// test_05:
expect(decompressBraces('go3{spinn2{ing}s}')).to.equal(
  'gospinningingsspinningingsspinningings'
);

// test_06:
expect(decompressBraces('2{l2{if}azu}l')).to.equal('lififazulififazul');

// test_07:
expect(decompressBraces('3{al4{ec}2{icia}}')).to.equal(
  'alececececiciaiciaalececececiciaiciaalececececiciaicia'
);
