import { expect } from 'chai';

/*
Write a function, subsets, that takes in an array as an argument. The function should return a 2D array where each subarray represents one of the possible subsets of the array.

The elements within the subsets and the subsets themselves may be returned in any order.

You may assume that the input array contains unique elements.

### Approach

You can visualize the way to make all subsets as a binary tree,
where each element represents a level of the tree, and each of
the two branches for each node represent the inclusion or exclusion
of that element.

Given elements = a,b,c

                  [ ]
         ┌────no───┴───yes───┐  include a?
        [ ]                 [a]
     ┌───┴───┐         ┌─────┴─────┐  b?
    [ ]     [b]       [a]        [a,b]
   ┌─┴─┐   ┌─┴──┐    ┌─┴──┐     ┌──┴───┐  c?
  [ ] [c] [b] [b,c] [a] [a,c] [a,b] [a,b,c]

Complexity:

Given n elements, each level of the tree branches by 
a factor of 2 for each element, so:

Time: O(2^n)
Space: O(2^n)
*/
function subsets(elements: string[]): string[][] {
  if (elements.length === 0) return [[]];

  const first = elements[0];
  const restSubsets = subsets(elements.slice(1));
  const combinedSubsets = [];
  for (let set of restSubsets) {
    combinedSubsets.push([first, ...set]);
  }

  return [...restSubsets, ...combinedSubsets];
}

// test_00:
expect(subsets(['a', 'b'])).to.deep.equal([[], ['b'], ['a'], ['a', 'b']]);

// test_01:
expect(subsets(['a', 'b', 'c'])).to.deep.equal([
  [],
  ['c'],
  ['b'],
  ['b', 'c'],
  ['a'],
  ['a', 'c'],
  ['a', 'b'],
  ['a', 'b', 'c'],
]);

// test_02:
expect(subsets(['x'])).to.deep.equal([[], ['x']]);

// test_03:
expect(subsets([])).to.deep.equal([[]]);

// test_04:
expect(subsets(['q', 'r', 's', 't'])).to.deep.equal([
  [],
  ['t'],
  ['s'],
  ['s', 't'],
  ['r'],
  ['r', 't'],
  ['r', 's'],
  ['r', 's', 't'],
  ['q'],
  ['q', 't'],
  ['q', 's'],
  ['q', 's', 't'],
  ['q', 'r'],
  ['q', 'r', 't'],
  ['q', 'r', 's'],
  ['q', 'r', 's', 't'],
]);
