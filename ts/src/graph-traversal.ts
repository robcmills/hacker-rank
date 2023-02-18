import { expect } from 'chai';

type Graph = Record<string, string[]>;

// Graph traversal complexity:
// where n = number of nodes
// Time: O(n^2)
// Space: O(n)

/*
 a →  c
 ↓    ↓
 b    e
 ↓
 d →  f
*/

const graph = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['e'],
  d: ['f'],
  e: [],
  f: [],
};

// function depthFirstTraversal(graph: Graph, start: string) {
//   let result = '';
//   const stack = [start];
//
//   while (stack.length > 0) {
//     const current = stack.pop();
//     result += current;
//     for (let neighbor of graph[current!]) {
//       stack.push(neighbor);
//     }
//   }
//
//   return result;
// }

// expect(depthFirstTraversal(graph, 'a')).to.equal('acebdf');

let visited = '';
function visit(node: string) {
  visited += node;
}

// function depthFirstTraversalRecursive(graph: Graph, node: string) {
//   visit(node);
//
//   for (let neighbor of graph[node]) {
//     depthFirstTraversalRecursive(graph, neighbor);
//   }
// }

// depthFirstTraversalRecursive(graph, 'a');
// expect(visited).to.equal('abdfce');

function breadthFirstTraversal(graph: Graph, node: string) {
  const queue = [node];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    visit(current);
    for (let neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }
}

breadthFirstTraversal(graph, 'a');
expect(visited).to.equal('abcdef');
