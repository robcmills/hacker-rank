import { expect } from 'chai';

/*
Write a function, longestPath, that takes in an adjacency list for a directed acyclic graph. The function should return the length of the longest path within the graph. A path may start and end at any two nodes. The length of a path is considered the number of edges in the path, not the number of nodes.
*/
function longestPath(graph: Graph): number {
  let greatestLength = 0;

  for (let node in graph) {
    const stack = [[node, 0]];
    while (stack.length > 0) {
      const [current, length] = stack.pop() as [string, number];
      if (length > greatestLength) greatestLength = length;

      const neighbors = graph[current];
      for (let neighbor of neighbors) {
        stack.push([neighbor, length + 1]);
      }
    }
  }

  return greatestLength;
}

type Graph = Record<string, string[]>;

// test_00:
{
  const graph = {
    a: ['c', 'b'], // a →  b
    b: ['c'], //      ↓    ↓
    c: [], //         c ←
  };

  expect(longestPath(graph)).to.equal(2);
}

// test_01:
{
  const graph = {
    a: ['c', 'b'],
    b: ['c'],
    c: [],
    q: ['r'],
    r: ['s', 'u', 't'],
    s: ['t'],
    t: ['u'],
    u: [],
  };

  expect(longestPath(graph)).to.equal(4);
}

// test_02:
{
  const graph = {
    h: ['i', 'j', 'k'],
    g: ['h'],
    i: [],
    j: [],
    k: [],
    x: ['y'],
    y: [],
  };

  expect(longestPath(graph)).to.equal(2);
}

// test_03:
{
  const graph = {
    a: ['b'],
    b: ['c'],
    c: [],
    e: ['f'],
    f: ['g'],
    g: ['h'],
    h: [],
  };

  expect(longestPath(graph)).to.equal(3);
}
