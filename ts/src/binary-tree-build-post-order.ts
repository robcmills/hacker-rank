import { expect } from 'chai';
import { TreeNode } from './TreeNode';

/*
Write a function, buildTreeInPost, that takes in an array of in-ordered values and an array of post-ordered values for a binary tree. The function should build a binary tree that has the given in-order and post-order traversal structure. The function should return the root of this tree.

You can assume that the values of inorder and postorder are unique.

### Approach

inorder: left, self, right
postorder: left, right, self 

  ['y', 'x', 'z']
  ['y', 'z', 'x']
              ↑
Key insight: Since postorder always ends with the root node,
regardless of the length of the input, we can start by creating
that root node:

  (x)

Then searching for it in the inorder input enables us to divide the nodes
into left and right (since each node is guaranteed to be unique):

   left  ↓  right
  ['y', 'x', 'z']
  ['y', 'z', 'x']
              ↑
        (x)
    ┌────┴────┐
   (y)       (z)

Using a larger input example, we can more clearly see the algorithm 
as it repeats on sub-trees:

             ┌─┐↓┌─┐ length = 3
inorder =   [dbeafcg]
postorder = [debfgca]
                   ↑
          (a)
      ┌────┴────┐
    [dbe]     [fcg]

The root node (a) splits the inorder input into left and right, in 
this case, both have a length of three nodes.
Now we need another key insight: inorder and postorder both always
start with the same left-most node. So we pull same number of nodes
from the start of the postorder input, and repeat for the right.

postorder = [debfgca]
             └─┘└─┘
          (a)
      ┌────┴────┐
    [dbe]     [fcg]
    [deb]     [fgc]

And now that we have both the inorder and postorder for these child
nodes, we can determine which is the root, and which are left and right:

          (a)
      ┌────┴────┐
    [dbe]     [fcg]
    [deb]     [fgc]
       ↑         ↑
          (a)
      ┌────┴────┐
     (b)       (c)

   [d] [e]   [f] [g]

Complexity:

Time: O(n^2)
Space: O(n)

*/
function buildTreeInPost(
  inorder: string[],
  postorder: string[]
): TreeNode | null {
  if (inorder.length === 0) return null;
  if (inorder.length === 1) return new TreeNode(inorder[0]);

  const rootValue = postorder.pop() as string;
  const rootIndex = inorder.indexOf(rootValue);
  const leftInorder = inorder.slice(0, rootIndex);
  const rightInorder = inorder.slice(rootIndex + 1);
  const leftPostorder = postorder.slice(0, leftInorder.length);
  const rightPostorder = postorder.slice(leftInorder.length);

  const rootNode = new TreeNode(rootValue);
  rootNode.left = buildTreeInPost(leftInorder, leftPostorder);
  rootNode.right = buildTreeInPost(rightInorder, rightPostorder);

  return rootNode;
}

function inorderValues(root: TreeNode | null, values: string[] = []): string[] {
  if (root === null) return values;
  inorderValues(root.left, values);
  values.push(root.val);
  inorderValues(root.right, values);
  return values;
}

// test_00
expect(
  inorderValues(buildTreeInPost(['y', 'x', 'z'], ['y', 'z', 'x']))
).to.deep.equal(['y', 'x', 'z']);
//       x
//    /    \
//   y      z

// test_01
expect(
  inorderValues(
    buildTreeInPost(
      ['d', 'b', 'e', 'a', 'f', 'c', 'g'],
      ['d', 'e', 'b', 'f', 'g', 'c', 'a']
    )
  )
).to.deep.equal(['d', 'b', 'e', 'a', 'f', 'c', 'g']);
//      a
//    /    \
//   b      c
//  / \    / \
// d   e  f   g

// test_02
expect(
  inorderValues(
    buildTreeInPost(
      ['d', 'b', 'g', 'e', 'h', 'a', 'c', 'f'],
      ['d', 'g', 'h', 'e', 'b', 'f', 'c', 'a']
    )
  )
).to.deep.equal(['d', 'b', 'g', 'e', 'h', 'a', 'c', 'f']);
//      a
//    /    \
//   b      c
//  / \      \
// d   e      f
//    / \
//    g  h

// test_03
expect(inorderValues(buildTreeInPost(['m', 'n'], ['m', 'n']))).to.deep.equal([
  'm',
  'n',
]);
//       n
//     /
//    m

// test_04
expect(inorderValues(buildTreeInPost(['n', 'm'], ['m', 'n']))).to.deep.equal([
  'n',
  'm',
]);
//     n
//      \
//       m
