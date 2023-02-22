import { expect } from 'chai';

type Edge = [string, string];
type Graph = Record<string, string[]>; // adjacency list

/*
Write a function, shortestPath, that takes in an array of edges for an undirected graph
and two nodes (nodeA, nodeB).
The function should return the length of the shortest path between A and B.
Consider the length as the number of edges in the path, not the number of nodes.
If there is no path between A and B, then return -1.
*/
function shortestPath(edges: Edge[], nodeA: string, nodeB: string): number {
  const graph = buildGraph(edges);
  return traverseShortest(graph, nodeA, nodeB, new Set<string>());
}

function buildGraph(edges: Edge[]): Graph {
  const graph: Graph = {};
  for (let [a, b] of edges) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
}

function traverseShortest(
  graph: Graph,
  start: string,
  end: string,
  visited: Set<string>
) {
  // If we traverse breadth first then as soon as we find end node
  // that will be the shortest path
  const queue = [[start, 0]];
  while (queue.length > 0) {
    const [current, length] = queue.shift() as [string, number];
    if (visited.has(current)) continue;
    if (current === end) return length;
    visited.add(current);
    for (let neighbor of graph[current]) {
      queue.push([neighbor, length + 1]);
    }
  }
  return -1;
}

const testCases: [Edge[], string, string, number][] = [
  [
    [
      ['w', 'x'], //   x - y
      ['x', 'y'], //  /     \
      ['z', 'y'], // w - v - z
      ['z', 'v'],
      ['w', 'v'],
    ],
    'w',
    'z',
    2,
  ],
];

for (let testCase of testCases) {
  const [edges, a, b, result] = testCase;
  expect(shortestPath(edges, a, b)).to.equal(result);
}
