import { expect } from 'chai';
import { findNearestIndexBinary } from './binary-search-nearest';

/*
Given 3 arrays a, b, c of different sizes,
find the number of distinct triplets (p, q, r)
where p is an element of a,
written as p ∈ a, q ∈ b, and r ∈ c,
satisfying the criteria: p <= q and q >= r.

Complete the triplets function in the editor below. It must return the number of distinct triplets that can be formed from the given arrays.

triplets has the following parameter(s):

a, b, c: three arrays of integers .
*/
function triplets(a: number[], b: number[], c: number[]): number {
  const compareNumbers = (a: number, b: number) => a - b;
  const ap = Array.from(new Set(a)).sort(compareNumbers);
  const bp = Array.from(new Set(b)).sort(compareNumbers);
  const cp = Array.from(new Set(c)).sort(compareNumbers);

  let result = 0;
  let j = 0;
  let k = 0;
  for (let be of bp) {
    while (ap[j] <= be && j < ap.length) j++;
    while (cp[k] <= be && k < cp.length) k++;
    result += j * k;
  }

  return result;
}

const testCases: [number[], number[], number[], number][] = [
  [[3, 5, 7], [3, 6], [4, 6, 9], 4],
  [[1, 3, 5], [2, 3], [1, 2, 3], 8],
  [[1, 4, 5], [2, 3, 3], [1, 2, 3], 5],
  [[1, 3, 5, 7], [5, 7, 9], [7, 9, 11, 13], 12],
  [[1, 3, 5], [2, 3], [1, 2, 3], 8],
];

for (let [a, b, c, result] of testCases) {
  expect(triplets(a, b, c)).to.deep.equal(result);
}
