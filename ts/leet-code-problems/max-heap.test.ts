import { expect } from 'chai';
import { MaxHeap } from './max-heap';

// Test inserting
{
  console.log('Test 1');
  const heap = new MaxHeap();
  const inserted = [1, 3, 2, 5, 9, 2];
  const expected = [9, 5, 2, 1, 3, 2];
  for (const n of inserted) {
    heap.insert(n);
  }
  expect(heap.values()).to.deep.equal(expected);
}

/*
When shifting and sinking, if parent is less than both children, swap with the greater child
(left child > right child)
*/
{
  console.log('Test 2');
  const inserted = [4, 3, 2, 1];
  const expected = [3, 1, 2];
  const heap = new MaxHeap(inserted);
  heap.shift();
  expect(heap.values()).to.deep.equal(expected);
}

/*
When shifting and sinking, if parent is less than both children, swap with the greater child
(left child < right child)
*/
{
  console.log('Test 3');
  const inserted = [4, 2, 3, 1];
  const expected = [3, 2, 1];
  const heap = new MaxHeap(inserted);
  heap.shift();
  expect(heap.values()).to.deep.equal(expected);
}

/*
When shifting and sinking,
(parent not less than both children)
If parent is less than left child, swap with left child
*/
{
  console.log('Test 4');
  const inserted = [4, 3, 1, 2];
  const expected = [3, 2, 1];
  const heap = new MaxHeap(inserted);
  heap.shift();
  expect(heap.values()).to.deep.equal(expected);
}

/*
When shifting and sinking,
(parent not less than both children)
If parent is less than right child, swap with right child
*/
{
  console.log('Test 5');
  const inserted = [6, 3, 5, 1, 2, 4];
  const expected = [5, 3, 4, 1, 2];
  const heap = new MaxHeap(inserted);
  heap.shift();
  expect(heap.values()).to.deep.equal(expected);
}
