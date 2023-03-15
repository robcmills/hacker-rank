import { expect } from 'chai';

/*
Write a function, createCombinations, that takes in an array and a length as arguments. The function should return a 2D array representing all of the combinations of the specified length.

The items within the combinations and the combinations themselves may be returned in any order.

You may assume that the input array contains unique elements and 1 <= k <= items.length.

### Approach

Remove the last item, and recurse with the remaining items.
In one branch, decrement k value, and in the other branch do not.

This is essentially saying, give me all combinations of length k - 1,
that I can then *add* the removed item back to, and on the other hand
give me all combinations of length k, without that removed item.
Then we can combine the results of both branches to obtain all 
combinations.

        [a,b,c],2
     ┌─────┴─────┐
   [a,b],1     [a,b],2

*/
type ValueType = string | number;

function createCombinations(items: ValueType[], k: number): ValueType[][] {
  if (k === 0) return [[]];
  if (k > items.length) return [];

  const first = items[0];
  const leftCombos = createCombinations(items.slice(1), k - 1);
  const rightCombos = createCombinations(items.slice(1), k);
  return [...leftCombos.map((combo) => [first, ...combo]), ...rightCombos];
}

// test_00:
expect(createCombinations(['a', 'b', 'c'], 2)).to.deep.equal([
  ['a', 'b'],
  ['a', 'c'],
  ['b', 'c'],
]);

// test_01:
expect(createCombinations(['q', 'r', 's', 't'], 2)).to.deep.equal([
  ['q', 'r'],
  ['q', 's'],
  ['q', 't'],
  ['r', 's'],
  ['r', 't'],
  ['s', 't'],
]);

// test_02:
expect(createCombinations(['q', 'r', 's', 't'], 3)).to.deep.equal([
  ['q', 'r', 's'],
  ['q', 'r', 't'],
  ['q', 's', 't'],
  ['r', 's', 't'],
]);

// test_03:
expect(createCombinations([1, 28, 94], 3)).to.deep.equal([[1, 28, 94]]);
