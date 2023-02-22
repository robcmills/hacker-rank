import { expect } from 'chai';

function binarySearch(array: any[], target: any): number {
  return search(array, 0, array.length - 1, target);
}

function search(array: any[], start: number, end: number, target: any): number {
  if (start > end) return -1;
  const middleIndex = Math.floor((start + end) / 2);
  const middleValue = array[middleIndex];
  if (middleValue === target) return middleIndex;
  return middleValue < target
    ? search(array, middleIndex + 1, end, target)
    : search(array, 0, middleIndex - 1, target);
}

expect(binarySearch([1, 2, 3], -1)).to.equal(-1);
expect(binarySearch([1, 2, 3], 1)).to.equal(0);
expect(binarySearch([1, 2, 3], 2)).to.equal(1);
expect(binarySearch([1, 2, 3], 3)).to.equal(2);
expect(binarySearch([1, 2, 3], 4)).to.equal(-1);
expect(binarySearch([1, 2, 3, 4], -1)).to.equal(-1);
expect(binarySearch([1, 2, 3, 4], 1)).to.equal(0);
expect(binarySearch([1, 2, 3, 4], 2)).to.equal(1);
expect(binarySearch([1, 2, 3, 4], 3)).to.equal(2);
expect(binarySearch([1, 2, 3, 4], 4)).to.equal(3);
expect(binarySearch([1, 2, 3, 4], 5)).to.equal(-1);
