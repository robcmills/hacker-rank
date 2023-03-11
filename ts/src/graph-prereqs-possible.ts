import { expect } from 'chai';

/*
Write a function, prereqsPossible, that takes in a number of courses (n) and prerequisites as arguments. Courses have ids ranging from 0 through n - 1. A single prerequisite of [A, B] means that course A must be taken before course B. The function should return a boolean indicating whether or not it is possible to complete all courses.
*/
function prereqsPossible(numCourses: number, prereqs: number[][]): boolean {
  const graph = buildGraph(prereqs);
  const visiting = new Set<number>();
  const visited = new Set<number>();
  for (let node in graph) {
    if (hasCycle(graph, Number(node), visiting, visited)) return false;
  }
  return true;
}

function hasCycle(
  graph: Graph,
  node: number,
  visiting: Set<number>,
  visited: Set<number>
) {
  if (visiting.has(node)) return true;
  if (visited.has(node)) return false;

  visiting.add(node);

  for (let neighbor of graph[String(node)]) {
    if (hasCycle(graph, neighbor, visiting, visited)) return true;
  }

  visiting.delete(node);
  visited.add(node);
  return false;
}

type Graph = Record<string, number[]>;

function buildGraph(edges: number[][]): Graph {
  const graph: Graph = {};
  for (let [a, b] of edges) {
    if (!(a in graph)) graph[a] = [];
    graph[a].push(b);
    if (!(b in graph)) graph[b] = [];
  }
  return graph;
}

// test_00:
{
  const numCourses = 6;
  const prereqs = [
    [0, 1], // 0 →  1
    [2, 3], // ↓    ↓
    [0, 2], // 2 →  3
    [1, 3],
    [4, 5], // 4 →  5
  ];
  expect(prereqsPossible(numCourses, prereqs)).to.equal(true);
}

// test_01:
{
  const numCourses = 6;
  const prereqs = [
    [0, 1], // ┌─→  1
    [2, 3], // │    ↓
    [0, 2], // 0 ←  3
    [1, 3], // │    ↑
    [4, 5], // └─→  2
    [3, 0],
  ]; //        4 →  5
  expect(prereqsPossible(numCourses, prereqs)).to.equal(false);
}

// test_02:
{
  const numCourses = 5;
  const prereqs = [
    [2, 4],
    [1, 0],
    [0, 2],
    [0, 4],
  ];
  expect(prereqsPossible(numCourses, prereqs)).to.equal(true);
}

// test_03:
{
  const numCourses = 6;
  const prereqs = [
    [2, 4],
    [1, 0],
    [0, 2],
    [0, 4],
    [5, 3],
    [3, 5],
  ];
  expect(prereqsPossible(numCourses, prereqs)).to.equal(false);
}

// test_04:
{
  const numCourses = 8;
  const prereqs = [
    [1, 0],
    [0, 6],
    [2, 0],
    [0, 5],
    [3, 7],
    [4, 3],
  ];
  expect(prereqsPossible(numCourses, prereqs)).to.equal(true);
}

// test_05:
{
  const numCourses = 8;
  const prereqs = [
    [1, 0],
    [0, 6],
    [2, 0],
    [0, 5],
    [3, 7],
    [7, 4],
    [4, 3],
  ];
  expect(prereqsPossible(numCourses, prereqs)).to.equal(false);
}

// test_06:
{
  const numCourses = 42;
  const prereqs = [[6, 36]];
  expect(prereqsPossible(numCourses, prereqs)).to.equal(true);
}
