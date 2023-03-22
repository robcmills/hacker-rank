import { expect } from 'chai';

/*
Write a function, nestingScore, that takes in a string of brackets as an argument. The function should return the score of the string according to the following rules:

[] is worth 1 point
XY is worth m + n points where X, Y are substrings of well-formed brackets and m, n are their respective scores
[S] is worth 2 * k points where S is a substring of well-formed brackets and k is the score of that substring
You may assume that the input only contains well-formed square brackets.

Complexity:

Time: O(n)
Space: O(n)

*/
function nestingScore(str: string): number {
  const stack: number[] = [0];
  for (let char of str) {
    if (char === '[') {
      stack.push(0);
    } else {
      const popped = stack.pop() as number;
      if (popped === 0) {
        stack[stack.length - 1] += 1;
      } else {
        stack[stack.length - 1] += 2 * popped;
      }
    }
  }
  return stack[0];
}

// test_00:
expect(nestingScore('[]')).to.equal(1);

// test_01:
expect(nestingScore('[][][]')).to.equal(3);

// test_02:
expect(nestingScore('[[]]')).to.equal(2);

// test_03:
expect(nestingScore('[[][]]')).to.equal(4);

// test_04:
expect(nestingScore('[[][][]]')).to.equal(6);

// test_05:
expect(nestingScore('[[][]][]')).to.equal(5);

// test_06:
expect(nestingScore('[][[][]][[]]')).to.equal(7);

// test_07:
expect(nestingScore('[[[[[[[][]]]]]]][]')).to.equal(129);
