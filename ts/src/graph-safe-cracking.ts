import { expect } from 'chai';

/*
Oh-no! You forgot the number combination that unlocks your safe. Luckily, you knew that you'd be forgetful so you previously wrote down a bunch of hints that can be used to determine the correct combination. Each hint is a pair of numbers 'x, y' that indicates you must enter digit 'x' before 'y' (but not necessarily immediately before y).

The keypad on the safe has digits 0-9. You can assume that the hints will generate exactly one working combination and that a digit can occur zero or one time in the answer.

Write a function, safeCracking, that takes in an array of hints as an argument and determines the combination that will unlock the safe. The function should return a string representing the combination.

### Approach

Key insight: This is a graph problem. The "hints" are edges
of a directed graph. The solution sequence is the topological
order of the nodes.

> The topological ordering of a graph is a sequence where "parent nodes" appear before their "children" within the sequence.

  hints     graph
  [3, 1],     
  [4, 7],        5 →  9
  [5, 9],        ↑    ↓
  [4, 3],   ┌─→  3 →  1
  [7, 3],   │    ↑
  [3, 5],   4 →  7
  [9, 1],

To find the topological order, we need to first construct an 
adjacency list, and then use a number of parents map to work 
through the order.

  adjacency list  number of parents
  {               {
    1: [],          1: 2,
    3: [1, 5],      3: 2,
    4: [3, 7],      4: 0,
    5: [9],         5: 1,
    7: [3],         7: 1,
    9: [1],         9: 1,
  }               }

Any nodes that have zero parents we push onto a stack.
While there are nodes in the stack:
  pop off a node,
  add it to the result array
  for each of its children, decrement their parent count
  if parent count reaches zero, push onto stack

Resurn result array (topological order)

Complexity:

e = number of edges

Time: O(e)
Space: O(e)

*/
function safeCracking(hints: [number, number][]): string {
  const graph = buildGraph(hints);

  const parents: Record<number, number> = {};
  for (let node in graph) {
    parents[node] = 0;
  }
  for (let parent in graph) {
    for (let child of graph[parent]) {
      parents[child] += 1;
    }
  }

  const topological: number[] = [];
  const stack = Object.keys(graph).filter(
    (node) => parents[Number(node)] === 0
  );
  while (stack.length > 0) {
    const parent = Number(stack.pop());
    topological.push(parent);
    for (let child of graph[parent]) {
      parents[child] -= 1;
      if (parents[child] === 0) stack.push(String(child));
    }
  }

  return topological.join('');
}

type Graph = Record<number, number[]>;
function buildGraph(edges: [number, number][]): Graph {
  const graph: Graph = {};
  for (let [a, b] of edges) {
    if (!(a in graph)) graph[a] = [];
    graph[a].push(b);
    if (!(b in graph)) graph[b] = [];
  }
  return graph;
}

// test_00:
expect(
  safeCracking([
    [7, 1],
    [1, 8],
    [7, 8],
  ])
).to.equal('718');

// test_01:
expect(
  safeCracking([
    [3, 1],
    [4, 7],
    [5, 9],
    [4, 3],
    [7, 3],
    [3, 5],
    [9, 1],
  ])
).to.equal('473591');

// test_02:
expect(
  safeCracking([
    [2, 5],
    [8, 6],
    [0, 6],
    [6, 2],
    [0, 8],
    [2, 3],
    [3, 5],
    [6, 5],
  ])
).to.equal('086235');

// test_03:
expect(
  safeCracking([
    [0, 1],
    [6, 0],
    [1, 8],
  ])
).to.equal('6018');

// test_04:
expect(
  safeCracking([
    [8, 9],
    [4, 2],
    [8, 2],
    [3, 8],
    [2, 9],
    [4, 9],
    [8, 4],
  ])
).to.equal('38429');
