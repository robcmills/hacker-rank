import { TreeNode } from './TreeNode';

/*
Write a function, allTreePaths, that takes in the root of a binary tree. The function should return a 2-Dimensional array where each subarray represents a root-to-leaf path in the tree.

The order within an individual path must start at the root and end at the leaf, but the relative order among paths in the outer array does not matter.

You may assume that the input tree is non-empty.
*/
function allTreePaths(
  root: TreeNode,
  paths: string[][] = [],
  path: string[] = []
): string[][] {
  path.push(root.val);

  if (root.left === null && root.right === null) {
    paths.push([...path]);
    path.pop();
    return paths;
  }

  if (root.left !== null) allTreePaths(root.left, paths, path);
  if (root.right !== null) allTreePaths(root.right, paths, path);

  path.pop();
  return paths;
}

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

  allTreePaths(a); // ->
  // [
  //   [ 'a', 'b', 'd' ],
  //   [ 'a', 'b', 'e' ],
  //   [ 'a', 'c', 'f' ]
  // ]
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

  allTreePaths(a); // ->
  // [
  //   [ 'a', 'b', 'd' ],
  //   [ 'a', 'b', 'e', 'g' ],
  //   [ 'a', 'b', 'e', 'h' ],
  //   [ 'a', 'c', 'f', 'i' ]
  // ]
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

  allTreePaths(q); // ->
  // [
  //   [ 'q', 'r', 't', 'u', 'v' ],
  //   [ 'q', 's' ]
  // ]
}

// test_03:
{
  const z = new TreeNode('z');

  //      z

  allTreePaths(z); // ->
  // [
  //   ['z']
  // ]
}
