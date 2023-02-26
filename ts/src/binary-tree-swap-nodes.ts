import { expect } from 'chai';

/*
A binary tree is a tree which is characterized by one of the following properties:
It can be empty (null).
It contains a root node only.
It contains a root node with a left subtree, a right subtree, or both. These subtrees are also binary trees.
*/
type BinaryTree = null | {
  index: number;
  left?: BinaryTree;
  right?: BinaryTree;
};

/*
Complete the swapNodes function in the editor below.
It should return a two-dimensional array where each element is an array of integers
representing the node indices of an in-order traversal after a swap operation.

swapNodes has the following parameter(s):
- indexes: an array of integers representing index values of each _node[i]_,
beginning with _node[1]_, the first element, as the root.
- queries: an array of integers, each representing a _k_ value.

You are given a tree of n nodes where nodes are indexed from [1..n] and it is rooted at 1. You have to perform t swap operations on it, and after each swap operation print the in-order traversal of the current state of the tree.
*/
function swapNodes(indexes: number[][], queries: number[]): number[][] {
  let result: number[][] = [];
  const tree = buildTree(indexes);
  // console.log(tree);
  for (let query of queries) {
    swapTree(tree, query);
    // console.log(traverseTree(tree).join(' '));
    result.push(traverseTree(tree));
  }
  return result;
}

/* In-order traversal */
function traverseTree(tree: BinaryTree, visited: number[] = []) {
  if (tree === null) return visited;
  if (tree.left) traverseTree(tree.left, visited);
  visited.push(tree.index);
  if (tree.right) traverseTree(tree.right, visited);
  return visited;
}

/*
Swapping subtrees of a node means that if initially node has left subtree L and right subtree R,
then after swapping, the left subtree will be R and the right subtree, L.

Given a tree and an integer, k, in one operation,
we need to swap the subtrees of all the nodes at each depth h,
where h ∈ [k, 2k, 3k,...].
In other words, if h is a multiple of k, swap the left and right subtrees of that level.
*/
function swapTree(tree: BinaryTree, k: number, depth: number = 1): void {
  if (tree === null) return;
  if (depth % k === 0) {
    const temp = tree.left;
    tree.left = tree.right;
    tree.right = temp;
  }
  if (tree.left) swapTree(tree.left, k, depth + 1);
  if (tree.right) swapTree(tree.right, k, depth + 1);
}

/*
indexes: an array of integers representing index values of each _node[i]_,
beginning with _node[1]_, the first element, as the root.
Each of the sub-arrays contains two integers, a b,
where a is the index of left child,
and b is the index of right child of ith node.
Note: -1 is used to represent a null node.
*/
function buildTree(
  indexes: number[][],
  tree: BinaryTree = { index: 1 }
): BinaryTree {
  if (tree === null) return tree;
  const [leftIndex, rightIndex] = indexes[tree.index - 1];
  tree.left = leftIndex === -1 ? null : { index: leftIndex };
  tree.right = rightIndex === -1 ? null : { index: rightIndex };
  if (tree.left) buildTree(indexes, tree.left);
  if (tree.right) buildTree(indexes, tree.right);
  return tree;
}

const testCases: [number[][], number[], number[][]][] = [
  [
    [
      [2, 3], // indexes
      [-1, -1],
      [-1, -1],
    ],
    [1, 1], // queries
    [
      [3, 1, 2], // result
      [2, 1, 3],
    ],
  ],
  [
    [
      [2, 3], // 1                     1         [depth]
      [4, 5], // 2                   _/ \_
      [6, -1], // 3                _/     \_
      [-1, 7], // 4              _/         \_
      [8, 9], // 5              /             \
      [10, 11], // 6           2               3   [2]
      [12, 13], // 7          / \             /
      [-1, 14], // 8         /   \           /
      [-1, -1], // 9        /     \         /
      [15, -1], // 10      4       5       6       [3]
      [16, 17], // 11       \     / \     / \
      [-1, -1], // 12       7    8   9   10  11    [4]
      [-1, -1], // 13      / \    \     /   /  \
      [-1, -1], // 14     12 13   14   15  16  17  [5]
      [-1, -1], // 15
      [-1, -1], // 16
      [-1, -1], // 17
    ],
    [2, 3],
    [
      [14, 8, 5, 9, 2, 4, 13, 7, 12, 1, 3, 10, 15, 6, 17, 11, 16],
      [9, 5, 14, 8, 2, 13, 7, 12, 4, 1, 3, 17, 11, 16, 6, 10, 15],
    ],
  ],
  [
    [
      [2, 3],
      [4, -1],
      [5, -1],
      [6, -1],
      [7, 8],
      [-1, 9],
      [-1, -1],
      [10, 11],
      [-1, -1],
      [-1, -1],
      [-1, -1],
    ],
    [2, 4],
    [
      [2, 9, 6, 4, 1, 3, 7, 5, 11, 8, 10],
      [2, 6, 9, 4, 1, 3, 7, 5, 10, 8, 11],
    ],
  ],
];

for (let [indexes, queries, result] of testCases) {
  expect(swapNodes(indexes, queries)).to.deep.equal(result);
}
