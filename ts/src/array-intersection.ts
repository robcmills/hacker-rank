import { expect } from 'chai';

/*
Write a function, intersection, that takes in two arrays, a,b, as arguments. The function should return a new array containing elements that are in both of the two arrays.

You may assume that each input array does not contain duplicate elements.
*/
function intersection(a: number[], b: number[]): number[] {
  const set = new Set<number>(a);
  const result: number[] = [];
  for (let n of b) {
    if (set.has(n)) result.push(n);
  }
  return result;
}

// test_00:
expect(intersection([4, 2, 1, 6], [3, 6, 9, 2, 10])).to.deep.equal([6, 2]);

// test_01:
expect(intersection([2, 4, 6], [4, 2])).to.deep.equal([4, 2]);

// test_02:
expect(intersection([4, 2, 1], [1, 2, 4, 6])).to.deep.equal([1, 2, 4]);

// test_03:
expect(intersection([0, 1, 2], [10, 11])).to.deep.equal([]);

// test_04:
const a = [];
const b = [];
for (let i = 0; i < 50000; i += 1) {
  a.push(i);
  b.push(i);
}
expect(intersection(a, b)[0]).to.equal(0);
expect(intersection(a, b)[49999]).to.equal(49999);
