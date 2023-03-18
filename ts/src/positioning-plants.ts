import { expect } from 'chai';

/*
You've been hired to plant flowers in a garden with n different positions. There are m different flower types. The prices of flowers types vary depending on which position they are planted. Your bosses are picky, they tell you to never plant two of the same flower type right next to each other. What is the minimum cost we need to plant a flower in each position of the garden?

Write a function, positioningPlants, that takes in a 2D array with dimensions n * m. Each row of the array represents the costs of the flower types at that position. This means that costs[i][j] represents the cost of planting flower type j at position i. For example:

Given these costs,

costs = [
  [4, 3, 7],
  [6, 1, 9],
  [2, 5, 3]
]

The costs of plants at position 1 are $6, $1, and $9.
The cost of planting flower type 0 at position 1 is $6.
The cost of planting flower type 2 at position 1 is $9.

The function should return the minimum cost of planting flowers without placing the same flower type in adjacent positions.

### Approach

garden = [0, 1, 2, ... n]
        positions

costs = [
   0, 1, 2 = flower types [j]
  [4, 3, 7], i = 0 position
  [6, 1, 9], i = 1
  [2, 5, 3]  i = 2
]

costs[i][j] flower type j at position i

We can build a tree to represent our choices of flower types.
Each level of the tree represents a row of the costs / garden position.
Each node value is cost, flower type, position.
The root node has j branches because there is no previous position
to avoid planting the same flower type. Else, every other node has 
only (j - 1) branches because you can not choose the previous flower
type, according to the problem restriction. 

                                              7
                ┌7────────────────────────────┼12──────────────────────────10┐
              4,0,0                         3,1,0                          7,2,0
        ┌3──────┴─────11┐              ┌9─────┴─────11┐              ┌9──────┴──────3┐
      1,1,1           9,2,1          6,0,1          9,2,1          6,0,1           1,1,1
    ┌2──┴──3┐       ┌2──┴──5┐      ┌5──┴──3┐      ┌2──┴──5┐      ┌5──┴──3┐       ┌2──┴──3┐
  2,0,2   3,2,2   2,0,2   5,1,2  5,1,2   3,2,2  2,0,2   5,1,2  5,1,2   3,2,2   2,0,2   3,2,2

Then finding minimum cost is just a matter of returing the minimum cost
from all branches plus the current node cost from each node. With a base
case of when i = n (bottom level) just return the cost.

Optimization:

Standard memoization can prune duplicte sub-trees, but only at the same level.

Complexity:

n = number of positions (row)
m = number of plant types (column)

Time: O(nm)
Space: O(nm)

*/
function positioningPlants(
  costs: number[][],
  i = -1,
  j = 0,
  memo: Record<string, number> = {}
) {
  const key = `${i},${j}`;
  if (key in memo) return memo[key];
  const cost = i < 0 ? 0 : costs[i][j];
  if (i === costs.length - 1) return cost;

  let min = Infinity;
  for (let flowerType = 0; flowerType < costs[0].length; flowerType++) {
    if (i >= 0 && flowerType === j) continue;
    min = Math.min(min, positioningPlants(costs, i + 1, flowerType, memo));
  }
  const result = min + cost;
  memo[key] = result;
  return result;
}

// test_00:
expect(
  positioningPlants([
    [4, 3, 7],
    [6, 1, 9],
    [2, 5, 3],
  ])
).to.equal(7); // by doing 4 + 1 + 2.

// test_01:
expect(
  positioningPlants([
    [12, 14, 5],
    [6, 3, 2],
  ])
).to.equal(8);

// test_02:
expect(
  positioningPlants([
    [12, 14, 5],
    [6, 3, 2],
    [4, 2, 7],
    [4, 8, 4],
    [1, 13, 5],
    [8, 6, 7],
  ])
).to.equal(23);

// test_03:
expect(
  positioningPlants([
    [12, 14, 5, 13],
    [6, 3, 20, 3],
    [24, 12, 7, 2],
    [4, 80, 45, 3],
    [104, 13, 5, 14],
    [38, 19, 7, 6],
    [12, 2, 1, 2],
  ])
).to.equal(26);

// test_04:
expect(
  positioningPlants([
    [12, 14, 50, 12],
    [6, 3, 20, 3],
    [24, 12, 7, 2],
    [4, 80, 45, 3],
    [104, 13, 5, 14],
    [38, 19, 7, 6],
    [1, 20, 1, 2],
    [13, 12, 5, 13],
    [60, 32, 20, 3],
    [24, 12, 7, 2],
    [4, 80, 44, 1],
    [104, 13, 5, 14],
    [38, 19, 76, 6],
    [12, 23, 12, 20],
    [1, 3, 1, 1],
    [1, 2, 12, 5],
  ])
).to.equal(74);

// test_05:
expect(
  positioningPlants([
    [12, 14, 50, 12, 13],
    [6, 3, 20, 3, 16],
    [24, 12, 7, 2, 74],
    [4, 80, 45, 3, 100],
    [104, 13, 5, 14, 3],
    [38, 19, 7, 6, 24],
    [1, 20, 1, 2, 31],
    [13, 12, 5, 13, 9],
    [60, 32, 20, 3, 2],
    [24, 12, 7, 2, 42],
    [4, 80, 44, 1, 23],
    [104, 13, 5, 14, 28],
    [38, 19, 76, 6, 12],
    [12, 23, 12, 20, 13],
    [1, 3, 1, 1, 50],
    [1, 2, 12, 5, 36],
    [6, 2, 3, 12, 20],
    [4, 6, 4, 11, 15],
  ])
).to.equal(75);
