import { expect } from 'chai';

/*
337. House Robber III
Medium
7.6K
114
company
Amazon
company
Google
company
Microsoft
The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

Constraints:

The number of nodes in the tree is in the range [1, 104].
0 <= Node.val <= 104

### Approach

Firstly, the neighborhood "tree" is given to us as an array, so we have to convert that into a tree. 
It appears to be an array in "heap" order, so we can utilize the following formulas to help us navigate the array, find values and build the tree:

left child of node i = 2 * i + 1
right child of node i = 2 * i + 2

We can start by constructing the root node, and then passing it into a modified dfs that navigates the array to get values of all descendents, until leaf nodes are reached when the calculated indices fall outside the bounds of the array.


Secondly, on to the main algorithm.

Given the following tree:

  root = [3, 4, 5, 1, 3, null, 1];

         3
     ┌───┴───┐
     4       5
  ┌──┴──┐ ┌──┴──┐
  1     3       1

Starting at the root node, we have a choice, to rob or not to rob.
If we rob it, then we get the money from that house, plus the max from the rest of the tree. But the restriction in the problem is that we can not rob adjacent houses, so if we rob the root, then we want to know the max from the rest of the tree, exluding the root's children:

        +3 (rob)
     ┌───┴───┐
     x       x (skip)
  ┌──┴──┐ ┌──┴──┐
  1     3       1 (+max from rest)

But if we don't rob the root house, then we don't have to skip the children, and we want to know the max from the rest of the tree:

         x (skip)
     ┌───┴───┐
     4       5 (+max from rest)
  ┌──┴──┐ ┌──┴──┐
  1     3       1

So how do we account for these two scenarios?
We can do a post-order DFS and for each node, return an array: 

  [withRoot, withoutRoot]

So in post-order search, we would immediately descend down the tree to the first leaf node (both children are null), and return the max money that could be stolen, considering that node as the root of a sub-tree:

         3
     ┌───┴───┐
     4       5
  ┌──┴──┐ ┌──┴──┐
  1     3       1
  ↑
  return [1,0] // [withRoot, withoutRoot]

Same for right child:

            3
        ┌───┴────────┐
        4            5
      ┌─┴─┐       ┌──┴──┐
[1,0] 1   3 [3,0]       1

Then for the parent of these first two leaf nodes, we do the same:

  withRoot = current node val + left child withoutRoot + right child withoutRoot
           = 4 + 0 + 0          (can't rob because adjacent)

            3
   ↓    ┌───┴────────┐
  [4, ] 4 ←          5
      ┌─┴─┐       ┌──┴──┐
[1,0] 1   3 [3,0]       1
   ↑           ↑

Then withoutRoot:

            3
     ↓  ┌───┴────────┐
  [4,4] x            5
      ┌─┴─┐       ┌──┴──┐
[1,0] 1   3 [3,0]       1
 ↑           ↑

  withoutRoot = max(left child [withRoot, withoutRoot]) + // no adjacent restrict
                max(right child [withRoot, withoutRoot])
              = max(1, 0) + max(3, 0)
  
Rinse and repeat:

            3 [8,9]
        ┌───┴──────────┐
  [4,4] 4              5 [5,1]
      ┌─┴─┐         ┌──┴──┐
[1,0] 1   3 [3,0] [0,0]   1 [1,0]

And the root will return a [withRoot, withoutRoot], the greater of which represents the max money for the entire tree, and is our solution.

*/
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function buildTree(array: (number | null)[], i = 0): TreeNode | null {
  if (i >= array.length) return null;
  const val = array[i];
  if (!val) return null;

  return new TreeNode(
    val,
    buildTree(array, 2 * i + 1),
    buildTree(array, 2 * i + 2)
  );
}

function rob(root: TreeNode | null): number {
  const dfs = (node: TreeNode | null): [number, number] => {
    if (node === null) return [0, 0];

    const left = dfs(node.left);
    const right = dfs(node.right);

    return [
      node.val + left[1] + right[1],
      Math.max(...left) + Math.max(...right),
    ];
  };

  return Math.max(...dfs(root));
}

// Example 1:
/*
        3
     ┌──┴──┐
     2     3
   ┌─┴─┐ ┌─┴─┐
       3     1
*/
{
  const root = [3, 2, 3, null, 3, null, 1];
  const expected = 7;
  expect(rob(buildTree(root))).to.equal(expected);
  // Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
}

// Example 2:
{
  const root = [3, 4, 5, 1, 3, null, 1];
  const expected = 9;
  expect(rob(buildTree(root))).to.equal(expected);
  // Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
}
