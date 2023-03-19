import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
Write a function, postOrder, that takes in the root of a binary tree. The function should return an array containing the post-ordered values of the tree.

Post-order traversal is when TreeNodes are recursively visited in the order: left child, right child, self.
*/
function postOrder(root: TreeNode | null): string[] {
  if (root === null) return [];
  return [...postOrder(root.left), ...postOrder(root.right), root.val];
}

// test_00:
{
  const x = new TreeNode('x');
  const y = new TreeNode('y');
  const z = new TreeNode('z');

  x.left = y;
  x.right = z;

  //       x
  //    /    \
  //   y      z

  expect(postOrder(x)).to.deep.equal(['y', 'z', 'x']);
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
  c.left = f;
  c.right = g;

  //      a
  //    /    \
  //   b      c
  //  / \    / \
  // d   e  f   g

  expect(postOrder(a)).to.deep.equal(['d', 'e', 'b', 'f', 'g', 'c', 'a']);
}

// test_02:
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
  e.right = h;

  //      a
  //    /    \
  //   b      c
  //  / \      \
  // d   e      f
  //    / \
  //    g  h

  expect(postOrder(a)).to.deep.equal(['d', 'g', 'h', 'e', 'b', 'f', 'c', 'a']);
}

// test_03:
{
  const l = new TreeNode('l');
  const m = new TreeNode('m');
  const n = new TreeNode('n');
  const o = new TreeNode('o');
  const p = new TreeNode('p');
  const q = new TreeNode('q');
  const r = new TreeNode('r');
  const s = new TreeNode('s');
  const t = new TreeNode('t');

  l.left = m;
  l.right = n;
  n.left = o;
  n.right = p;
  o.left = q;
  o.right = r;
  p.left = s;
  p.right = t;

  //        l
  //     /     \
  //    m       n
  //         /    \
  //         o     p
  //        / \   / \
  //       q   r s   t

  expect(postOrder(l)).to.deep.equal(['m', 'q', 'r', 'o', 's', 't', 'p', 'n', 'l']);
}

// test_04:
{
  expect(postOrder(null)).to.deep.equal([]);
}
