import { expect } from 'chai';
import { MinHeap } from './min-heap';

/* Test 1

        1
    ┌───┴───┐
    4       2
  ┌─┴─┐   ┌─┘
  7   5   3

  ┌─┬─┬─┬─┬─┬─┐
  │1│4│2│7│5│3│
  └─┴─┴─┴─┴─┴─┘
*/
{
  const heap = new MinHeap();
  const inserted = [7, 2, 3, 5, 4, 1];
  const expected = [1, 4, 2, 7, 5, 3];
  for (const n of inserted) {
    heap.insert(n);
  }
  expect(heap.heap).to.deep.equal(expected);
}

// Test 2
{
  const heap = new MinHeap();
  const inserted = [17, 82, 73, 25, 64, 15, 1, 8, 100, 22];
  const expected = [1, 8, 15, 25, 22, 73, 17, 82, 100, 64];
  for (const n of inserted) {
    heap.insert(n);
  }
  expect(heap.heap).to.deep.equal(expected);
}

/* Test 3

        1
    ┌───┴───┐
    4       2
  ┌─┴─┐   ┌─┘
  7   5   3

  ┌─┬─┬─┬─┬─┬─┐
  │1│4│2│7│5│3│
  └─┴─┴─┴─┴─┴─┘

        2
    ┌───┴───┐
    4       3
  ┌─┴─┐
  7   5

  ┌─┬─┬─┬─┬─┐
  │2│4│3│7│5│
  └─┴─┴─┴─┴─┘

        3
    ┌───┴───┐
    4       5
  ┌─┘
  7

  ┌─┬─┬─┬─┐
  │3│4│5│7│
  └─┴─┴─┴─┘

*/
{
  const heap = new MinHeap();
  const inserted = [7, 2, 3, 5, 4, 1];
  const expected = [1, 4, 2, 7, 5, 3];
  const shifted = [2, 4, 3, 7, 5];
  const shifted2 = [3, 4, 5, 7];
  for (const n of inserted) {
    heap.insert(n);
  }
  expect(heap.heap).to.deep.equal(expected);
  expect(heap.shift()).to.equal(1);
  expect(heap.heap).to.deep.equal(shifted);
  expect(heap.shift()).to.equal(2);
  expect(heap.heap).to.deep.equal(shifted2);
}

/* Test 4 */
{
  const heap = new MinHeap();
  for (const n of [5, 5, 8, 10]) {
    heap.insert(n);
  }
  heap.shift();
  expect(heap.heap).to.deep.equal([5, 10, 8]);
}
