import { expect } from 'chai';

/*
Write a function, quickestConcat, that takes in a string and an array of words as arguments. The function should return the minimum number of words needed to build the string by concatenating words of the array.

You may use words of the array as many times as needed.

### Approach

For each word that the string starts with, create a branch
and mark the edge with 1. Recurse on the substring until no
word matches or we reach the base case of empty string.
Then return up the tree, summing the edge values and taking
the minimum from all branches.

                              uuuu
                      ┌────┬───┴──┬──────┐
                     [u,   uu,   uuu,   uuuu]
                      │    │      │      │
                     uuu   uu     u      x
                   ┌──┼────┐
                  [u, uu, uuu]
                   │  │    │
                  uu  u    x
                ┌─┴─┐
               [u, uu]
                │   │
                u   x
                │
               [u]
                │
                x

Optimization: 

We can memoize duplicate sub-trees to improve runtime.

*/
function quickestConcat(s: string, words: string[]) {
  const result = _quickestConcat(s, words);
  return result === Infinity ? -1 : result;
}

function _quickestConcat(
  s: string,
  words: string[],
  memo: Record<string, number> = {}
): number {
  if (s in memo) return memo[s];
  if (s.length === 0) return 0;

  let min = Infinity;
  for (let word of words) {
    if (s.startsWith(word)) {
      min = Math.min(
        min,
        1 + _quickestConcat(s.slice(word.length), words, memo)
      );
    }
  }

  memo[s] = min;
  return min;
}

// test_00:
expect(quickestConcat('caution', ['ca', 'ion', 'caut', 'ut'])).to.equal(2);

// test_01:
expect(quickestConcat('caution', ['ion', 'caut', 'caution'])).to.equal(1);

// test_02:
expect(
  quickestConcat('respondorreact', ['re', 'or', 'spond', 'act', 'respond'])
).to.equal(4);

// test_03:
expect(
  quickestConcat('simchacindy', ['sim', 'simcha', 'acindy', 'ch'])
).to.equal(3);

// test_04:
expect(quickestConcat('simchacindy', ['sim', 'simcha', 'acindy'])).to.equal(-1);

// test_05:
expect(quickestConcat('uuuuuu', ['u', 'uu', 'uuu', 'uuuu'])).to.equal(2);

// test_06:
expect(quickestConcat('rongbetty', ['wrong', 'bet'])).to.equal(-1);

// test_07:
expect(
  quickestConcat('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', [
    'u',
    'uu',
    'uuu',
    'uuuu',
    'uuuuu',
  ])
).to.equal(7);
