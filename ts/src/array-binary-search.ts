import { expect } from 'chai';

/*
Write a function, binarySearch, that takes in a sorted array of numbers and a target. The function should return the index where the target can be found within the array. If the target is not found in the array, then return -1.

You may assume that the input array contains unique numbers sorted in increasing order.

Your function must implement the binary search algorithm.

Complexity:

Time: O(logn)
Space: O(1)
Space: O(logn) recursive
*/
function binarySearchRecursive(
  numbers: number[],
  target: number,
  start: number = 0,
  end: number = numbers.length - 1
): number {
  if (start > end) return -1;
  const mid = Math.floor((start + end) / 2);
  if (numbers[mid] === target) return mid;
  return numbers[mid] > target
    ? binarySearchRecursive(numbers, target, start, mid - 1)
    : binarySearchRecursive(numbers, target, mid + 1, end);
}

function binarySearch(numbers: number[], target: number): number {
  let start = 0;
  let end = numbers.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (numbers[mid] === target) return mid;
    if (numbers[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
}

// test_00
expect(binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8], 6)).to.equal(6);
expect(binarySearchRecursive([0, 1, 2, 3, 4, 5, 6, 7, 8], 6)).to.equal(6);

// test_01
expect(binarySearch([0, 6, 8, 12, 16, 19, 20, 24, 28], 27)).to.equal(-1);
expect(binarySearchRecursive([0, 6, 8, 12, 16, 19, 20, 24, 28], 27)).to.equal(
  -1
);

// test_02
expect(binarySearch([0, 6, 8, 12, 16, 19, 20, 28], 8)).to.equal(2);
expect(binarySearchRecursive([0, 6, 8, 12, 16, 19, 20, 28], 8)).to.equal(2);

// test_03
expect(binarySearch([0, 6, 8, 12, 16, 19, 20, 24, 28], 28)).to.equal(8);
expect(binarySearchRecursive([0, 6, 8, 12, 16, 19, 20, 24, 28], 28)).to.equal(
  8
);

// test_04
expect(binarySearch([7, 9], 7)).to.equal(0);
expect(binarySearchRecursive([7, 9], 7)).to.equal(0);

// test_05
expect(binarySearch([7, 9], 9)).to.equal(1);
expect(binarySearchRecursive([7, 9], 9)).to.equal(1);

// test_06
expect(binarySearch([7, 9], 12)).to.equal(-1);
expect(binarySearchRecursive([7, 9], 12)).to.equal(-1);

// test_07
expect(binarySearch([7], 7)).to.equal(0);
expect(binarySearchRecursive([7], 7)).to.equal(0);

// test_08
expect(binarySearch([2], 7)).to.equal(-1);
expect(binarySearchRecursive([2], 7)).to.equal(-1);

// test_09
expect(binarySearch([], 7)).to.equal(-1);
expect(binarySearchRecursive([], 7)).to.equal(-1);
