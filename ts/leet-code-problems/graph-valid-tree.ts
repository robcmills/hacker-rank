import { expect } from 'chai';

/*
178. Graph Valid Tree
Medium

Description

Given n nodes labeled from 0 to n - 1 and a list of undirected edges, write a function to check whether edges make up a valid tree.

You can assume that no duplicate edges will appear in edges. 

### Approach

In a valid tree (undirected) we should be able to start a dfs from any node
and reach every other node and not detect any cycles. 

*/
function isValidTree(n: number, edges: [number, number][]): boolean {
  if (n === 0) return true;

  const adjacents: { [node: number]: number[] } = {};
  for (let [a, b] of edges) {
    if (!(a in adjacents)) adjacents[a] = [];
    adjacents[a].push(b);
    if (!(b in adjacents)) adjacents[b] = [];
    adjacents[b].push(a);
  }

  const visited = new Set<number>();

  const dfs = (node: number, prev: number | null) => {
    if (visited.has(node)) return false;
    visited.add(node);
    for (let adjacent of adjacents[node]) {
      if (adjacent === prev) continue;
      if (!dfs(adjacent, node)) return false;
    }
    return true;
  };

  return dfs(edges[0][0], null) && visited.size === n;
}

// Example 1
/*

    0
  ┌─┴─┬─┐
  1   2 3
  │
  4

*/
{
  const n = 5;
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
  ] as [number, number][];
  expect(isValidTree(n, edges)).to.be.true;
}

// Example 2
/*
     0
     │
     1─┬─4
     │ │
     2 │
     │ │
     3─┘
*/
{
  const n = 5;
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [1, 3],
    [1, 4],
  ] as [number, number][];
  expect(isValidTree(n, edges)).to.be.false;
}

// Example 3
/*
    0   3 
   / \   \
  1   2   4
*/
{
  const n = 5;
  const edges = [
    [0, 1],
    [0, 2],
    [3, 4],
  ] as [number, number][];
  expect(isValidTree(n, edges)).to.be.false;
}

// Example 4
/*
    0
   /
  1
*/
{
  const n = 2;
  const edges = [[0, 1]] as [number, number][];
  expect(isValidTree(n, edges)).to.be.true;
}

// Example 5
{
  const n = 0;
  const edges = [] as [number, number][];
  expect(isValidTree(n, edges)).to.be.true;
}
