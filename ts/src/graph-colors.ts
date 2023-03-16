import { expect } from 'chai';

/*
Write a function, canColor, that takes in an object representing the adjacency list of an undirected graph. The function should return a boolean indicating whether or not it is possible to color nodes of the graph using two colors in such a way that adjacent nodes are always different colors.

For example, given this graph:

x-y-z

It is possible to color the nodes by using red for x and z, 
then use blue for y. So the answer is true.

For example, given this graph:

    q
   / \
  s - r

It is not possible to color the nodes without making two 
adjacent nodes the same color. So the answer is false.

### Approach

Traverse the graph. Populate a visited object as you go,
with node values as keys and mark each node as either black
or white, alternating. 
For each node, check whether any neighbor is the same color,
and if so, return false.
Else return true.

Complexity:

We are iterating through all nodes in the adjacency list, 
and then traversing the graph each time, so:

n = number of nodes
Time: O(n^2)
Space: O(n)

*/
type Graph = Record<string, string[]>;
type Visited = Record<string, string>;

function canColor(graph: Graph): boolean {
  const visited: Visited = {};
  return Object.keys(graph).every((node) => {
    if (node in visited) return true;
    return traverse(graph, node, 'white', visited);
  });
}

function traverse(
  graph: Graph,
  node: string,
  color: string,
  visited: Visited
): boolean {
  visited[node] = color;
  const neighbors = graph[node];
  if (
    neighbors.some(
      (neighbor) => neighbor in visited && visited[neighbor] === color
    )
  ) {
    return false;
  }
  return neighbors
    .filter((neighbor) => !(neighbor in visited))
    .every((neighbor) =>
      traverse(graph, neighbor, color === 'white' ? 'black' : 'white', visited)
    );
}

// test_00:
expect(
  canColor({
    x: ['y'], //   x - y - z
    y: ['x', 'z'],
    z: ['y'],
  })
).to.equal(true);

// test_01:
expect(
  canColor({
    q: ['r', 's'],
    r: ['q', 's'],
    s: ['r', 'q'],
  })
).to.equal(false);

// test_02:
expect(
  canColor({
    a: ['b', 'c', 'd'],
    b: ['a'],
    c: ['a'],
    d: ['a'],
  })
).to.equal(true);

// test_03:
expect(
  canColor({
    a: ['b', 'c', 'd'],
    b: ['a'],
    c: ['a', 'd'],
    d: ['a', 'c'],
  })
).to.equal(false);

// test_04:
expect(
  canColor({
    h: ['i', 'k'],
    i: ['h', 'j'],
    j: ['i', 'k'],
    k: ['h', 'j'],
  })
).to.equal(true);

// test_05:
expect(
  canColor({
    z: [],
  })
).to.equal(true);

// test_06:
expect(
  canColor({
    h: ['i', 'k'],
    i: ['h', 'j'],
    j: ['i', 'k'],
    k: ['h', 'j'],
    q: ['r', 's'],
    r: ['q', 's'],
    s: ['r', 'q'],
  })
).to.equal(false);

// test_07:
expect(
  canColor({
    a: ['b', 'd'],
    c: ['b', 'f'],
    b: ['a', 'c'],
    d: ['a', 'e'],
    e: ['d', 'f'],
    f: ['e', 'c'],
  })
).to.equal(true);
