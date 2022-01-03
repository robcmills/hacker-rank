import { swap } from './swap.mjs';
import { testArraySort } from './test-array-sort.mjs';

export function selectionSort(a) {
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[min]) {
        min = j;
      }
    }
    if (min !== i) {
      swap(a, i, min);
    }
  }
}

testArraySort(selectionSort);
