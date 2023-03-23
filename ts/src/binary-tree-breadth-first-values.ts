import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
Write a function, breadthFirstValues, that takes in the root of a binary tree. The function should return an array containing all values of the tree in breadth-first order.
*/
function breadthFirstValues(root: TreeNode | null): string[] {
  if (root === null) return [];
  const values: string[] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const current = queue.shift() as TreeNode;
    values.push(current.val);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
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

  expect(breadthFirstValues(a)).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f']);
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

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;
  e.left = g;
  f.right = h;

  //      a
  //    /   \
  //   b     c
  //  / \     \
  // d   e     f
  //    /       \
  //   g         h

  expect(breadthFirstValues(a)).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
}

// test_02:
{
  const a = new TreeNode('a');

  //      a

  expect(breadthFirstValues(a)).to.deep.equal(['a']);
}

// test_03:
{
  const a = new TreeNode('a');
  const b = new TreeNode('b');
  const c = new TreeNode('c');
  const d = new TreeNode('d');
  const e = new TreeNode('e');
  const x = new TreeNode('x');

  a.right = b;
  b.left = c;
  c.left = x;
  c.right = d;
  d.right = e;

  //      a
  //       \
  //        b
  //       /
  //      c
  //    /  \
  //   x    d
  //         \
  //          e

  expect(breadthFirstValues(a)).to.deep.equal(['a', 'b', 'c', 'x', 'd', 'e']);
}

// test_04:
{
  expect(breadthFirstValues(null)).to.deep.equal([]);
}
