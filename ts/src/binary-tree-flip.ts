import { expect } from 'chai';

/*
Write a function, flipTree, that takes in the root of a binary tree. The function should flip the binary tree, turning left subtrees into right subtrees and vice-versa. This flipping should occur in-place by modifying the original tree. The function should return the root of the tree.
*/
class TreeNode<ValueType> {
  val: ValueType;
  left: TreeNode<ValueType> | null;
  right: TreeNode<ValueType> | null;

  constructor(val: ValueType) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function flipTree(root: TreeNode<string> | null) {
  if (root === null) return root;

  flipTree(root.left);
  flipTree(root.right);

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  return root;
}

function getTreeValues(root: TreeNode<string> | null): string[] {
  if (root === null) return [];

  const left = getTreeValues(root.left);
  const right = getTreeValues(root.right);
  return [root.val, ...left, ...right];
}

// test_00
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
  //    /   \
  //   b     c
  //  / \     \
  // d   e     f
  //    / \
  //    g  h

  expect(getTreeValues(flipTree(a))).to.deep.equal([
    'a',
    'c',
    'f',
    'b',
    'e',
    'h',
    'g',
    'd',
  ]);

  //       a
  //    /    \
  //   c      b
  //  /     /   \
  // f     e    d
  //     /  \
  //    h    g
}

// test_01
{
  const u = new TreeNode('u');
  const t = new TreeNode('t');
  const s = new TreeNode('s');
  const r = new TreeNode('r');
  const q = new TreeNode('q');
  const p = new TreeNode('p');

  u.left = t;
  u.right = s;
  s.right = r;
  r.left = q;
  r.right = p;

  //     u
  //  /    \
  // t      s
  //         \
  //         r
  //        / \
  //        q  p

  expect(getTreeValues(flipTree(u))).to.deep.equal([
    'u',
    's',
    'r',
    'p',
    'q',
    't',
  ]);

  //           u
  //        /    \
  //       s      t
  //      /
  //     r
  //    / \
  //   p  q
}

// test_02
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

  expect(getTreeValues(flipTree(l))).to.deep.equal([
    'l',
    'n',
    'p',
    't',
    's',
    'o',
    'r',
    'q',
    'm',
  ]);

  //             l
  //         /      \
  //        n        m
  //      /  \
  //    p     o
  //  / \    / \
  // t   s  r   q
}

// test_03
{
  const n = new TreeNode('n');
  const y = new TreeNode('y');
  const c = new TreeNode('c');

  n.left = y;
  n.right = c;

  //       n
  //     /   \
  //    y     c

  expect(getTreeValues(flipTree(n))).to.deep.equal(['n', 'c', 'y']);

  //       n
  //     /   \
  //    c     y
}
