import { expect } from 'chai';

/*
Given an integer n, count the total number of digit k(0-9) appearing in all non-negative integers less than or equal to n.

Examples:
Input: 55, 5
Output: 11
Explanation: Digit 5 occurred in the following numbers: 5, 15, 25, 35, 45, 50, 51, 52, 53, 54, 55.

is inclusive of 0 and n

## Approach

Brute force Approach:

We are going to iterate all numbers 0 to n.
For each num, convert it to a string and check if the digit (k) is in that number string.
If true, increment a count variable.
After loop finishes, return that count variable.

Time complexity = O(n)
Space complexity = O(1)

Generate the numbers from scratch approach:

Iterate 1 - k (<n) and add to left of digit (2 digit number)
Iterate 0 - 9 (<n) add to right of digit

Constraint 0 <= d < 10
Constraint 0 <= n < 100


Optimal Approach:

When the number of digits in n is:

### 1 digit (left most digit ?)
if ol <= d <= oh then 1 else 0

tens digit rule from below for 2 digit values:
tl < d < th ? 10 : 0


### 2 digits 

tens digit = t  tens digit of low = tl
ones digit = o  tens digit of high = th

## Ones position count:
(oh >= d ? th + 1 : th) - (ol > d ? tl + 1 : tl)

l = 0 h = 71 d = 5 
5 15 25 35 45 55 65 = 7
7 - 0 = 7

l = 8 h = 46 d = 5 
15 25 35 45 = 4
5 - 1 = 4

l = 14 h = 34 d = 5 
15 25 = 2
3 - 1 = 2

l = 0 h = 4 d = 5 
 = 0
0 - 0 = 0

l = 3 h = 9 d = 5 
5 = 1
1 - 0 = 0

l = 96 h = 99 d = 5 
 = 0
10 - 10 = 0

l = 0 h = 99 d = 5 
5 15 25 35 45 55 65 75 85 95 = 10
10 - 0 = 10

l = 15 h = 20 d = 5 
15 
2 - 1 = 1

l = 15 h = 25 d = 5 
15 25
3 - 1 = 2

l = 15 h = 26 d = 5 
15 25
3 - 1 = 2 


Todo: d = 0,1,9

l = 10 h = 11 d = 0
10 = 1
0 - 


## Tens position count
if (tl > d || th < d || d === 0) 
  return 0
if (tl === th) // and equal to d?
  return 1 + oh - ol

if (tl < d && th > d)
  return 10;
if (tl === d)  // when d = 0 ?
  return 10 - ol
if (th === d) // when d = 0 ?
  return oh === 0 ? 1 : 10 - oh

l = 0 h = 30 d = 0
 = 0

l = 0 h = 30 d = 3
30 = 1

l = 14 h = 20 d = 2
20 = 1

l = 14 h = 24 d = 2
20 21 22 23 24 = 5
✓

l = 0 h = 30 d = 1
10 11 12 .. 19 = 10
✓

l = 14 h = 34 d = 1
14 15 16 17 18 19 = 6
✓

l = 0 h = 60 d = 5 
50 51 52 .. 59 = 10

l = 60 h = 90 d = 5 
 = 0

l = 10 h = 14 d = 1 
10 11 12 13 14 = 5
1 + 4 - 0 = 5

l = 0 h = 9 d = 1 
 = 0

l = 0 h = 30 d = 5 
 = 0

l = 10 h = 11 d = 1 
10 11 = 2
1 + 1 - 0 = 2


### 3 digits 

3 = 19 * 10 + 100 = 290
              (5xx)
               ^
4 = 290 * 100 + 1000 = 1390

*/
function tensPositionCount(low: number, high: number, d: number): number {
  const highStr = `${high}`;
  const oh = parseInt(highStr[highStr.length - 1], 10); // ones digit high
  const th = parseInt(highStr[highStr.length - 2], 10) || 0; // tens digit high
  const lowStr = `${low}`;
  const ol = parseInt(lowStr[lowStr.length - 1], 10); // ones digit low
  const tl = parseInt(lowStr[lowStr.length - 2], 10) || 0; // tens digit low
  console.log({ highStr, oh, th, lowStr, ol, tl });

  if (tl > d || th < d || d === 0) return 0;
  if (tl === th)
    // and equal to d?
    return 1 + oh - ol;

  if (tl < d && th > d) return 10;
  if (tl === d) return 10 - ol;
  if (th === d) return oh === 0 ? 1 : 1 + oh;

  return -1;
}

