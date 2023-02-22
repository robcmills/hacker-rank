import { expect } from 'chai';

type Graph = Record<string, string[]>; // adjacency list

/*
Write a function, islandCount, that takes in a grid containing Ws and Ls.
W represents water and L represents land.
The function should return the number of islands on the grid.
An island is a vertically or horizontally connected region of land.
*/
function islandCount(grid: string[][]): number {
  let islandCount = 0;
  const graph = buildGraph(grid);

  const visited = new Set<string>();
  const height = grid.length;
  const width = grid[0].length;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const value = grid[row][col];
      const nodeIndex = getNodeIndex(col, row, value);
      const isWater = value === 'W';
      if (isWater || visited.has(nodeIndex)) continue;
      explore(graph, nodeIndex, visited);
      islandCount++;
    }
  }

  return islandCount;
}

function explore(graph: Graph, from: string, visited: Set<string>) {
  visited.add(from);
  for (let neighbor of graph[from]) {
    const [, , value] = neighbor.split(',');
    const isWater = value === 'W';
    if (visited.has(neighbor) || isWater) continue;
    explore(graph, neighbor, visited);
  }
}

function getNodeIndex(col: number, row: number, value: string): string {
  return `${col},${row},${value}`;
}

function buildGraph(grid: string[][]): Graph {
  const height = grid.length;
  const width = grid[0].length;
  const graph: Graph = {};
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const nodes = [];
      if (row - 1 >= 0) {
        nodes.push(getNodeIndex(col, row - 1, grid[row - 1][col]));
      }
      if (row + 1 < height) {
        nodes.push(getNodeIndex(col, row + 1, grid[row + 1][col]));
      }
      if (col + 1 < width) {
        nodes.push(getNodeIndex(col + 1, row, grid[row][col + 1]));
      }
      if (col - 1 >= 0) {
        nodes.push(getNodeIndex(col - 1, row, grid[row][col - 1]));
      }
      graph[getNodeIndex(col, row, grid[row][col])] = nodes;
    }
  }
  return graph;
}

const testCases: [string[][], number][] = [
  [
    [
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'W', 'W', 'L', 'W'],
      ['W', 'W', 'L', 'L', 'W'],
      ['L', 'W', 'W', 'L', 'L'],
      ['L', 'L', 'W', 'W', 'W'],
    ],
    3,
  ],
];

for (let [grid, count] of testCases) {
  expect(islandCount(grid)).to.equal(count);
}
