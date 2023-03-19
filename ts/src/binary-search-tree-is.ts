import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
Write a function, isBinarySearchTree, that takes in the root of a binary tree. The function should return a boolean indicating whether or not the tree satisfies the binary search tree property.

A Binary Search Tree is a binary tree where all values within a TreeNode's left subtree are smaller than the node's value and all values in a node's right subtree are greater than or equal to the node's value.

### Approach

Check that the max value from the left subtree is less than the root node value,
and that the min value from the right subtree is greater than the root node value.
This can be accomplished with a simple helper function that gets the min and max 
values from a tree.

Complexity:

Time: O(n)
Space: O(1)

*/
function isBinarySearchTree(root: TreeNode): boolean {
  const [, leftMax] = getTreeMinMax(root.left);
  const [rightMin] = getTreeMinMax(root.right);
  return leftMax < root.val && root.val < rightMin;
}

function getTreeMinMax(root: TreeNode | null): [number, number] {
  if (root === null) return [Infinity, -Infinity];

  const [leftMin, leftMax] = getTreeMinMax(root.left);
  const [rightMin, rightMax] = getTreeMinMax(root.right);

  return [
    Math.min(leftMin, rightMin, root.val),
    Math.max(leftMax, rightMax, root.val),
  ];
}

// test_00:
{
  const a = new TreeNode(12);
  const b = new TreeNode(5);
  const c = new TreeNode(18);
  const d = new TreeNode(3);
  const e = new TreeNode(9);
  const f = new TreeNode(19);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  //      12
  //    /   \
  //   5     18
  //  / \     \
  // 3   9     19

  expect(isBinarySearchTree(a)).to.equal(true);
}

// test_01:
{
  const a = new TreeNode(12);
  const b = new TreeNode(5);
  const c = new TreeNode(18);
  const d = new TreeNode(3);
  const e = new TreeNode(15);
  const f = new TreeNode(19);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  //      12
  //    /   \
  //   5     18
  //  / \     \
  // 3   15     19

  expect(isBinarySearchTree(a)).to.equal(false);
}

// test_02:
{
  const a = new TreeNode(12);
  const b = new TreeNode(5);
  const c = new TreeNode(19);
  const d = new TreeNode(3);
  const e = new TreeNode(9);
  const f = new TreeNode(19);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  //      12
  //    /   \
  //   5     19
  //  / \     \
  // 3   9     19

  expect(isBinarySearchTree(a)).to.equal(true);
}

// test_03:
{
  const a = new TreeNode(12);
  const b = new TreeNode(5);
  const c = new TreeNode(10);
  const d = new TreeNode(3);
  const e = new TreeNode(9);
  const f = new TreeNode(19);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  //      12
  //    /   \
  //   5     10
  //  / \     \
  // 3   9     19

  expect(isBinarySearchTree(a)).to.equal(false);
}

// test_04:
{
  const q = new TreeNode(54);
  const r = new TreeNode(42);
  const s = new TreeNode(70);
  const t = new TreeNode(31);
  const u = new TreeNode(50);
  const v = new TreeNode(72);
  const w = new TreeNode(47);
  const x = new TreeNode(90);

  q.left = r;
  q.right = s;
  r.left = t;
  r.right = u;
  s.right = v;
  u.left = w;
  v.right = x;

  //       54
  //     /    \
  //    42     70
  //   / \      \
  // 31   50     72
  //     /        \
  //    47         90

  expect(isBinarySearchTree(q)).to.equal(true);
}
