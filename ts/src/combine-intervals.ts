import { expect } from 'chai';

/*
Write a function, combineIntervals, that takes in an array of intervals as an argument. Each interval is an array containing a pair of numbers representing a start and end time. Your function should combine overlapping intervals and return an array containing the combined intervals.

For example:

Given two intervals:

[1, 4] and [3, 7]

The intervals overlap and
should be combined into:

[1, 7]
You may return the combined intervals in any order.

You can assume that the input array contains at least one interval and all intervals are valid with start < end.

### Approach

If we sort the input intervals, then we can solve this with two pointers
and a little logic.

Create an output array with first element from input array.
Create a pointers for input array, pointed at second element to start.
Create another pointer for output array, pointed at first element.

While the input pointer is less than the length of the input array,
compare the current input interval to the last interval in the output.

There are basically five scenarios possible. Visually:

[0,1]       no overlap; append interval [0,1], [2,3]
      [2,3]

[0,    2]   right overlap; change end [0,3]
  [1,    3]                              ↑

  [1,    3] left overlap; change start [0,3]
[0,    2]                               ↑

  [1,  2]   outside overlap; change both [0,3]
[0,      3]                               ↑ ↑

[0,      3] inside overlap; no change [0,3]
  [1,  2] 

But since we sorted the intervals array on the start values, that
eliminates the possibility of left and outside overlaps. Also, 
the logic for right overlap will cover the inside overlap case as 
well. We don't have to explicitly check for that scenario. So 
really we only need to handle two scenarios: no overlap and right
overlap.

Iterate through input array, making these comparisons and updating
or appending intervals as needed.
Return output array.

Complexity

Time: O(nlogn) (for the sort)
Space: O(n)

*/
function combineIntervals(intervals: [number, number][]): [number, number][] {
  intervals.sort((a, b) => a[0] - b[0]);

  const output: [number, number][] = [intervals[0]];
  let o = 0; // output pointer
  let i = 1; // intervals pointer

  while (i < intervals.length) {
    const iInterval = intervals[i];
    const [iStart, iEnd] = iInterval;
    const oInterval = output[o];
    const [, oEnd] = oInterval;

    // no overlap
    if (iStart > oEnd) {
      output.push(iInterval);
      o++;
      i++;
      continue;
    }

    // right overlap
    if (iEnd > oEnd) {
      oInterval[1] = iEnd;
    }

    i++;
  }

  return output;
}

// test_00
expect(
  combineIntervals([
    [1, 4],
    [12, 15],
    [3, 7],
    [8, 13],
  ])
).to.deep.equal([
  [1, 7],
  [8, 15],
]);

// test_01
expect(
  combineIntervals([
    [6, 8],
    [2, 9],
    [10, 12],
    [20, 24],
  ])
).to.deep.equal([
  [2, 9],
  [10, 12],
  [20, 24],
]);

// test_02
expect(
  combineIntervals([
    [3, 7],
    [5, 8],
    [1, 5],
  ])
).to.deep.equal([[1, 8]]);

// test_03
expect(
  combineIntervals([
    [3, 7],
    [10, 13],
    [5, 8],
    [27, 31],
    [1, 5],
    [12, 16],
    [20, 22],
  ])
).to.deep.equal([
  [1, 8],
  [10, 16],
  [20, 22],
  [27, 31],
]);

// test_04
expect(
  combineIntervals([
    [3, 7],
    [10, 13],
    [5, 8],
    [27, 31],
    [1, 5],
    [12, 16],
    [20, 32],
  ])
).to.deep.equal([
  [1, 8],
  [10, 16],
  [20, 32],
]);

// test_05
expect(
  combineIntervals([
    [64, 70],
    [50, 55],
    [62, 65],
    [12, 50],
    [72, 300000],
  ])
).to.deep.equal([
  [12, 55],
  [62, 70],
  [72, 300000],
]);
