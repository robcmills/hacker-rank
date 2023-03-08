import { expect } from 'chai';

/*
Write a function, pairProduct, that takes in an array and a target product as arguments. The function should return an array containing a pair of indices whose elements multiply to the given target. The indices returned must be unique.

Be sure to return the indices, not the elements themselves.

There is guaranteed to be one such pair whose product is the target.
*/
function pairProduct(a: number[], product: number): number[] | undefined {
  const prev: Record<number, number> = {};
  for (let i = 0; i < a.length; i++) {
    const num = a[i];
    const factor = product / num;
    if (factor in prev) return [prev[factor], i];
    prev[num] = i;
  }
}

const testCases: [number[], number, number[]][] = [
  [[3, 2, 5, 4, 1], 8, [1, 3]],
  [[3, 2, 5, 4, 1], 10, [1, 2]],
  [[4, 7, 9, 2, 5, 1], 5, [4, 5]],
  [[4, 7, 9, 2, 5, 1], 35, [1, 4]],
  [[3, 2, 5, 4, 1], 10, [1, 2]],
  [[4, 6, 8, 2], 16, [2, 3]],
];

for (let [a, product, output] of testCases) {
  expect(pairProduct(a, product)).to.deep.equal(output);
}
console.log('All tests passed ✓');
