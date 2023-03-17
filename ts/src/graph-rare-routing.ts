import { expect } from 'chai';

/*
Write a function, rareRouting, that takes in a number of cities (n) and a two dimensional array where each subarray represents a direct road that connects a pair of cities. The function should return a boolean indicating whether or not there exists a unique route for every pair of cities. A route is a sequence of roads that does not visit a city more than once.

Cities will be numbered 0 to n - 1.

You can assume that all roads are two-way roads. This means if there is a road between A and B, then you can use that road to go from A to B or go from B to A.

For example, given these roads:

0 --- 1
| \
|  \
|   \
2    3

There is a unique route for between every pair of cities.
So the answer is true.


For example, given these roads:

0 --- 1
| \
|  \
|   \
2 -- 3

There are two routes that can be used to travel from city 1 to city 2:
- first route:  1, 0, 2
- second route: 1, 0, 3, 2 
The answer is false, because routes should be unique.

### Approach

Clearly, if the graph is cyclic, then it loses the unique
routing property. So this problem is similar to
graph-has-cycle, but note that the white, grey, black
algorithm works only on a directed graph. We'll have to 
tweak it for an undirected graph in this problem.

Also, note that if the graph contains multiple unconnected
components (islands), then you will never find a path between
the nodes of each island, thus failing the problem requirements.

Detecting this is easy though. All we have to do is start a 
depth first traversal from any node, and we should visit every
node if there is only one island. If after traversal, and 
recording visited nodes, there are any "left over" nodes not
in the visited set (more than one island), then return false.

Complexity:

A depth first traversal has to travel every edge, and there
is in the worst case an edge between every pair of nodes.

Time: O(n^2) n = number of nodes
Space: O(n)

*/
function rareRouting(n: number, roads: [number, number][]): boolean {
  const graph = buildUndirectedGraph(roads);
  const visited = new Set<number>(); // ()
  const nodes = Object.keys(graph).map(Number);
  return !isUndirectedCylic(graph, nodes[0], visited) && visited.size === n;
}

type Visited = Set<number>;

function isUndirectedCylic(
  graph: Graph,
  node: number, // 1
  visited: Visited, // ()
  prev: number | null = null
): boolean {
  if (visited.has(node)) return true;
  visited.add(node);
  for (let neighbor of graph[node]) {
    if (neighbor === prev) continue;
    if (isUndirectedCylic(graph, neighbor, visited, node)) return true;
  }
  return false;
}

type Edges = [number, number][];
type Graph = Record<number, number[]>;

function buildUndirectedGraph(edges: Edges): Graph {
  const graph: Graph = {};
  for (let [a, b] of edges) {
    if (!(a in graph)) graph[a] = [];
    graph[a].push(b);
    if (!(b in graph)) graph[b] = [];
    graph[b].push(a);
  }
  return graph;
}

// test_00:
expect(
  rareRouting(4, [
    [0, 1], // 1 - 0 - 2
    [0, 2], //     |
    [0, 3], //     3
  ])
).to.equal(true);

// test_01:
expect(
  rareRouting(4, [
    [0, 1], // 1 - 0 - 2
    [0, 2], //     | /
    [0, 3], //     3
    [3, 2],
  ])
).to.equal(false);

// test_02:
expect(
  rareRouting(6, [
    [1, 2], // 1 - 2
    [5, 4], //
    [3, 0], // 5 - 4
    [0, 1], //     |
    [0, 4], // 3 - 0 - 1
  ])
).to.equal(true);

// test_03:
expect(
  rareRouting(6, [
    [1, 2], // 3 - 1 - 2
    [4, 1], // | / |
    [5, 4], // 0 - 4 - 5
    [3, 0],
    [0, 1],
    [0, 4],
  ])
).to.equal(false);

// test_04:
expect(
  rareRouting(4, [
    [0, 1], // 0 - 1   3 - 2
    [3, 2],
  ])
).to.equal(false);
