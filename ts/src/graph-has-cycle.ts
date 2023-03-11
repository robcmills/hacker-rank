import { expect } from 'chai';

/*
Write a function, hasCycle, that takes in an object representing the adjacency list of a directed graph. The function should return a boolean indicating whether or not the graph contains a cycle.

### Approach

Use white-grey-black algorithm for graph cycle detection.

Mark nodes as one of the following:

white: unvisited
grey: visiting
black: visited (memo)

*/
function hasCycle(graph: Graph): boolean {
  const visiting = new Set<string>();
  const visited = new Set<string>();

  for (let node in graph) {
    if (_hasCycle(graph, node, visiting, visited)) return true;
  }
  return false;
}

function _hasCycle(
  graph: Graph,
  node: string,
  visiting: Set<string>,
  visited: Set<string>
) {
  if (visiting.has(node)) return true;
  if (visited.has(node)) return false;

  visiting.add(node);

  for (let neighbor of graph[node]) {
    if (_hasCycle(graph, neighbor, visiting, visited)) return true;
  }

  visiting.delete(node);
  visited.add(node);
  return false;
}

type Graph = Record<string, string[]>;

// test_00:
{
  expect(
    hasCycle({
      a: ['b'],
      b: ['c'],
      c: ['a'],
    })
  ).to.equal(true);
}

// test_01:
{
  expect(
    hasCycle({
      a: ['b', 'c'], // a →  b
      b: ['c'], //      ↓    │
      c: ['d'], //      c ←──┘
      d: [], //         ↓
    }) //               d
  ).to.equal(false);
}

// test_02:
{
  expect(
    hasCycle({
      a: ['b', 'c'],
      b: [],
      c: [],
      e: ['f'],
      f: ['e'],
    })
  ).to.equal(true);
}

// test_03:
{
  expect(
    hasCycle({
      q: ['r', 's'],
      r: ['t', 'u'],
      s: [],
      t: [],
      u: [],
      v: ['w'],
      w: [],
      x: ['w'],
    })
  ).to.equal(false);
}

// test_04:
{
  expect(
    hasCycle({
      a: ['b'],
      b: ['c'],
      c: ['a'],
      g: [],
    })
  ).to.equal(true);
}

// test_05:
{
  expect(
    hasCycle({
      a: ['b'],
      b: ['c'],
      c: ['d'],
      d: ['b'],
    })
  ).to.equal(true);
}
