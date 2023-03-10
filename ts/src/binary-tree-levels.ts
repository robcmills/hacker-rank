import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
Write a function, treeLevels, that takes in the root of a binary tree. The function should return a 2-Dimensional array where each subarray represents a level of the tree.

[a]
a [b,c]
b [c,d,e]
c [d,e,f]

*/
function treeLevels(root: TreeNode | null): string[][] {
  if (root === null) return [];
  const result: string[][] = [];
  const queue = [{ node: root, level: 0 }];
  let current: LevelNode | null = null;

  while (queue.length > 0) {
    current = queue.shift() as LevelNode;
    if (result[current.level] === undefined) result[current.level] = [];
    result[current.level].push(current.node.val);

    if (current.node.left !== null) {
      queue.push({ node: current.node.left, level: current.level + 1 });
    }
    if (current.node.right !== null) {
      queue.push({ node: current.node.right, level: current.level + 1 });
    }
  }

  return result;
}

type LevelNode = {
  node: TreeNode;
  level: number;
};

// test_00:
{
  const a = new TreeNode('a');
  const b = new TreeNode('b');
  const c = new TreeNode('c');
  const d = new TreeNode('d');
  const e = new TreeNode('e');
  const f = new TreeNode('f');

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  //      a
  //    /   \
  //   b     c
  //  / \     \
  // d   e     f

  expect(treeLevels(a)).to.deep.equal([['a'], ['b', 'c'], ['d', 'e', 'f']]);
}

// test_01:
{
  const a = new TreeNode('a');
  const b = new TreeNode('b');
  const c = new TreeNode('c');
  const d = new TreeNode('d');
  const e = new TreeNode('e');
  const f = new TreeNode('f');
  const g = new TreeNode('g');
  const h = new TreeNode('h');
  const i = new TreeNode('i');

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;
  e.left = g;
  e.right = h;
  f.left = i;

  //         a
  //      /    \
  //     b      c
  //   /  \      \
  //  d    e      f
  //      / \    /
  //     g  h   i

  expect(treeLevels(a)).to.deep.equal([
    ['a'],
    ['b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
  ]);
}

// test_02:
{
  const q = new TreeNode('q');
  const r = new TreeNode('r');
  const s = new TreeNode('s');
  const t = new TreeNode('t');
  const u = new TreeNode('u');
  const v = new TreeNode('v');

  q.left = r;
  q.right = s;
  r.right = t;
  t.left = u;
  u.right = v;

  //      q
  //    /   \
  //   r     s
  //    \
  //     t
  //    /
  //   u
  //  /
  // v

  expect(treeLevels(q)).to.deep.equal([['q'], ['r', 's'], ['t'], ['u'], ['v']]);
}

// test_03:
{
  expect(treeLevels(null)).to.deep.equal([]);
}
