import { expect } from 'chai';

/*
Write a function, befittingBrackets, that takes in a string as an argument. The function should return a boolean indicating whether or not the string contains correctly matched brackets.

You may assume the string contains only characters: ( ) [ ] { }
*/
function befittingBrackets(str: string): boolean {
  const stack: string[] = [];

  for (let s of str) {
    if ('([{'.includes(s)) {
      stack.push(s);
    } else if ('}])'.includes(s)) {
      if (stack.length === 0) return false;
      const current = stack.pop() as string;
      if (
        s !==
        {
          '(': ')',
          '[': ']',
          '{': '}',
        }[current]
      ) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// test_00:
expect(befittingBrackets('(){}[](())')).to.equal(true);

// test_01:
expect(befittingBrackets('({[]})')).to.equal(true);

// test_02:
expect(befittingBrackets('[][}')).to.equal(false);

// test_03:
expect(befittingBrackets('{[]}({}')).to.equal(false);

// test_04:
expect(befittingBrackets('[]{}(}[]')).to.equal(false);

// test_05:
expect(befittingBrackets('[]{}()[]')).to.equal(true);

// test_06:
expect(befittingBrackets(']{}')).to.equal(false);

// test_07:
expect(befittingBrackets('')).to.equal(true);

// test_08:
expect(befittingBrackets('{[(}])')).to.equal(false);
