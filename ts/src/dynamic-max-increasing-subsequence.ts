import { expect } from 'chai';

/*
Write a function, maxIncreasingSubseq, that takes in an array of numbers as an argument. The function should return the length of the longest subsequence of strictly increasing numbers.

A subsequence of an array can be created by deleting any elements of the array, while maintaining the relative order of elements.

### Approach

Since a "subsequence" is defined as created by "deleting" any elements of the
array, this means we can "shrink" our problem down into sub-problems, which
is a good indication that we can use dynamic programming.

We can visualize the solution as a tree:

expect(maxIncreasingSubseq([6, 9, 7, 8])).to.equal(3)

Starting with the input array as the root node val:

 [6, 9, 7, 8]
  ^
We can consider the first element, and either include it 
in the solution or not, hence a binary tree:

              [6,9,7,8]
not include ┌─────┴──6──┐ include (mark edge)
         [9,7,8]     [9,7,8]

Continue considering values and branching. However, the problem requires
an *increasing* subsequence, so we can only include values that are 
greater than the previous value. So lets include the previous value 
in each node's value, so we can compare against, starting with
negative Infinity at the root:

                   (-∞,[6,9,7,8])
               ┌─────────┴────6──────┐
          (-∞,[9,7,8])          (6,[9,7,8])
          ┌────┴─9──┐          ┌─────┴──9──┐
     (-∞,[7,8])  (9,[7,8])  (6,[7,8])   (9,[7,8])
    ┌───┴─7─┐       │       ┌──┴──7─┐      │
 (-∞,[8]) (7,[8]) (9,[8]) (6,[8]) (7,[8]) (9,[8])
  ┌─┴8┐   ┌─┴8┐     │     ┌─┴8┐   ┌─┴8┐    │
 [ ] [ ] [ ] [ ]   [ ]   [ ] [ ] [ ] [ ]  [ ]

Note that at some nodes, the removed value is less than the previous,
so we can not include it in the solution. This is why at those nodes
there is only one branch (the unmarked edge/not included).

Once we have constructed the full tree, in order to find the solution
we find the path with the most marked edges. This can be done by returning
the number of marked edges from each sub-tree, and returning the greater
one from each node, up the tree. 

Finally, we can optimize the traversal with memoization to prune duplicate sub-trees. Memo values should include previous and current value.

Complexity:

Since we have a binary tree with two branches for each node:
n = numbers length
Time: O(2^n)
Space: O(2^n)

*/
function maxIncreasingSubseq(
  numbers: number[],
  i: number = 0,
  previous: number = -Infinity,
  memo: Record<string, number> = {}
): number {
  const key = `${previous},${i}`;
  if (key in memo) return memo[key];
  if (i === numbers.length) return 0;

  const current = numbers[i];
  const left = maxIncreasingSubseq(numbers, i + 1, previous, memo);
  const right =
    current > previous
      ? 1 + maxIncreasingSubseq(numbers, i + 1, current, memo)
      : 0;
  const result = Math.max(left, right);
  memo[key] = result;
  return result;
}

// test_00:
{
  const numbers = [4, 18, 20, 10, 12, 15, 19];
  expect(maxIncreasingSubseq(numbers)).to.equal(5);
}

// test_01:
{
  const numbers = [12, 9, 2, 5, 4, 32, 90, 20];
  expect(maxIncreasingSubseq(numbers)).to.equal(4);
}

// test_02:
{
  const numbers = [42, 50, 51, 60, 55, 70, 4, 5, 70];
  expect(maxIncreasingSubseq(numbers)).to.equal(5);
}

// test_03:
{
  const numbers = [7, 14, 10, 12];
  expect(maxIncreasingSubseq(numbers)).to.equal(3);
}

// test_04:
{
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ];
  expect(maxIncreasingSubseq(numbers)).to.equal(21);
}

// test_05:
{
  const numbers = [
    1, 2, 3, 4, 5, 12, 6, 30, 7, 8, 9, 10, 11, 12, 13, 10, 18, 14, 15, 16, 17,
    18, 19, 20, 21, 100, 104,
  ];
  expect(maxIncreasingSubseq(numbers)).to.equal(23);
}

// test_06:
{
  const numbers = [
    1, 2, 300, 3, 4, 305, 5, 12, 6, 30, 7, 8, 9, 10, 10, 10, 15, 11, 12, 13, 10,
    18, 14, 15, 16, 17, 18, 19, 20, 21, 100, 101, 102, 103, 104, 105,
  ];
  expect(maxIncreasingSubseq(numbers)).to.equal(27);
}
