import { expect } from 'chai';

/*
Write a function fib that takes in a number argument, n, and returns the n-th number of the Fibonacci sequence.

The 0-th number of the sequence is 0.

The 1-st number of the sequence is 1.

To generate further numbers of the sequence, calculate the sum of previous two numbers.

Solve this recursively.
*/
function fibonacci(n: number, memo: Record<number, number> = {}): number {
  if (n in memo) return memo[n];
  if (n === 0) return 0;
  if (n === 1) return 1;
  const result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo[n] = result;
  return result;
}

// test_00:
expect(fibonacci(0)).to.equal(0);

// test_01:
expect(fibonacci(1)).to.equal(1);

// test_02:
expect(fibonacci(2)).to.equal(1);

// test_03:
expect(fibonacci(3)).to.equal(2);

// test_04:
expect(fibonacci(4)).to.equal(3);

// test_05:
expect(fibonacci(5)).to.equal(5);

// test_06:
expect(fibonacci(35)).to.equal(9227465);

// test_07:
expect(fibonacci(46)).to.equal(1836311903);
