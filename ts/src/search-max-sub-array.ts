import { expect } from 'chai';

/*
### Problem

We define the following:

- A subarray of array _a_ of length _n_ is a contiguous segment
from _a[i]_ through  _a[j]_ where 0 <= i <= j < n.
- The sum of an array is the sum of its elements.

Given an _n_ element array of integers, _a_, and an integer, _m_,
determine the maximum value of the sum of any of its subarrays modulo _m_.

### Example

a = [1, 2, 3]
m = 2

The following table lists all subarrays and their moduli:
```
		sum	%2
[1]		1	1
[2]		2	0
[3]		3	1
[1,2]		3	1
[2,3]		5	1
[1,2,3]		6	0
```
The maximum modulus is 1.

### Function Description

Complete the maximumSum function in the editor below.

maximumSum has the following parameter(s):

long a[n]: the array to analyze
long m: the modulo divisor

### Returns

- long: the maximum (subarray sum modulo _m_)
*/
function maximumSum(a: number[], m: number) {
  // todo
  return 0;
}

const testCases: [number[], number, number][] = [
  [[3, 3, 9, 9, 5], 7, 6],
  [[1, 2, 3], 2, 1],
];

for (let [a, m, result] of testCases) {
  expect(maximumSum(a, m)).to.equal(result);
}

// yc job board
//
