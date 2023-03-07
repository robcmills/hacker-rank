import { expect } from 'chai';

type Graph = Record<string, string[]>;
type Visited = Set<string>;

/*
https://structy.net/problems/largest-component
### Problem

Write a function, largestComponent, that takes in the adjacency list of an undirected graph. The function should return the size of the largest connected component in the graph.

### Approach



*/
function largestComponent(graph: Graph): number {
  let largest = 0;
  let visited = new Set<string>();
  for (let node in graph) {
    if (node in visited) continue;
    largest = Math.max(largest, exploreSize(graph, node, visited));
  }
  return largest;
}

function exploreSize(graph: Graph, node: string, visited: Visited): number {
  if (visited.has(node)) return 0;
  visited.add(node);
  let size = 1;
  const neighbors = graph[node];
  for (let neighbor of neighbors) {
    size += exploreSize(graph, neighbor, visited);
  }
  return size;
}

const testCases: [Graph, number][] = [
  [
    {
      0: ['8', '1', '5'], //  1 - 0 - 8
      1: ['0'], //                | /
      5: ['0', '8'], //           5
      8: ['0', '5'],
      2: ['3', '4'], //       2 - 4
      3: ['2', '4'], //       | /
      4: ['3', '2'], //       3
    },
    4,
  ],
  [
    {
      1: ['2'],
      2: ['1', '8'],
      6: ['7'],
      9: ['8'],
      7: ['6', '8'],
      8: ['9', '7', '2'],
    },
    6,
  ],
  [
    {
      3: [],
      4: ['6'],
      6: ['4', '5', '7', '8'],
      8: ['6'],
      7: ['6'],
      5: ['6'],
      1: ['2'],
      2: ['1'],
    },
    5,
  ],
  [{}, 0],
  [
    {
      0: ['4', '7'],
      1: [],
      2: [],
      3: ['6'],
      4: ['0'],
      6: ['3'],
      7: ['0'],
      8: [],
    },
    3,
  ],
];

for (let [graph, output] of testCases) {
  expect(largestComponent(graph)).to.equal(output);
}
