import { expect } from 'chai';
import { Graph } from './Graph';

/*
Write a function, topologicalOrder, that takes in an object representing the adjacency list for a directed-acyclic graph. The function should return an array containing the topological-order of the graph.

The topological ordering of a graph is a sequence where "parent nodes" appear before their "children" within the sequence.

### Approach

Key insight: This is essentially a longest path problem.

We can model a depth first traversal as a tree, that branches
whenever there are multiple adjacent nodes. We collect node
values as we traverse, and then return the longest path as we 
recurse back up the tree.

Complexity:

n = number of nodes

*/
function topologicalOrder(graph: Graph): string[] {
  // Find the root node (no parents)
  const children = new Set<string>();
  for (let node in graph) {
    for (let child of graph[node]) {
      children.add(child);
    }
  }
  const root = Object.keys(graph).find((node) => !children.has(node))!;
  return findLongestPath(graph, root);
}

function findLongestPath(graph: Graph, root: string): string[] {
  const children = graph[root];
  if (children.length === 0) return [root];

  let longestPath: string[] = [];
  for (let child of children) {
    const longestChildPath = findLongestPath(graph, child);
    if (longestChildPath.length > longestPath.length) {
      longestPath = longestChildPath;
    }
  }
  return [root, ...longestPath];
}

// test_00:
expect(
  topologicalOrder({
    a: ['f'], //      c ───┐
    b: ['d'], //      ↓    ↓
    c: ['a', 'f'], // a →  f
    d: ['e'], //      ┌────┴────┐
    e: [], //         ↓         ↓
    f: ['b', 'e'], // b →  d →  e
  })
).to.deep.equal(['c', 'a', 'f', 'b', 'd', 'e']);

// test_01:
expect(
  topologicalOrder({
    h: ['l', 'm'], //      l ───┐
    i: ['k'], //           ↑    ↓
    j: ['k', 'i'], //      h →  m
    k: ['h', 'm'], //      ↑    ↑
    l: ['m'], //      i →  k ───┘
    m: [], //         ↑    ↑
  }) //               j ───┘
).to.deep.equal(['j', 'i', 'k', 'h', 'l', 'm']);

// test_02:
expect(
  topologicalOrder({
    q: [], //  t →  s →  r →  q
    r: ['q'],
    s: ['r'],
    t: ['s'],
  })
).to.deep.equal(['t', 's', 'r', 'q']);

// test_03:
expect(
  topologicalOrder({
    //                     ┌─────────┐
    v: ['z', 'w'], //      │    y    │
    w: [], //              ↑    ↓    ↓
    x: ['w', 'v', 'z'], // z ←  x →  w
    y: ['x'], //           ↑    ↓    ↑
    z: ['w'], //           └─── v ───┘
  })
).to.deep.equal(['y', 'x', 'v', 'z', 'w']);
