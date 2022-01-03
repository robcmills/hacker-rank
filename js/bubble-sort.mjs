import { swap } from './swap.mjs';

export function bubbleSort(a) {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1; j++) {
      if (a[j] > a[j + 1]) swap(a, j, j + 1);
    }
  }
}