{
  expect(tensPositionCount(0, 1, 0)).to.equal(0);
  expect(tensPositionCount(0, 9, 1)).to.equal(0);
  expect(tensPositionCount(0, 10, 1)).to.equal(1);
  expect(tensPositionCount(0, 11, 1)).to.equal(2);

  expect(tensPositionCount(0, 30, 3)).to.equal(1);
  expect(tensPositionCount(0, 31, 3)).to.equal(2);
  expect(tensPositionCount(0, 32, 3)).to.equal(3);
  expect(tensPositionCount(0, 33, 3)).to.equal(4);
  expect(tensPositionCount(0, 34, 3)).to.equal(5);
  expect(tensPositionCount(0, 35, 3)).to.equal(6);
  expect(tensPositionCount(0, 39, 3)).to.equal(10);

  expect(tensPositionCount(0, 19, 1)).to.equal(10);
  expect(tensPositionCount(0, 30, 0)).to.equal(0);
  expect(tensPositionCount(0, 30, 1)).to.equal(10);
  expect(tensPositionCount(0, 30, 3)).to.equal(1);
  expect(tensPositionCount(0, 30, 5)).to.equal(0);
  expect(tensPositionCount(0, 60, 5)).to.equal(10);
  expect(tensPositionCount(0, 99, 9)).to.equal(10);
  expect(tensPositionCount(10, 11, 1)).to.equal(2);
  expect(tensPositionCount(10, 14, 1)).to.equal(5);
  expect(tensPositionCount(14, 20, 2)).to.equal(1);
  expect(tensPositionCount(14, 24, 2)).to.equal(5);
  expect(tensPositionCount(14, 34, 1)).to.equal(6);

  expect(tensPositionCount(30, 31, 3)).to.equal(2);
  expect(tensPositionCount(31, 32, 3)).to.equal(2);
  expect(tensPositionCount(32, 35, 3)).to.equal(4);
  expect(tensPositionCount(33, 39, 3)).to.equal(7);
  expect(tensPositionCount(34, 40, 3)).to.equal(6);
  expect(tensPositionCount(35, 41, 3)).to.equal(5);
  expect(tensPositionCount(39, 99, 3)).to.equal(1);

  expect(tensPositionCount(60, 90, 5)).to.equal(0);
  expect(tensPositionCount(98, 99, 5)).to.equal(0);
}

// function onesPositionCount(low: number, high: number, d: number): number {
//   const highStr = `${high}`;
//   const oh = parseInt(highStr[highStr.length - 1], 10); // ones digit high
//   const th = parseInt(highStr[highStr.length - 2], 10) || 0; // tens digit high
//   const lowStr = `${low}`;
//   const ol = parseInt(lowStr[lowStr.length - 1], 10); // ones digit low
//   const tl = parseInt(lowStr[lowStr.length - 2], 10) || 0; // tens digit low
//   console.log({ highStr, oh, th, lowStr, ol, tl });
//
//   return (oh >= d ? th + 1 : th) - (ol > d ? tl + 1 : tl);
// }

// {
//   expect(onesPositionCount(0, 1, 0)).to.equal(1);
//   expect(onesPositionCount(0, 5, 0)).to.equal(1);
//   expect(onesPositionCount(0, 71, 0)).to.equal(8);
//   expect(onesPositionCount(0, 99, 0)).to.equal(10);
//   expect(onesPositionCount(3, 9, 0)).to.equal(0);
//   expect(onesPositionCount(8, 46, 0)).to.equal(4);
//   expect(onesPositionCount(11, 14, 0)).to.equal(0);
//   expect(onesPositionCount(14, 34, 0)).to.equal(2);
//   expect(onesPositionCount(10, 20, 0)).to.equal(2);
//   expect(onesPositionCount(10, 29, 0)).to.equal(2);
//   expect(onesPositionCount(20, 26, 0)).to.equal(1);
//   expect(onesPositionCount(96, 99, 0)).to.equal(0);
//
//   expect(onesPositionCount(0, 1, 9)).to.equal(0);
//   expect(onesPositionCount(0, 5, 9)).to.equal(0);
//   expect(onesPositionCount(0, 71, 9)).to.equal(7);
//   expect(onesPositionCount(0, 99, 9)).to.equal(10);
//   expect(onesPositionCount(3, 9, 9)).to.equal(1);
//   expect(onesPositionCount(8, 46, 9)).to.equal(4);
//   expect(onesPositionCount(11, 14, 9)).to.equal(0);
//   expect(onesPositionCount(14, 34, 9)).to.equal(2);
//   expect(onesPositionCount(19, 20, 9)).to.equal(1);
//   expect(onesPositionCount(19, 29, 9)).to.equal(2);
//   expect(onesPositionCount(19, 26, 9)).to.equal(1);
//   expect(onesPositionCount(96, 99, 9)).to.equal(1);
//
//   expect(onesPositionCount(0, 1, 5)).to.equal(0);
//   expect(onesPositionCount(0, 5, 5)).to.equal(1);
//   expect(onesPositionCount(0, 71, 5)).to.equal(7);
//   expect(onesPositionCount(0, 99, 5)).to.equal(10);
//   expect(onesPositionCount(3, 9, 5)).to.equal(1);
//   expect(onesPositionCount(8, 46, 5)).to.equal(4);
//   expect(onesPositionCount(11, 14, 5)).to.equal(0);
//   expect(onesPositionCount(14, 34, 5)).to.equal(2);
//   expect(onesPositionCount(15, 20, 5)).to.equal(1);
//   expect(onesPositionCount(15, 25, 5)).to.equal(2);
//   expect(onesPositionCount(15, 26, 5)).to.equal(2);
//   expect(onesPositionCount(96, 99, 5)).to.equal(0);
// }

// function digitCountFormula(d: number, low: number, high: number): number {}

function digitCountGenerate(n: number, d: number): number {
  let count = 0;
  for (let i = 1; i < 10; i++) {
    const dString = `${i}${d}`;
    if (parseInt(dString, 10) < n) {
      count++;
    } else {
      break;
    }
  }
  for (let i = 0; i < 10; i++) {
    const dString = `${d}${i}`;
    if (parseInt(dString, 10) < n) {
      count++;
    } else {
      break;
    }
  }
  return count;
}

function digitCountBrute(n: number, k: number): number {
  let count = 0;
  for (let i = 0; i <= n; i++) {
    if (`${i}`.includes(`${k}`)) count++;
  }
  return count;
}

// {
//   const k = 5;
//   for (let n = 0; n < 10; n++) {
//     console.log({ n });
//     expect(digitCountGenerate(n, k)).to.equal(digitCountBrute(n, k));
//   }
// }
