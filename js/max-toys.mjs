import { expect } from 'chai';

function maxToys(prices, k) {
  // k = budget
  let max = 0; // max number of toys
  let total = 0; // total price
  for (let p of prices.sort((a, b) => a - b)) {
    if (total + p > k) return max;
    total += p;
    max++;
  }
  return max;
}

expect(maxToys([1, 12, 5, 111, 200, 1000, 10], 50)).equal(4);
