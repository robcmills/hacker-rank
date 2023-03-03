import { expect } from 'chai';

/*
Given an array of integers and a target value,
determine the number of pairs of array elements
that have a difference equal to the target value.
*/
function pairs(k: number, array: number[]): number {
  const map: Record<number, number> = {};
  let result = 0;
  for (let n of array) {
    if (map[n] === undefined) map[n] = 0;
    map[n] += 1;
  }
  for (let n of array) {
    if (map[n + k]) result += map[n + k];
  }
  return result;
}

const testCases: [number, number[], number][] = [
  [1, [1, 2, 3, 4], 3],
  [2, [1, 5, 3, 4, 2], 3],
  [2, [1, 3, 3, 3], 3],
];

for (let [k, array, result] of testCases) {
  expect(pairs(k, array)).to.deep.equal(result);
}
