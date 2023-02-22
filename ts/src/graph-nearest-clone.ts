import { expect } from 'chai';

type Graph = Record<string, string[]>;

/*
In this challenge, there is a connected undirected graph where each of the nodes is a color.
Given a color, find the shortest path connecting any two nodes of that color.
Each edge has a weight of 1.
If there is not a pair or if the color is not found, print -1.

Complete the findShortest function in the editor below.
It should return an integer representing the length of the shortest path between two nodes of the same color,
or -1 if it is not possible.

findShortest has the following parameter(s):

g_nodes: an integer, the number of nodes
g_from: an array of integers, the start nodes for each edge
g_to: an array of integers, the end nodes for each edge
ids: an array of integers, the color id per node
val: an integer, the id of the color to match
*/
function findShortest(
  n: number,
  from: number[],
  to: number[],
  colors: number[],
  targetColor: number
): number {
  // build adjacency graph
  const graph: Graph = {};
  for (let i = 0; i < n - 1; i++) {
    const fromKey = `${from[i]},${colors[from[i] - 1]}`;
    const toKey = `${to[i]},${colors[to[i] - 1]}`;
    if (!graph[fromKey]) graph[fromKey] = [];
    if (!graph[toKey]) graph[toKey] = [];
    graph[fromKey].push(`${to[i]},${colors[to[i] - 1]}`);
    graph[toKey].push(`${from[i]},${colors[from[i] - 1]}`);
  }

  // iterate nodes, skipping other colors
  // track shortest distance or -1 if not found
  let shortest = Infinity;
  for (let node of Object.keys(graph)) {
    const currentColor = parseInt(node.split(',')[1]);
    if (currentColor !== targetColor) continue;
    // for each node of target color, do a depth first search to find nearest match, tracking distance
    const distance = exploreDistance(
      graph,
      node,
      targetColor,
      new Set<string>()
    );
    if (distance > 0 && distance < shortest) shortest = distance;
  }
  return shortest === Infinity ? -1 : shortest;
}

function exploreDistance(
  graph: Graph,
  from: string,
  targetColor: number,
  visited: Set<string>
): number {
  let queue: [string, number][] = [[from, 0]];
  while (queue.length) {
    const [current, distance] = queue.shift() as [string, number];
    if (!current || visited.has(current)) continue;
    const currentColor = parseInt(current.split(',')[1]);
    if (currentColor === targetColor && distance > 0) return distance;
    visited.add(current);
    for (let neighbor of graph[current]) {
      if (visited.has(neighbor)) continue;
      queue.push([neighbor, distance + 1]);
    }
  }
  return -1;
}

const testCases: [number, number[], number[], number[], number, number][] = [
  [5, [1, 2, 2, 3], [2, 3, 4, 5], [1, 2, 3, 1, 3], 3, 1],
  [5, [1, 2, 2, 3], [2, 3, 4, 5], [1, 2, 3, 1, 3], 1, 2],
  [5, [1, 2, 2, 3], [2, 3, 4, 5], [1, 2, 3, 1, 3], 2, -1],
];

for (let [n, from, to, colors, color, result] of testCases) {
  expect(findShortest(n, from, to, colors, color)).to.equal(result);
}
