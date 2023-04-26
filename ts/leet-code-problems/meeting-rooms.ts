import { expect } from 'chai';

/*
252. Meeting Rooms
Easy
1.8K
87
company
Google
company
Bloomberg
company
Amazon
Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

Constraints:

0 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti < endi <= 106
*/
function canAttend(intervals: [number, number][]): boolean {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    const i1 = intervals[i - 1];
    const i2 = intervals[i];
    if (i2[0] < i1[1]) return false;
  }
  return true;
}

// Example 1:
{
  const intervals = [
    [0, 30],
    [5, 10],
    [15, 20],
  ] as [number, number][];
  const expected = false;
  expect(canAttend(intervals)).to.equal(expected);
}

// Example 2:
{
  const intervals = [
    [7, 10],
    [2, 4],
  ] as [number, number][];
  const expected = true;
  expect(canAttend(intervals)).to.equal(expected);
}
