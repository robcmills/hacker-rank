import { expect } from 'chai';

/*
1319. Number of Operations to Make Network Connected
Medium
4.1K
55
Companies
There are n computers numbered from 0 to n - 1 connected by ethernet cables connections forming a network where connections[i] = [ai, bi] represents a connection between computers ai and bi. Any computer can reach any other computer directly or indirectly through the network.

You are given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return -1.

Constraints:

1 <= n <= 105
1 <= connections.length <= min(n * (n - 1) / 2, 105)
connections[i].length == 2
0 <= ai, bi < n
ai != bi
There are no repeated connections.
No two computers are connected by more than one cable.

### Approach

We can convert the list of edges into a graph adjacency list.
This will enable us to do a traversal of the graph and count
the number of connected computers, which we can subtract from
n (the total number of computers) to determine how many 
"orphaned" computers there are. 

Then, we know that we will need that many connections to 
connect them, and we can compare that the number of "spare"
connections, which is just the number of connections minus
the number of connected computers minus one (the minimum 
connections required to keep it fully connected).


*/
function makeConnected(n: number, connections: [number, number][]): number {
  const graph = buildGraph(connections);
  const networkSize = largestComponent(graph);
  const numSpareConnections = connections.length - (networkSize - 1);
  const numConnectionsNeeded = n - networkSize; // num of orphaned computers
  return numConnectionsNeeded <= numSpareConnections
    ? numConnectionsNeeded
    : -1;
}

type Graph = Record<number, number[]>;

function largestComponent(graph: Graph): number {
  let largest = 0;
  for (let node in graph) {
    const size = explore(graph, Number(node));
    if (size > largest) largest = size;
  }
  return largest;
}

function explore(
  graph: Graph,
  node: number,
  visited = new Set<number>()
): number {
  visited.add(node);
  let size = 1;
  for (let neighbor of graph[node]) {
    if (!visited.has(neighbor)) size += explore(graph, neighbor, visited);
  }
  return size;
}

function buildGraph(edges: [number, number][]): Graph {
  const graph: Graph = {};
  for (let [a, b] of edges) {
    if (!(a in graph)) graph[a] = [];
    graph[a].push(b);
    if (!(b in graph)) graph[b] = [];
    graph[b].push(a);
  }
  return graph;
}

// Example 1:
expect(
  makeConnected(4, [
    [0, 1], // 0 ─ 1  3
    [0, 2], // │   │
    [1, 2], // 2 ──┘
  ])
).to.equal(1);

// Example 2:
expect(
  makeConnected(6, [
    [0, 1], //  ┌───1──┐  4
    [0, 2], //  │   │  │
    [0, 3], //  2───0  │  5
    [1, 2], //      │  │
    [1, 3], //      3──┘
  ])
).to.equal(2);

// Example 3:
expect(
  makeConnected(6, [
    [0, 1], //  ┌───1  4
    [0, 2], //  │   │
    [0, 3], //  2───0  5
    [1, 2], //      │
  ]) //             3
).to.equal(-1);

// Example 4:
expect(
  makeConnected(11, [
    [1, 4], //  ┌───1─────────┌─4
    [0, 3], //  │   │         │ │
    [1, 3], //  0───3───6───5 │ │
    [3, 7], //  │   │   │   │ │ │
    [2, 7], //  └───7───┘───┘─┘ │
    [0, 1], //      └───────────2
    [2, 4],
    [3, 6],
    [5, 6],
    [6, 7],
    [4, 7],
    [0, 7],
    [5, 7],
  ])
).to.equal(3);
