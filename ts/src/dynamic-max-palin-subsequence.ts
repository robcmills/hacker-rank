import { expect } from 'chai';

/*
https://structy.net/problems/max-palin-subsequence

### Problem

Write a function, maxPalinSubsequence, that takes in a string as an argument. The function should return the length of the longest subsequence of the string that is also a palindrome.

A subsequence of a string can be created by deleting any characters of the string, while maintaining the relative order of characters.

### Approach

Compare first and last characters (index 0 and argument.length - 1)
If they are the same, remove them both and recurse into the inner
substring, marking that edge with a 2.
If they are not the same, create 2 branches, removing the first and
last characters, marking those edges with 0.
Recurse until reaching base cases of argument.length equal to 1 or 0,
which return 1 and zero respectively.
When returning, add edge values and choose the max between branches.

argument = loult       
           ^   ^
                             l t
                            [0,4] (indexes)
                  ┌───────────┴──────────┐
                  0                      0 (!=)
                  │                      │
                [1,4]                  [0,3]
          ┌───────┴────────┐             │
          0                0             2 (==)
          │                │             │
        [2,4]            [1,3]         [1,2]
     ┌────┴────┐      ┌────┴────┐     ┌──┴──┐  
     0         0      0         0     0     0
     │         │      │         │     │     │
   [3,4]     [2,3]  [2,3]     [1,2]  [2]   [1]
  ┌──┴──┐    ┌─┴─┐           ┌──┴──┐
  0     0    0   0           0     0
  │     │    │   │           │     │
 [4]   [3]  [3] [2]         [2]   [1]

*/
function maxPalinSubsequence(
  s: string,
  leftIndex: number = 0,
  rightIndex: number = s.length - 1,
  memo: Record<string, number> = {}
): number {
  const key = `${leftIndex},${rightIndex}`;
  if (key in memo) return memo[key];
  if (leftIndex === rightIndex) return 1;
  if (leftIndex > rightIndex) return 0;

  let result = 0;
  const leftChar = s[leftIndex];
  const rightChar = s[rightIndex];
  if (leftChar === rightChar) {
    result = 2 + maxPalinSubsequence(s, leftIndex + 1, rightIndex - 1, memo);
  } else {
    result = Math.max(
      maxPalinSubsequence(s, leftIndex + 1, rightIndex, memo),
      maxPalinSubsequence(s, leftIndex, rightIndex - 1, memo)
    );
  }
  memo[key] = result;
  return result;
}

const testCases: [string, number][] = [
  ['luwxult', 5],
  ['xyzaxxzy', 6],
  ['lol', 3],
  ['boabcdefop', 3],
  ['z', 1],
  ['chartreusepugvicefree', 7],
  ['qwueoiuahsdjnweuueueunasdnmnqweuzqwerty', 15],
  [
    'enamelpinportlandtildecoldpressedironyflannelsemioticsedisonbulbfashionaxe',
    31,
  ],
];

for (let [s, output] of testCases) {
  expect(maxPalinSubsequence(s)).to.equal(output);
}
