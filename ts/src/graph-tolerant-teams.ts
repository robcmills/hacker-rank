import { expect } from 'chai';

/*
Write a function, tolerantTeams, that takes in an array of rivalries as an argument. A rivalry is a pair of people who should not be placed on the same team. The function should return a boolean indicating whether or not it is possible to separate people into two teams, without rivals being on the same team. The two teams formed do not have to be the same size.

### Approach

Iterate rivalries and build a "rivals list" (adjacency list)
an object whose keys are player names, and values are rivals.

For example, given the following rivalries (edges):

  ['philip', 'seb'],
  ['raj', 'nader'],
  ['raj', 'philip'],
  ['seb', 'raj'],

We can build the following adjacency list (graph):

  {
    philip: [seb, raj],
    seb: [philip, raj],
    raj: [nader, philip, seb],
    nader: [raj],
  }

Which results in a graph that looks like this:

  philip ↔  seb
    ↕        ↑
   raj ←─────┘
    ↕
  nader

Now we need put each player (node) on one of two teams.
We can do this by traversing the graph, and "coloring"
each node:

  philip (red) ─────→ seb (blue)
    ↓                 │
   raj (blue) ←──x────┘
    ↓
  nader (red)

(very similar to graph-colors problem)
In graph theory terminology, we are determining if the
graph is bipartite.

Look at another example where it is possible:

  ['alan', 'jj'],
  ['betty', 'richard'],
  ['jj', 'simcha'],
  ['richard', 'christine'],

  {
    alan: [jj],
    jj: [alan, simcha],
    betty: [richard],
    richard: [betty, christine],
    simcha: [jj],
    christine: [richard],
  }

  alan ↔  jj ↔  simcha

  betty ↔  richard ↔  christine

Which can be successfully traversed and colored:

  alan (red) →  jj (blue) →  simcha (red)

  betty (red) →  richard (blue) →  christine (red)

Complexity:

Time: O(e) e = number of rivalries
Space: O(n) n = number of players

*/
function tolerantTeams(rivalries: [string, string][]): boolean {
  const graph = buildGraph(rivalries);
  const colors: Colors = {};
  for (let node in graph) {
    if (node in colors) continue;
    if (!isBipartite(graph, node, colors)) return false;
  }
  return true;
}

type Colors = Record<string, string>;

function isBipartite(
  graph: Graph,
  node: string,
  colors: Colors = {},
  color: string = 'white'
): boolean {
  if (node in colors) return true;
  colors[node] = color;

  const neighbors = graph[node];
  for (let neighbor of neighbors) {
    if (colors[neighbor] === color) return false;
    if (
      !isBipartite(
        graph,
        neighbor,
        colors,
        color === 'white' ? 'black' : 'white'
      )
    ) {
      return false;
    }
  }
  return true;
}

type Graph = Record<string, string[]>;

function buildGraph(edges: [string, string][]): Graph {
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
  tolerantTeams([
    ['philip', 'seb'],
    ['raj', 'nader'],
  ])
).to.equal(true);

// test_01:
expect(
  tolerantTeams([
    ['philip', 'seb'],
    ['raj', 'nader'],
    ['raj', 'philip'],
    ['seb', 'raj'],
  ])
).to.equal(false);

// test_02:
expect(
  tolerantTeams([
    ['cindy', 'anj'],
    ['alex', 'matt'],
    ['alex', 'cindy'],
    ['anj', 'matt'],
    ['brando', 'matt'],
  ])
).to.equal(true);

// test_03:
expect(
  tolerantTeams([
    ['alex', 'anj'],
    ['alex', 'matt'],
    ['alex', 'cindy'],
    ['anj', 'matt'],
    ['brando', 'matt'],
  ])
).to.equal(false);

// test_04:
expect(
  tolerantTeams([
    ['alan', 'jj'],
    ['betty', 'richard'],
    ['jj', 'simcha'],
    ['richard', 'christine'],
  ])
).to.equal(true);

// test_05:
expect(
  tolerantTeams([
    ['alan', 'jj'],
    ['betty', 'richard'],
    ['jj', 'simcha'],
    ['richard', 'christine'],
  ])
).to.equal(true);

// test_06:
expect(
  tolerantTeams([
    ['alan', 'jj'],
    ['jj', 'richard'],
    ['betty', 'richard'],
    ['jj', 'simcha'],
    ['richard', 'christine'],
  ])
).to.equal(true);

// test_07:
expect(
  tolerantTeams([
    ['alan', 'jj'],
    ['betty', 'richard'],
    ['betty', 'christine'],
    ['jj', 'simcha'],
    ['richard', 'christine'],
  ])
).to.equal(false);
