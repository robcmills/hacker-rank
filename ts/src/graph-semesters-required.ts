import { expect } from 'chai';

/*
Write a function, semestersRequired, that takes in a number of courses (n) and a list of prerequisites as arguments. Courses have ids ranging from 0 through n - 1. A single prerequisite of [A, B] means that course A must be taken before course B. Return the minimum number of semesters required to complete all n courses. There is no limit on how many courses you can take in a single semester, as long the prerequisites of a course are satisfied before taking it.

Note that given prerequisite [A, B], you cannot take course A and course B concurrently in the same semester. You must take A in some semester before B.

You can assume that it is possible to eventually complete all courses.
*/
function semestersRequired(n: number, prereqs: number[][]): number {
  const graph = buildGraph(prereqs);
  let longest = 1;
  for (let node in graph) {
    const stack = [[node, 1]];
    while (stack.length > 0) {
      const [current, length] = stack.pop() as [number, number];
      if (length > longest) longest = length;
      const neighbors = graph[current];
      for (let neighbor of neighbors) {
        stack.push([neighbor, length + 1]);
      }
    }
  }
  return longest;
}

type Graph = Record<number, number[]>;

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
    [1, 2], // 1 →  2 →  4
    [2, 4], // 3 →  5
    [3, 5], //      ↑
    [0, 5], //      0
  ];
  expect(semestersRequired(numCourses, prereqs)).to.equal(3);
}

// test_01:
{
  const numCourses = 7;
  const prereqs = [
    [4, 3],
    [3, 2],
    [2, 1],
    [1, 0],
    [5, 2],
    [5, 6],
  ];
  expect(semestersRequired(numCourses, prereqs)).to.equal(5);
}

// test_02:
{
  const numCourses = 5;
  const prereqs = [
    [1, 0],
    [3, 4],
    [1, 2],
    [3, 2],
  ];
  expect(semestersRequired(numCourses, prereqs)).to.equal(2);
}

// test_03:
{
  const numCourses = 12;
  const prereqs: number[][] = [];
  expect(semestersRequired(numCourses, prereqs)).to.equal(1);
}

// test_04:
{
  const numCourses = 3;
  const prereqs = [
    [0, 2],
    [0, 1],
    [1, 2],
  ];
  expect(semestersRequired(numCourses, prereqs)).to.equal(3);
}

// test_05:
{
  const numCourses = 6;
  const prereqs = [
    [3, 4],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 5],
  ];
  expect(semestersRequired(numCourses, prereqs)).to.equal(2);
}
