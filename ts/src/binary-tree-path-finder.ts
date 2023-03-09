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
Write a function, pathFinder, that takes in the root of a binary tree and a target value. The function should return an array representing a path to the target value. If the target value is not found in the tree, then return null.

You may assume that the tree contains unique values.
*/
function pathFinder(tree: TreeNode | null, target: any): any[] | null {
  const result = _pathFinder(tree, target);
  if (result === null) {
    return null;
  } else {
    return result.reverse();
  }
}

function _pathFinder(tree: TreeNode | null, target: any): any[] | null {
  if (tree === null) return null;
  if (tree.val === target) return [target];

  const left = _pathFinder(tree.left, target);
  if (left !== null) {
    left.push(tree.val);
    return left;
  }
  const right = _pathFinder(tree.right, target);
  if (right !== null) {
    right.push(tree.val);
    return right;
  }

  return null;
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

  expect(pathFinder(a, 'e')).to.deep.equal(['a', 'b', 'e']);
}

// test_01:
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

  expect(pathFinder(a, 'p')).to.equal(null);
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
  f.right = h;

  //      a
  //    /   \
  //   b     c
  //  / \     \
  // d   e     f
  //    /       \
  //   g         h

  expect(pathFinder(a, 'c')).to.deep.equal(['a', 'c']);
}

// test_03:
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

  expect(pathFinder(a, 'h')).to.deep.equal(['a', 'c', 'f', 'h']);
}

// test_04:
{
  const x = new TreeNode('x');
  expect(pathFinder(x, 'x')).to.deep.equal(['x']);
}

// test_05:
expect(pathFinder(null, 'x')).to.equal(null);

// test_06:
{
  const root = new TreeNode(0);
  let curr = root;
  for (let i = 1; i <= 6000; i += 1) {
    curr.right = new TreeNode(i);
    curr = curr.right;
  }

  //      0
  //       \
  //        1
  //         \
  //          2
  //           \
  //            3
  //             .
  //              .
  //               .
  //              5999
  //                \
  //                6000

  const result = pathFinder(root, 3451);
  // -> [0, 1, 2, 3, ..., 3450, 3451]
  if (result) {
    expect(result[0]).to.equal(0);
    expect(result[1]).to.equal(1);
    expect(result[2]).to.equal(2);
    expect(result[3450]).to.equal(3450);
    expect(result[3451]).to.equal(3451);
  }
}
