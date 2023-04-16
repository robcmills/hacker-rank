/*

          1
      ┌───┴───┐
      12      4
    ┌─┴─┐   ┌─┘
    15  13  17

A Binary Min Heap has the following properties:

● Every node will have at most 2 children
● Each node's value will always be less than its children
  and there is no guaranteed order to the children.
● The root node's value will always be less than all the nodes.

● Unlike Linked Lists and Binary Trees, no special data structure 
  is needed to store a Heap. They can be implemented using an Array.
● For a given index i:
  Index of parent node = (i - 1) / 2
  Index of left child = 2 * i + 1
  Index of right child = 2 * i + 2

          1
      ┌───┴───┐
      3       2
    ┌─┴─┐   ┌─┘
    5   4   7

   ┌─┬─┬─┬─┬─┬─┐
   │1│3│2│5│4│7│
   └─┴─┴─┴─┴─┴─┘
*/
export class MinHeap {
  public heap: number[];

  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  first() {
    return this.heap[0];
  }

  min() {
    return this.heap[0];
  }

  /*
   * Push n onto end of heap.
   * Then "bubble up" until heap properties are satisfied.
   * (parent < child)
   */
  public insert(n: number) {
    this.heap.push(n);
    if (this.heap.length === 1) return true;
    let childIndex = this.heap.length - 1;
    let childValue = n;
    let parentIndex = Math.floor((childIndex - 1) / 2);
    let parentValue = this.heap[parentIndex];
    while (parentIndex >= 0 && parentValue > childValue) {
      this.heap[parentIndex] = childValue;
      this.heap[childIndex] = parentValue;
      childIndex = parentIndex;
      childValue = this.heap[childIndex];
      parentIndex = Math.floor((childIndex - 1) / 2);
      parentValue = this.heap[parentIndex];
    }
    return true;
  }

  /*
   * Remove and return the min value (the root).
   * Then rebalance heap:
   * Pop off last value and replace first value with it.
   * Then "sink down" that first value until heap properties are satisfied.
   * (parent < children)
   */
  public shift() {
    if (this.heap.length === 0) return null;
    const firstValue = this.heap[0];
    const lastValue = this.heap.pop() as number;
    this.heap[0] = lastValue;
    if (this.heap.length === 1) return firstValue;
    let parentIndex = 0;
    let parentValue = this.heap[0];
    let leftChildIndex = 1;
    let leftChildValue = this.heap[1];
    let rightChildIndex = 2;
    let rightChildValue = this.heap[2];

    while (
      (leftChildValue !== undefined || rightChildValue !== undefined) &&
      (parentValue > leftChildValue || parentValue > rightChildValue)
    ) {
      if (parentValue > leftChildValue && parentValue > rightChildValue) {
        // If parent is greater than both children, swap with the smaller child
        if (leftChildValue < rightChildValue) {
          this.heap[leftChildIndex] = parentValue;
          this.heap[parentIndex] = leftChildValue;
          parentIndex = leftChildIndex;
        } else {
          this.heap[rightChildIndex] = parentValue;
          this.heap[parentIndex] = rightChildValue;
          parentIndex = rightChildIndex;
        }
      } else if (parentValue > leftChildValue) {
        // If parent is greater than left child, swap with left child
        this.heap[leftChildIndex] = parentValue;
        this.heap[parentIndex] = leftChildValue;
        parentIndex = leftChildIndex;
      } else if (parentValue > rightChildValue) {
        // If parent is greater than right child, swap with right child
        this.heap[rightChildIndex] = parentValue;
        this.heap[parentIndex] = rightChildValue;
        parentIndex = rightChildIndex;
      } else {
        // Else parent is less than both children, and heap properties are satisfied.
        break;
      }
      parentValue = this.heap[parentIndex];
      leftChildIndex = 2 * parentIndex + 1;
      rightChildIndex = 2 * parentIndex + 2;
      leftChildValue = this.heap[leftChildIndex];
      rightChildValue = this.heap[rightChildIndex];
    }

    return firstValue;
  }
}
