'use strict';

import { assert } from './assert.mjs';

/*
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */
function minimumBribes(q) {
  let bribes = 0;

  for (let i = q.length - 1; i >= 0; i--) {
    if (q[i] - i > 3) {
      console.log('Too chaotic');
      return 'Too chaotic';
    }
    for (let j = q[i] - 2; j < i; j++) {
      if (q[j] > q[i]) bribes++;
    }
  }

  console.log(bribes);
  return bribes;
}

assert(minimumBribes([2, 1, 5, 3, 4]) === 3);
assert(minimumBribes([2, 5, 1, 3, 4]) === 'Too chaotic');
assert(minimumBribes([5, 1, 2, 3, 7, 8, 6, 4]) === 'Too chaotic');
assert(minimumBribes([1, 2, 5, 3, 7, 8, 6, 4]) === 7);
assert(minimumBribes([1, 2, 5, 3, 4, 7, 8, 6]) === 4);
