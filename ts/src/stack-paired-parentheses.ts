import { expect } from 'chai';

/*
Write a function, pairedParentheses, that takes in a string as an argument. The function should return a boolean indicating whether or not the string has well-formed parentheses.

You may assume the string contains only alphabetic characters, '(', or ')'.

Complexity:

n = length of string

Time: O(n)
Space: O(1)

*/
function pairedParentheses(str: string): boolean {
  let stack = 0;
  for (let char of str) {
    if (char === '(') {
      stack++;
    } else if (char === ')') {
      stack--;
      if (stack < 0) return false;
    }
  }
  return stack === 0;
}

// test_00:
expect(pairedParentheses('(david)((abby))')).to.equal(true);

// test_01:
expect(pairedParentheses('()rose(jeff')).to.equal(false);

// test_02:
expect(pairedParentheses(')(')).to.equal(false);

// test_03:
expect(pairedParentheses('()')).to.equal(true);

// test_04:
expect(pairedParentheses('(((potato())))')).to.equal(true);

// test_05:
expect(pairedParentheses('(())(water)()')).to.equal(true);

// test_06:
expect(pairedParentheses('(())(water()()')).to.equal(false);

// test_07:
expect(pairedParentheses('')).to.equal(true);

// test_08:
expect(pairedParentheses('))()')).to.equal(false);
