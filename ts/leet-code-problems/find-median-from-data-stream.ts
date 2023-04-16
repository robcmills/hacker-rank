import { expect } from 'chai';
import { MaxHeap } from './max-heap';
import { MinHeap } from './min-heap';

/*
295. Find Median from Data Stream
Hard
10.1K
199
Companies
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
 

Example 1:

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
 

Constraints:

-105 <= num <= 105
There will be at least one element in the data structure before calling findMedian.
At most 5 * 104 calls will be made to addNum and findMedian.
 

Follow up:

If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?

### Approach

We will maintain two heaps of approximately the same size.
A max heap for the left half of numbers, and a min heap for the right half.
This makes it easy to get the middle number(s).

We just need to peform some logic when adding numbers to keep the two heaps
approximately the same size, and ensure that all numbers in the left heap are less than or equal to the right.

*/
class MedianFinder {
  private left: MaxHeap;
  private right: MinHeap;

  constructor() {
    this.left = new MaxHeap();
    this.right = new MinHeap();
  }

  addNum(num: number): void {
    this.left.insert(num);

    // Ensure left <= right
    if (this.right.size() > 0 && this.left.max() > this.right.min()) {
      this.right.insert(this.left.shift() as number);
    }

    // Ensure left.size ≈ right.size
    if (this.left.size() - this.right.size() > 1) {
      this.right.insert(this.left.shift() as number);
    } else if (this.right.size() - this.left.size() > 1) {
      this.left.insert(this.right.shift() as number);
    }
  }

  findMedian(): number {
    if (this.left.size() > this.right.size()) {
      return this.left.max() as number;
    }
    if (this.right.size() > this.left.size()) {
      return this.right.min() as number;
    }
    const leftMax = this.left.max();
    const rightMin = this.right.min();
    return (leftMax + rightMin) / 2;
  }
}

{
  const medianFinder = new MedianFinder();
  medianFinder.addNum(1); // arr = [1]
  medianFinder.addNum(2); // arr = [1, 2]
  expect(medianFinder.findMedian()).to.equal(1.5);
  medianFinder.addNum(3); // arr[1, 2, 3]
  expect(medianFinder.findMedian()).to.equal(2.0);
}
