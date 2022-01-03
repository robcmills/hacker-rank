import { expect } from 'chai';

const testCases = [
  [[], []],
  [[0], [0]],
  [[1], [1]],
  [
    [0, 1],
    [0, 1],
  ],
  [
    [1, 0],
    [0, 1],
  ],
  [
    [1, 2],
    [1, 2],
  ],
  [
    [2, 1],
    [1, 2],
  ],
  [
    [1, 2, 3],
    [1, 2, 3],
  ],
  [
    [1, 3, 2],
    [1, 2, 3],
  ],
  [
    [3, 2, 1],
    [1, 2, 3],
  ],
  [
    [100, 10, 1],
    [1, 10, 100],
  ],
];

export function testArraySort(sortFunc) {
  function test(array, expected) {
    sortFunc(array);
    expect(array).to.deep.equal(expected);
  }

  for (let [array, expected] of testCases) {
    test(array, expected);
  }
}
