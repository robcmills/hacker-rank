import { expect } from 'chai';
import { Graph } from './Graph';

/*
Write a function, topologicalOrder, that takes in an object representing the adjacency list for a directed-acyclic graph. The function should return an array containing the topological-order of the graph.

The topological ordering of a graph is a sequence where "parent nodes" appear before their "children" within the sequence.

### Approach

Key insight: We can work out the topological order using the 
number of parents for each node. 

Build a hash map of node: numberParents
Push any nodes that have zero parents onto a stack.
While the stack is not empty,
add the node to our final order result
decrement the node's children's parent count
and if parent count reaches zero, push that node onto the stack.

Complexity:

n = number of nodes
e = number of edges

Time: O(e + n)
Space: O(n)

*/
function topologicalOrder(graph: Graph): string[] {
  const numberParents: Record<string, number> = {};
  for (let node in graph) {
    numberParents[node] = 0;
  }
  for (let parent in graph) {
    for (let child of graph[parent]) {
      numberParents[child] += 1;
    }
  }

  const stack = Object.keys(graph).filter((node) => numberParents[node] === 0);
  const order: string[] = [];

  while (stack.length > 0) {
    const parent = stack.pop() as string;
    order.push(parent);
    for (let child of graph[parent]) {
      numberParents[child] -= 1;
      if (numberParents[child] === 0) stack.push(child);
    }
  }

  return order;
}

// test_00:
expect(
  topologicalOrder({
    a: ['f'], //           c →  g
    b: ['d'], //           ↓    ↓
    c: ['a', 'g'], //      a →  f
    d: ['e'], //           ┌────┴────┐
    e: [], //              ↓         ↓
    f: ['b', 'e'], //      b →  d →  e
    g: ['f'],
  })
).to.deep.equal(['c', 'g', 'a', 'f', 'b', 'd', 'e']);

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

// test_04:
expect(
  topologicalOrder({
    a: ['c'], //       a →  c →  e
    b: ['d'], //            ↓
    c: ['d', 'e'], //  b →  d →  f
    d: ['f'],
    e: [],
    f: [],
  })
).to.deep.equal(['b', 'a', 'c', 'e', 'd', 'f']);

// test_05:
expect(
  topologicalOrder({
    a: ['b', 'c'], //          a
    b: ['d', 'e', 'f'], // ┌───┴───┐
    c: ['g', 'h', 'i'], // ↓       ↓
    d: [], //              b       c
    e: [], //           ┌──┼──┐ ┌──┼──┐
    f: [], //           ↓  ↓  ↓ ↓  ↓  ↓
    g: [], //           d  e  f g  h  i
    h: [],
    i: [],
  })
).to.deep.equal(['a', 'c', 'i', 'h', 'g', 'b', 'f', 'e', 'd']);
