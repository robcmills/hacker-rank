import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
Write a function, maxPathSum, that takes in the root of a binary tree that contains number values. The function should return the maximum sum of any root to leaf path within the tree.

You may assume that the input tree is non-empty.

Complexity: 
n = number of nodes
Time: O(n)
Space: O(n)
*/
function maxPathSum(root: TreeNode | null): number {
  if (root === null) return -Infinity;
  if (root.left === null && root.right === null) return root.val;
  return root.val + Math.max(maxPathSum(root.left), maxPathSum(root.right));
}

// test_00:
{
  const a = new TreeNode(3);
  const b = new TreeNode(11);
  const c = new TreeNode(4);
  const d = new TreeNode(4);
  const e = new TreeNode(-2);
  const f = new TreeNode(1);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  //       3
  //    /    \
  //   11     4
  //  / \      \
  // 4   -2     1

  expect(maxPathSum(a)).to.equal(18);
}

// test_01:
{
  const a = new TreeNode(5);
  const b = new TreeNode(11);
  const c = new TreeNode(54);
  const d = new TreeNode(20);
  const e = new TreeNode(15);
  const f = new TreeNode(1);
  const g = new TreeNode(3);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  e.left = f;
  e.right = g;

  //        5
  //     /    \
  //    11    54
  //  /   \
  // 20   15
  //      / \
  //     1  3

  expect(maxPathSum(a)).to.equal(59);
}

// test_02:
{
  const a = new TreeNode(-1);
  const b = new TreeNode(-6);
  const c = new TreeNode(-5);
  const d = new TreeNode(-3);
  const e = new TreeNode(0);
  const f = new TreeNode(-13);
  const g = new TreeNode(-1);
  const h = new TreeNode(-2);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;
  e.left = g;
  f.right = h;

  //        -1
  //      /   \
  //    -6    -5
  //   /  \     \
  // -3   0    -13
  //     /       \
  //    -1       -2

  expect(maxPathSum(a)).to.equal(-8);
}

// test_03:
{
  const a = new TreeNode(42);

  //        42

  expect(maxPathSum(a)).to.equal(42);
}
