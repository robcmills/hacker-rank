import { expect } from 'chai';

class TreeNode {
  val: any;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: any) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/*
Write a function, howHigh, that takes in the root of a binary tree. The function should return a number representing the height of the tree.

The height of a binary tree is defined as the maximal number of edges from the root TreeNode to any leaf node.

If the tree is empty, return -1.
*/
function howHigh(root: TreeNode | null): number {
  if (root === null) return -1;
  const left = howHigh(root.left);
  const right = howHigh(root.right);
  return 1 + Math.max(left, right);
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

  expect(howHigh(a)).to.equal(2);
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

  expect(howHigh(a)).to.equal(3);
}

// test_02:
{
  const a = new TreeNode('a');
  const c = new TreeNode('c');

  a.right = c;

  //      a
  //       \
  //        c

  expect(howHigh(a)).to.equal(1);
}

// test_03:
{
  const a = new TreeNode('a');

  //      a

  expect(howHigh(a)).to.equal(0);
}

// test_04:
{
  expect(howHigh(null)).to.equal(-1);
}
