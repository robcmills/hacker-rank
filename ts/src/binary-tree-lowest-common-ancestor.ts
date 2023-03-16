import { expect } from 'chai';

/*
Write a function, lowestCommonAncestor, that takes in the root of a binary tree and two values. The function should return the value of the lowest common ancestor of the two values in the tree.

You may assume that the tree values are unique and the tree is non-empty.

Note that a TreeNode may be considered an ancestor of itself.

### Approach

          a
      ┌───┴───┐
      b       c
    ┌─┴─┐   ┌─┴─┐
    d   e  null f
      ┌─┴─┐
      g   h

  expect(lowestCommonAncestor(a, 'd', 'h')).to.equal('b');

Do a depth first traversal of the tree. 
The target base case is when the currently visited node's val is equal
to either val1 or val2. In this case return the found val.
The other base case of course is a leaf node when no target value has
been found. In this case return an empty string.

Else recurse both sides of the tree, storing the results in variables.

If the results from both sides include both val1 and val2, then we 
have found the lowestCommonAncestor, and return the current node's val.

Else return the results from both sides joined into a single string.

Complexity:

Since we are doing a standard traversal of the tree, visiting every node:

n = number of nodes
m = tree height
Time: O(n)
Space: O(m)
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

function lowestCommonAncestor(
  root: TreeNode<string> | null,
  val1: string,
  val2: string
): string {
  if (root === null) return '';
  if (root.val === val1) return val1;
  if (root.val === val2) return val2;

  const result =
    lowestCommonAncestor(root.left, val1, val2) +
    lowestCommonAncestor(root.right, val1, val2);
  return result.includes(val1) && result.includes(val2) ? root.val : result;
}

// example tree
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

  // test_00
  expect(lowestCommonAncestor(a, 'd', 'h')).to.equal('b');

  // test_01
  expect(lowestCommonAncestor(a, 'd', 'g')).to.equal('b');

  // test_02
  expect(lowestCommonAncestor(a, 'g', 'c')).to.equal('a');

  // test_03
  expect(lowestCommonAncestor(a, 'b', 'g')).to.equal('b');

  // test_04
  expect(lowestCommonAncestor(a, 'f', 'c')).to.equal('c');
}

// example tree
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

  // test_05
  expect(lowestCommonAncestor(l, 'r', 'p')).to.equal('n');

  // test_06
  expect(lowestCommonAncestor(l, 'm', 'o')).to.equal('l');

  // test_07
  expect(lowestCommonAncestor(l, 't', 'q')).to.equal('n');

  // test_08
  expect(lowestCommonAncestor(l, 's', 'p')).to.equal('p');
}
