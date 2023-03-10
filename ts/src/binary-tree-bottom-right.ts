import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
𝕽
https://structy.net/problems/premium/bottom-right-value

### Problem

Write a function, bottomRightValue, that takes in the root of a binary tree. The function should return the right-most value in the bottom-most level of the tree.


You may assume that the input tree is non-empty.

### Approach

Use a **breadth first search** (queue)

            a
         ┌──┴──┐
         b     c
       ┌─┴─┐ ┌─┴─┐
       d   e f   g

It will end naturally with the "bottom right" value.

            a          a
         ┌──┴──┐    ┌──┴──┐
         b     c    x     b
       ┌─┴─┐ ┌─┴─┐      ┌─┴─┐
       d   x x   x      c   d
*/
function bottomRightValue(root: TreeNode | null): {
  height: number;
  value: any;
} {
  const queue = [root];
  let current = null;
  while (queue.length > 0) {
    current = queue.shift() as TreeNode;
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
  return current!.val;
}

// test_00:
{
  const a = new TreeNode(3);
  const b = new TreeNode(11);
  const c = new TreeNode(10);
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
  //   11     10
  //  / \      \
  // 4   -2     1

  expect(bottomRightValue(a)).to.equal(1);
}

// test_01:
{
  const a = new TreeNode(-1);
  const b = new TreeNode(-6);
  const c = new TreeNode(-5);
  const d = new TreeNode(-3);
  const e = new TreeNode(-4);
  const f = new TreeNode(-13);
  const g = new TreeNode(-2);
  const h = new TreeNode(6);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;
  e.left = g;
  e.right = h;

  //        -1
  //      /   \
  //    -6    -5
  //   /  \     \
  // -3   -4   -13
  //     / \
  //    -2  6

  expect(bottomRightValue(a)).to.equal(6);
}

// test_02:
{
  const a = new TreeNode(-1);
  const b = new TreeNode(-6);
  const c = new TreeNode(-5);
  const d = new TreeNode(-3);
  const e = new TreeNode(-4);
  const f = new TreeNode(-13);
  const g = new TreeNode(-2);
  const h = new TreeNode(6);
  const i = new TreeNode(7);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;
  e.left = g;
  e.right = h;
  f.left = i;

  //        -1
  //      /   \
  //    -6    -5
  //   /  \     \
  // -3   -4   -13
  //     / \    /
  //    -2  6  7

  expect(bottomRightValue(a)).to.equal(7);
}

// test_03
{
  const a = new TreeNode('a');
  const b = new TreeNode('b');
  const c = new TreeNode('c');
  const d = new TreeNode('d');
  const e = new TreeNode('e');
  const f = new TreeNode('f');

  a.left = b;
  a.right = c;
  b.right = d;
  d.left = e;
  e.right = f;

  //      a
  //    /   \
  //   b     c
  //    \
  //     d
  //    /
  //   e
  //  /
  // f

  expect(bottomRightValue(a)).to.equal('f');
}

// test_04
{
  const a = new TreeNode(42);

  //      42

  expect(bottomRightValue(a)).to.equal(42);
}
