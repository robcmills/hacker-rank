import { expect } from 'chai';

/*
Write a function, overlapSubsequence, that takes in two strings as arguments. The function should return the length of the longest overlapping subsequence.

A subsequence of a string can be created by deleting any characters of the string, while maintaining the relative order of characters.

### Approach

Start with two pointers, and compare the first characters.
If they match, advance both pointers and mark the edge with a value of 1.
If they differ, make two branches, advancing one and the other pointers, with edges marked as zero.

                      dogs  daogt
pointer index         ^0    ^0     
edge value                │1
                          │
                      dogs  daogt
                       ^1    ^1
                          │0
                   ┌──────┴───────────┐
               dogs daogt         dogs daogt
                 ^2  ^1            ^1    ^2
                   │0                 │1
            ┌──────┴──────┐           │
        dogs daogt    dogs daogt  dogs daogt
           ^3 ^1        ^2   ^2     ^2    ^3
                          │0
                   ┌──────┴──────┐
               dogs daogt    dogs daogt
                  ^3  ^2       ^2    ^3
                                 │1
                                 │
                             dogs daogt
                                ^3    ^4

Then when recursing back up the tree, sum the edge values, 
taking the max of each branch.

As an optimization, we can memoize sums.

*/
function overlapSubsequence(
  a: string,
  b: string,
  i: number = 0,
  j: number = 0,
  memo: Record<string, number> = {}
): number {
  const key = `${i},${j}`;
  if (key in memo) return memo[key];
  if (i >= a.length || j >= b.length) return 0;

  const sum =
    a[i] === b[j]
      ? 1 + overlapSubsequence(a, b, i + 1, j + 1, memo)
      : Math.max(
          overlapSubsequence(a, b, i + 1, j, memo),
          overlapSubsequence(a, b, i, j + 1, memo)
        );
  memo[key] = sum;
  return sum;
}

// test_00:
expect(overlapSubsequence('dogs', 'daogt')).to.equal(3);

// test_01:
expect(overlapSubsequence('xcyats', 'criaotsi')).to.equal(4);

// test_02:
expect(overlapSubsequence('xfeqortsver', 'feeeuavoeqr')).to.equal(5);

// test_03:
expect(
  overlapSubsequence('kinfolklivemustache', 'bespokekinfolksnackwave')
).to.equal(11);

// test_04:
expect(
  overlapSubsequence(
    'mumblecorebeardleggingsauthenticunicorn',
    'succulentspughumblemeditationlocavore'
  )
).to.equal(15);
