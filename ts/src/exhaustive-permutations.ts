import { expect } from 'chai';

/*
Write a function, permutations, that takes in an array an argument. The function should return a 2D array where each subarray represents one of the possible permutations of the array.

The subarrays may be returned in any order.

You may assume that the input array contains unique elements.

### Approach

Permutations can be visualized as a tree, where each level
represents one of the items, and each branch represents 
where to insert that item, like so:

                        [ ]
a                        │
                        [a]
b            ┌───────────┴────────────┐
           [b,a]                    [a,b]
c    ┌───────┼───────┐        ┌───────┼───────┐
  [c,b,a] [b,c,a] [b,a,c]  [c,a,b] [a,c,b] [a,b,c]

Complexity:

Given n items, for each n, our branching factor increases:

Time: O(1 * 2 * 3 * ... n) or O(n!) factorial
Space: O(n!)
*/
type ValueType = string | number;

function permutations(items: ValueType[]): ValueType[][] {
  if (items.length === 0) return [[]];

  const last = items.pop() as ValueType;
  const restPermutations = permutations(items);
  const combinedPermutations = [];
  for (let permutation of restPermutations) {
    for (let i = 0; i <= permutation.length; i++) {
      combinedPermutations.push([
        ...permutation.slice(0, i),
        last,
        ...permutation.slice(i),
      ]);
    }
  }
  return combinedPermutations;
}

// test_00:
expect(permutations(['a', 'b', 'c'])).to.deep.equal([
  ['c', 'b', 'a'],
  ['b', 'c', 'a'],
  ['b', 'a', 'c'],
  ['c', 'a', 'b'],
  ['a', 'c', 'b'],
  ['a', 'b', 'c'],
]);

// test_01:
expect(permutations(['red', 'blue'])).to.deep.equal([
  ['blue', 'red'],
  ['red', 'blue'],
]);

// test_02:
expect(permutations([8, 2, 1, 4])).to.deep.equal([
  [4, 1, 2, 8],
  [1, 4, 2, 8],
  [1, 2, 4, 8],
  [1, 2, 8, 4],
  [4, 2, 1, 8],
  [2, 4, 1, 8],
  [2, 1, 4, 8],
  [2, 1, 8, 4],
  [4, 2, 8, 1],
  [2, 4, 8, 1],
  [2, 8, 4, 1],
  [2, 8, 1, 4],
  [4, 1, 8, 2],
  [1, 4, 8, 2],
  [1, 8, 4, 2],
  [1, 8, 2, 4],
  [4, 8, 1, 2],
  [8, 4, 1, 2],
  [8, 1, 4, 2],
  [8, 1, 2, 4],
  [4, 8, 2, 1],
  [8, 4, 2, 1],
  [8, 2, 4, 1],
  [8, 2, 1, 4],
]);

// test_03:
expect(permutations([])).to.deep.equal([[]]);
