import { expect } from 'chai';

/*
Write a function, canConcat, that takes in a string and an array of words as arguments. The function should return boolean indicating whether or not it is possible to concatenate words of the array together to form the string.

You may reuse words of the array as many times as needed.

### Approach

Use a dynamic programming approach, where we recursively try to match
the start of the string against our words. For each match found, 
recursively repeat against the substring where the match was removed:

string:  oneisnone
         │
match:   [one]
         │
         isnone
         │
         [is]
         │
         none
         │
         [none]
         │
         empty string base case; return true;

Optimization

We can add memoization to prune duplicate sub-trees

  canConcat('rrrx', ['r', 'rr', 'rrr'], memo)

                  rrrx
               ┌───┼─────┐
              [r   rr   rrr]
               │   │     │
              rrx  rx ←  x
             ┌─┴─┐    duplicate
            [r   rr]
             │   │
          →  rx  x
             │
            [r]
             │
             x

*/
function canConcat(
  s: string,
  words: string[],
  memo: Record<string, boolean> = {}
): boolean {
  if (s in memo) return memo[s];
  if (s.length === 0) return true;

  for (let word of words) {
    if (s.startsWith(word)) {
      if (canConcat(s.slice(word.length), words, memo)) {
        memo[s] = true;
        return true;
      }
    }
  }

  memo[s] = false;
  return false;
}

// test_00:
expect(canConcat('oneisnone', ['one', 'none', 'is'])).to.equal(true);

// test_01:
expect(canConcat('oneisnone', ['on', 'e', 'is'])).to.equal(false);

// test_02:
expect(canConcat('oneisnone', ['on', 'e', 'is', 'n'])).to.equal(true);

// test_03:
expect(canConcat('foodisgood', ['is', 'g', 'ood', 'f'])).to.equal(true);

// test_04:
expect(canConcat('santahat', ['santah', 'hat'])).to.equal(false);

// test_05:
expect(canConcat('santahat', ['santah', 'san', 'hat', 'tahat'])).to.equal(true);

// test_06:
expect(
  canConcat('rrrrrrrrrrrrrrrrrrrrrrrrrrx', [
    'r',
    'rr',
    'rrr',
    'rrrr',
    'rrrrr',
    'rrrrrr',
  ])
).to.equal(false);

// test_07:
expect(canConcat('fooisgood', ['foo', 'is', 'g', 'ood', 'f'])).to.equal(true);
