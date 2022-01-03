import { expect } from 'chai';
import { swap } from './swap.mjs';

function minimumSwaps(a) {
  let swaps = 0;
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      swap(a, i, min);
      swaps++;
    }
  }
  return swaps;
}

expect(minimumSwaps([4, 3, 1, 2])).to.equal(3);
expect(minimumSwaps([2, 3, 4, 1, 5])).to.equal(3);
expect(minimumSwaps([1, 3, 5, 2, 4, 6, 7])).to.equal(3);
expect(minimumSwaps([7, 1, 3, 2, 4, 5, 6])).to.equal(5);
