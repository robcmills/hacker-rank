import { expect } from 'chai';

type Graph = Record<string, number[]>;

/*
Write a function, connectedComponentsCount, that takes in the adjacency list of an undirected graph. The function should return the number of connected components within the graph.
*/
function connectedComponentsCount(graph: Graph): number {
  let count = 0;

  const visited = new Set<string>();
  for (let node of Object.keys(graph)) {
    if (visited.has(node)) continue;
    traverse(graph, node, visited);
    count++;
  }

  return count;
}

function traverse(graph: Graph, from: string, visited: Set<string>) {
  visited.add(from);
  for (let neighbor of graph[from]) {
    if (visited.has(`${neighbor}`)) continue;
    traverse(graph, `${neighbor}`, visited);
  }
}

expect(
  connectedComponentsCount({
    0: [8, 1, 5],
    1: [0],
    5: [0, 8],
    8: [0, 5],
    2: [3, 4],
    3: [2, 4],
    4: [3, 2],
  })
).to.equal(2);
