import { expect } from 'chai';

/*
Write a function, isPrime, that takes in a number as an argument. The function should return a boolean indicating whether or not the given number is prime.

A prime number is a number that is only divisible by two distinct numbers: 1 and itself.

For example, 7 is a prime because it is only divisible by 1 and 7. For example, 6 is not a prime because it is divisible by 1, 2, 3, and 6.

You can assume that the input number is a positive integer.

Complexity:

n = input number 
Time: O(√n)
Space: O(1)
*/
function isPrime(n: number): boolean {
  if (n === 2 || n === 3) return true;
  if (n <= 1 || n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// test_00:
expect(isPrime(2)).to.equal(true);

// test_01:
expect(isPrime(3)).to.equal(true);

// test_02:
expect(isPrime(4)).to.equal(false);

// test_03:
expect(isPrime(5)).to.equal(true);

// test_04:
expect(isPrime(6)).to.equal(false);

// test_05:
expect(isPrime(7)).to.equal(true);

// test_06:
expect(isPrime(8)).to.equal(false);

// test_07:
expect(isPrime(25)).to.equal(false);

// test_08:
expect(isPrime(31)).to.equal(true);

// test_09:
expect(isPrime(2017)).to.equal(true);

// test_10:
expect(isPrime(2048)).to.equal(false);

// test_11:
expect(isPrime(1)).to.equal(false);

// test_12:
expect(isPrime(713)).to.equal(false);
