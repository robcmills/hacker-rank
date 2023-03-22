import { expect } from 'chai';

/*
Write a function, hasPath, that takes in an object representing the adjacency list of a directed acyclic graph and two nodes (src, dst). The function should return a boolean indicating whether or not there exists a directed path between the source and destination nodes.
*/
type Graph = Record<string, string[]>;

function hasPath(graph: Graph, src: string, dst: string): boolean {
  if (src === dst) return true;

  for (let neighbor of graph[src]) {
    if (hasPath(graph, neighbor, dst)) return true;
  }

  return false;
}

// test_00:
{
  const graph = {
    f: ['g', 'i'],
    g: ['h'],
    h: [],
    i: ['g', 'k'],
    j: ['i'],
    k: [],
  };

  expect(hasPath(graph, 'f', 'k')).to.equal(true);
}

// test_01:
{
  const graph = {
    f: ['g', 'i'],
    g: ['h'],
    h: [],
    i: ['g', 'k'],
    j: ['i'],
    k: [],
  };

  expect(hasPath(graph, 'f', 'j')).to.equal(false);
}

// test_02:
{
  const graph = {
    f: ['g', 'i'],
    g: ['h'],
    h: [],
    i: ['g', 'k'],
    j: ['i'],
    k: [],
  };

  expect(hasPath(graph, 'i', 'h')).to.equal(true);
}

// test_03:
{
  const graph = {
    v: ['x', 'w'],
    w: [],
    x: [],
    y: ['z'],
    z: [],
  };

  expect(hasPath(graph, 'v', 'w')).to.equal(true);
}

// test_04:
{
  const graph = {
    v: ['x', 'w'],
    w: [],
    x: [],
    y: ['z'],
    z: [],
  };

  expect(hasPath(graph, 'v', 'z')).to.equal(false);
}
