import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
Write a function, leftyNodes, that takes in the root of a binary tree. The function should return an array containing the left-most value on every level of the tree. The array must be ordered in a top-down fashion where the root is the first element.

Note that the left-most TreeNode on a level may not necessarily be a left child.
*/
function leftyNodes(root: TreeNode<string> | null): string[] {
  if (root === null) return [];

  const result: string[] = [];
  const queue = [[root, 0]];
  while (queue.length > 0) {
    const [currentNode, level] = queue.shift() as [TreeNode, number];
    if (result[level] === undefined) {
      result[level] = currentNode.val;
    }
    if (currentNode.left !== null) queue.push([currentNode.left, level + 1]);
    if (currentNode.right !== null) queue.push([currentNode.right, level + 1]);
  }

  return result;
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
  //    /    \
  //   b      c
  //  / \      \
  // d   e      f
  //    / \
  //    g  h

  expect(leftyNodes(a)).to.deep.equal(['a', 'b', 'd', 'g']);
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

  expect(leftyNodes(u)).to.deep.equal(['u', 't', 'r', 'q']);
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

  expect(leftyNodes(l)).to.deep.equal(['l', 'm', 'o', 'q']);
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

  expect(leftyNodes(n)).to.deep.equal(['n', 'y']);
}

// test_04
{
  const i = new TreeNode('i');
  const n = new TreeNode('n');
  const s = new TreeNode('s');
  const t = new TreeNode('t');

  i.right = n;
  n.left = s;
  n.right = t;

  //       i
  //        \
  //         n
  //        / \
  //       s   t

  expect(leftyNodes(i)).to.deep.equal(['i', 'n', 's']);
}

// test_05
{
  expect(leftyNodes(null)).to.deep.equal([]);
}
