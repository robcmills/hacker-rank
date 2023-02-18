import { expect } from 'chai';

type Edge = [string, string];
type Graph = Record<string, string[]>;

/*
Write a function, undirectedPath, that takes in an array of edges for an undirected graph and two nodes (nodeA, nodeB).
The function should return a boolean indicating whether or not there exists a path between nodeA and nodeB.
*/
function undirectedPath(edges: Edge[], nodeA: string, nodeB: string): boolean {
  // first convert edges into adjacency list
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB, new Set<string>());
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

// depth first recursive search
function hasPath(
  graph: Graph,
  start: string,
  end: string,
  visited: Set<string>
): boolean {
  if (start === end) return true;
  visited.add(start);
  for (let neighbor of graph[start]) {
    if (visited.has(neighbor)) continue;
    if (hasPath(graph, neighbor, end, visited)) return true;
  }
  return false;
}

const testCases: [Edge[], string, string, boolean][] = [
  [
    [
      ['i', 'j'], // i - j  o - n
      ['k', 'i'], // |
      ['m', 'k'], // k - m
      ['k', 'l'], // |
      ['o', 'n'], // l
    ],
    'j',
    'm',
    true,
  ],
  [
    [
      ['i', 'j'],
      ['k', 'i'],
      ['m', 'k'],
      ['k', 'l'],
      ['o', 'n'],
    ],
    'm',
    'j',
    true,
  ],
  [
    [
      ['i', 'j'],
      ['k', 'i'],
      ['m', 'k'],
      ['k', 'l'],
      ['o', 'n'],
    ],
    'l',
    'j',
    true,
  ],
  [
    [
      ['i', 'j'],
      ['k', 'i'],
      ['m', 'k'],
      ['k', 'l'],
      ['o', 'n'],
    ],
    'k',
    'o',
    false,
  ],
];

for (let testCase of testCases) {
  const [edges, nodeA, nodeB, result] = testCase;
  expect(undirectedPath(edges, nodeA, nodeB)).to.equal(result);
}
