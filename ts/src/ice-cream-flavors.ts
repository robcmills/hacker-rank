import { expect } from 'chai';

/*
Each time Sunny and Johnny take a trip to the Ice Cream Parlor, they pool their money to buy ice cream.
On any given day, the parlor offers a line of flavors.
Each flavor has a cost associated with it.

Given the value of _money_ and the _cost_ of each flavor for _t_ trips to the Ice Cream Parlor,
help Sunny and Johnny choose two distinct flavors such that they spend their entire pool of money during each visit.
ID numbers are the 1-based index number associated with a _cost_.
For each trip to the parlor, print the ID numbers for the two types of ice cream that Sunny and Johnny purchase
as two space-separated integers on a new line.
You must print the smaller ID first and the larger ID second.
*/
function whatFlavors(costs: number[], money: number): number[] {
  // build a map of costs to their indexes (1-based)
  const costToIndexMap: Record<string, number[]> = {};
  let index = 1;
  for (let cost of costs) {
    if (!costToIndexMap[cost]) costToIndexMap[cost] = [];
    costToIndexMap[cost].push(index);
    index++;
  }
  // iterate the costs, checking for presence of corresponding cost that would sum to money
  index = 1;
  for (let cost of costs) {
    if (!costToIndexMap[money - cost]) {
      index++;
      continue;
    }
    if (cost === money - cost && costToIndexMap[cost].length === 1) {
      index++;
      continue;
    }
    const result = [
      costToIndexMap[cost][0],
      costToIndexMap[money - cost][cost === money - cost ? 1 : 0],
    ];
    console.log(result.join(' '));
    return result;
  }
  // once found, log the pair of indexes
  return [];
}

/* {
  '2': [ 3 ],
  '3': [ 2 ],
  '4': [ 1 ],
  '5': [ 4 ],
  '7': [ 5 ],
} */

const testCases: [number[], number, number[]][] = [
  [[2, 1, 3, 5, 6], 5, [1, 3]],
  [[1, 4, 5, 3, 2], 4, [1, 4]],
  [[2, 2, 4, 3], 4, [1, 2]],
  [[4, 3, 2, 5, 7], 8, [2, 4]],
  [[7, 2, 5, 4, 11], 12, [1, 3]],
];

for (let [costs, money, result] of testCases) {
  expect(whatFlavors(costs, money)).to.deep.equal(result);
}
