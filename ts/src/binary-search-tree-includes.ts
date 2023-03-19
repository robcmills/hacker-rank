import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
Write a function, binarySearchTreeIncludes, that takes in the root of a binary search tree containing numbers and a target value. The function should return a boolean indicating whether or not the target is found within the tree.

A Binary Search Tree is a binary tree where all values within a TreeNode's left subtree are smaller than the node's value and all values in a node's right subtree are greater than or equal to the node's value.

Your solution should have a best case runtime of O(log(n)).

Complexity:

Worst case

Time: O(n) 
Space: O(n)

Best case (balanced tree)

Time: O(logn) 
Space: O(logn)

*/
function binarySearchTreeIncludes(
  root: TreeNode | null,
  target: number
): boolean {
  if (root === null) return false;
  if (root.val === target) return true;

  return root.val < target
    ? binarySearchTreeIncludes(root.right, target)
    : binarySearchTreeIncludes(root.left, target);
}

// tree a
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

  // test_00:
  expect(binarySearchTreeIncludes(a, 9)).to.equal(true);

  // test_01:
  expect(binarySearchTreeIncludes(a, 15)).to.equal(false);

  // test_02:
  expect(binarySearchTreeIncludes(a, 1)).to.equal(false);

  // test_03:
  expect(binarySearchTreeIncludes(a, 12)).to.equal(true);
}

// tree q
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

  expect(binarySearchTreeIncludes(q, 55)).to.equal(false);
  expect(binarySearchTreeIncludes(q, 47)).to.equal(true);
  expect(binarySearchTreeIncludes(q, 49)).to.equal(false);
  expect(binarySearchTreeIncludes(q, 70)).to.equal(true);
  expect(binarySearchTreeIncludes(q, 100)).to.equal(false);
}
