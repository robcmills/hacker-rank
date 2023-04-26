import { expect } from 'chai';

/*
253. Meeting Rooms II
Medium
6.4K
136
company
Bloomberg
company
Amazon
company
Apple

Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

Constraints:

1 <= intervals.length <= 104
0 <= starti < endi <= 106

## Approach

Intuitively, if all meetings happened sequentially, that is each meeting ended before the next started, then we would only need 1 room. But if two meeting happen at the same time, we will need an additional room. And for each additional simultaneous meeting, we will need more rooms. 

So we have to figure out the max number of simultaneous meetings that could occur.

           ▄▄▄▄▄▄▄▄▄
      ▄▄▄▄▄▄▄▄▄▄
  ▄▄▄▄▄▄▄           ▄▄▄▄▄▄▄▄
  ──────────────────────────
  9am          11am

If we can iterate over all start and end times in sequential order, then we can maintain a variable, meetings, that represents the number of meetings currently happening. When we get an interval start time, we increment, and when we get an end time, we decrement. In this way, once we have gone through all the intervals, whatever was the max value of that variable would be our solution.

                       ▄▄▄▄▄▄▄▄▄
                ▄▄▄▄▄▄▄▄▄▄
              ▄▄▄▄▄▄▄  │ │      ▄▄▄▄▄▄▄▄
           ─────────────────────────────
           ↑  ↑ ↑   ↑  ↑ ↑      ↑      ↑
meetings = 0  1 2   1  2 1      1*     0
                             
* This is assuming that the intervals are closed, such that when two meetings end and start at the same time, they are considered as not overlapping.

We can iterate all start and end times in order by sorting the intervals into two separate arrays, starts and ends. Then when we iterate through both, we use two pointers, choosing the lesser of the two to evaluate and increment.

*/
function minMeetingRooms(intervals: number[][]): number {}

// Example 1:
{
  const intervals = [
    [0, 30],
    [5, 10],
    [15, 20],
  ];
  const expected = 2;
  expect(minMeetingRooms(intervals)).to.equal(expected);
}

// Example 2:
{
  const intervals = [
    [7, 10],
    [2, 4],
  ];
  const expected = 1;
  expect(minMeetingRooms(intervals)).to.equal(expected);
}
