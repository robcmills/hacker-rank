import { expect } from 'chai';

/*
1067. Digit Count in Range
Hard
82
22
company
Amazon
Given a single-digit integer d and two integers low and high, return the number of times that d occurs as a digit in all integers in the inclusive range [low, high].

 
Constraints:

0 <= d <= 9
1 <= low <= high <= 2 * 10^8
*/
function digitsCount(d: number, low: number, high: number): number {

}

// Example 1:
{
  const d = 1;
  const low = 1;
  const high = 13;
  const expected = 6;
  expect(digitsCount(d, low, high)).to.equal(expected);
  // Explanation: The digit d = 1 occurs 6 times in 1, 10, 11, 12, 13.
  // Note that the digit d = 1 occurs twice in the number 11.
}

// Example 2:
{
  const d = 3;
  const low = 100;
  const high = 250;
  const expected = 35;
  expect(digitsCount(d, low, high)).to.equal(expected);
  // Explanation: The digit d = 3 occurs 35 times in 103,113,123,130,131,...,238,239,243.
}
