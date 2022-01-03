import { swap } from './swap.mjs';

export function bubbleSortCountSwaps(a) {
  let swaps = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1; j++) {
      if (a[j] > a[j + 1]) {
        swap(a, j, j + 1);
        swaps++;
      }
    }
  }
  console.log(`Array is sorted in ${swaps} swaps.`);
  console.log(`First Element: ${a[0]}`);
  console.log(`Last Element: ${a[a.length - 1]}`);
}

// bubbleSortCountSwaps([6, 4, 1]);
// bubbleSortCountSwaps([1, 2, 3]);
bubbleSortCountSwaps([3, 2, 1]);
