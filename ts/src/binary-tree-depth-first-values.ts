import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
Write a function, depthFirstValues, that takes in the root of a binary tree. The function should return an array containing all values of the tree in depth-first order (aka pre-order).
*/
function depthFirstValues(
  root: TreeNode | null,
  values: string[] = []
): string[] {
  if (root === null) return [];
  values.push(root.val);
  depthFirstValues(root.left, values);
  depthFirstValues(root.right, values);
  return values;
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

  expect(depthFirstValues(a)).to.deep.equal(['a', 'b', 'd', 'e', 'c', 'f']);
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

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;
  e.left = g;

  //      a
  //    /   \
  //   b     c
  //  / \     \
  // d   e     f
  //    /
  //   g

  expect(depthFirstValues(a)).to.deep.equal([
    'a',
    'b',
    'd',
    'e',
    'g',
    'c',
    'f',
  ]);
}

// test_02:
{
  const a = new TreeNode('a');
  //      a
  expect(depthFirstValues(a)).to.deep.equal(['a']);
}

// test_03:
{
  const a = new TreeNode('a');
  const b = new TreeNode('b');
  const c = new TreeNode('c');
  const d = new TreeNode('d');
  const e = new TreeNode('e');

  a.right = b;
  b.left = c;
  c.right = d;
  d.right = e;

  //      a
  //       \
  //        b
  //       /
  //      c
  //       \
  //        d
  //         \
  //          e

  expect(depthFirstValues(a)).to.deep.equal(['a', 'b', 'c', 'd', 'e']);
}

// test_04:
{
  expect(depthFirstValues(null)).to.deep.equal([]);
}
