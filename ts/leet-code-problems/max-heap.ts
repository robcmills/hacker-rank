export class MaxHeap {
  private heap: number[];

  constructor(numbers: number[] = []) {
    this.heap = [];
    for (const n of numbers) {
      this.insert(n);
    }
  }

  size() {
    return this.heap.length;
  }

  values() {
    return [...this.heap];
  }

  insert(n: number) {
    this.heap.push(n);
    if (this.heap.length === 1) return;
    // bubble up newly inserted number until heap properties are satisfied (parent > children)
    let childIndex = this.heap.length - 1;
    let childValue = n;
    let parentIndex = Math.floor((childIndex - 1) / 2);
    let parentValue = this.heap[parentIndex];

    while (parentValue < childValue) {
      this.heap[parentIndex] = childValue;
      this.heap[childIndex] = parentValue;
      childIndex = parentIndex;
      childValue = this.heap[childIndex];
      parentIndex = Math.floor((childIndex - 1) / 2);
      parentValue = this.heap[parentIndex];
    }
  }

  /*
   * Returns max value (root) and rebalances heap.
   * Moves last value into first position and then "sinks" it down until heap properties are satisfied
   * (parent > children)
   */
  shift() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop() as number;

    let parentIndex = 0;
    let parentValue = this.heap[parentIndex];
    let leftChildIndex = 2 * parentIndex + 1;
    let leftChildValue = this.heap[leftChildIndex];
    let rightChildIndex = 2 * parentIndex + 2;
    let rightChildValue = this.heap[rightChildIndex];

    while (
      (leftChildValue !== undefined || rightChildValue !== undefined) &&
      (parentValue < leftChildValue || parentValue < rightChildValue)
    ) {
      if (parentValue < leftChildValue && parentValue < rightChildValue) {
        // If parent is less than both children, swap with the greater child
        if (leftChildValue > rightChildValue) {
          this.heap[leftChildIndex] = parentValue;
          this.heap[parentIndex] = leftChildValue;
          parentIndex = leftChildIndex;
        } else {
          this.heap[rightChildIndex] = parentValue;
          this.heap[parentIndex] = rightChildValue;
          parentIndex = rightChildIndex;
        }
      } else if (parentValue < leftChildValue) {
        // If parent is less than left child, swap with left child
        this.heap[leftChildIndex] = parentValue;
        this.heap[parentIndex] = leftChildValue;
        parentIndex = leftChildIndex;
      } else if (parentValue < rightChildValue) {
        // If parent is less than right child, swap with right child
        this.heap[rightChildIndex] = parentValue;
        this.heap[parentIndex] = rightChildValue;
        parentIndex = rightChildIndex;
      } else {
        // Else parent is greater than both children and we can break from loop
        break;
      }

      parentValue = this.heap[parentIndex];
      leftChildIndex = 2 * parentIndex + 1;
      leftChildValue = this.heap[leftChildIndex];
      rightChildIndex = 2 * parentIndex + 2;
      rightChildValue = this.heap[rightChildIndex];
    }

    return max;
  }
}
