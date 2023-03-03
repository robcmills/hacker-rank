import { expect } from 'chai';

/*
Returns the index of the first element in a sorted array that matches target number.
If no elements match, returns the index of the nearest element.
If sign argument is positive (default) return the nearest element greater than target.
If sign argument is negative return the nearest element less than target.
*/
export function findNearestIndex(
  target: number,
  sortedArray: number[],
  sign: -1 | 1 = 1
): number {
  return findNearestIndexBinary(
    0,
    sortedArray.length - 1,
    target,
    sortedArray,
    sign
  );
}

export function findNearestIndexBinary(
  start: number,
  end: number,
  target: number,
  sortedArray: number[],
  sign: -1 | 1
): number {
  if (start > end) {
    return sign === 1
      ? Math.min(sortedArray.length - 1, Math.max(start, end))
      : Math.max(0, Math.min(start, end));
  }
  const midIndex = Math.floor((start + end) / 2);
  const midValue = sortedArray[midIndex];
  if (midValue === target) return midIndex;
  return target < midValue
    ? findNearestIndexBinary(0, midIndex - 1, target, sortedArray, sign)
    : findNearestIndexBinary(midIndex + 1, end, target, sortedArray, sign);
}

// const testCases: [number, number[], -1 | 1, number][] = [
//   [1, [0], 1, 0],
//   [1, [0], -1, 0],
//   [1, [1], 1, 0],
//   [-1, [0, 1], 1, 0],
//   [2, [0, 1], 1, 1],
//   [1, [0, 2], 1, 1],
//   [1, [0, 2], -1, 0],
//   [-1, [0, 1, 2], 1, 0],
//   [-1, [0, 1, 2], -1, 0],
//   [3, [0, 1, 2], 1, 2],
//   [3, [0, 1, 2], -1, 2],
//   [2, [1, 3, 5], 1, 1],
//   [2, [1, 3, 5], -1, 0],
// ];
//
// for (let [target, sortedArray, sign, result] of testCases) {
//   expect(findNearestIndex(target, sortedArray, sign)).to.equal(result);
// }
