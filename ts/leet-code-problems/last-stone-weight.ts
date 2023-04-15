import { expect } from 'chai';
import { MaxHeap } from './max-heap';

/*
https://leetcode.com/problems/last-stone-weight/

You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

If x == y, both stones are destroyed, and
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.

Return the weight of the last remaining stone. If there are no stones left, return 0.

 

Example 1:

Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.

Example 2:

Input: stones = [1]
Output: 1
 

Constraints:

1 <= stones.length <= 30
1 <= stones[i] <= 1000

### Approach

Convert the array of stones into a MaxHeap.
While there are at least 2 stones, take turns smashing the 2 heaviest stones.
On each turn, we can "shift" the two "heaviest" stones from the heap,
If x == y, both stones are destroyed, and we continue to the next turn.
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
Then we re-insert the remaining stone into the heap, and continue to the next turn.
When we run out of stones, return the weight of the last remaining stone or zero if there are none.

*/
function lastStoneWeight(stones: number[]): number {
  const heap = new MaxHeap(stones);

  while (heap.size() >= 2) {
    // x <= y
    const y = heap.shift();
    const x = heap.shift();
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('Expected a number');
    }
    if (x !== y) {
      heap.insert(y - x);
    }
  }

  return heap.size() === 1 ? (heap.shift() as number) : 0;
}

// Test 1
{
  const input = [2, 7, 4, 1, 8, 1];
  const output = 1;
  expect(lastStoneWeight(input)).to.equal(output);
}

// Test 2
{
  const input = [1];
  const output = 1;
  expect(lastStoneWeight(input)).to.equal(output);
}

// Test 3
{
  const input = [3, 7, 2];
  const output = 2;
  expect(lastStoneWeight(input)).to.equal(output);
}
