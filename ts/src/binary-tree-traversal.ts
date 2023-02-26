import { expect } from 'chai';

type Nod = {
  value: string;
  left?: Nod;
  right?: Nod;
};

const a: Nod = { value: 'a' };
const b: Nod = { value: 'b' };
const c: Nod = { value: 'c' };
const d: Nod = { value: 'd' };
const e: Nod = { value: 'e' };
const f: Nod = { value: 'f' };
const g: Nod = { value: 'g' };

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
e.left = g;

//     a
//    / \
//   b   c
//  / \   \
// d   e   f
//    /
//   g

function depthFirst(root: Nod, result: string[] = []): string[] {
  result.push(root.value);
  if (root.left) depthFirst(root.left, result);
  if (root.right) depthFirst(root.right, result);
  return result;
}

expect(depthFirst(a)).to.deep.equal(['a', 'b', 'd', 'e', 'g', 'c', 'f']);

function inOrder(root: Nod, result: string[] = []): string[] {
  if (root.left) inOrder(root.left, result);
  result.push(root.value);
  if (root.right) inOrder(root.right, result);
  return result;
}

expect(inOrder(a)).to.deep.equal(['d', 'b', 'g', 'e', 'a', 'c', 'f']);

function treeHeight(root?: Nod): number {
  if (!root) return 0;

  const leftHeight = treeHeight(root.left);
  const rightHeight = treeHeight(root.right);

  return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
}

expect(treeHeight(a)).to.equal(4);

function levelOrder(root: Nod, result: string[] = []): string[] {
  const height = treeHeight(root);
  for (let i = 1; i <= height; i++) {
    pushLevel(root, i, result);
  }
  return result;
}

function pushLevel(root: Nod | undefined, level: number, result: string[]) {
  if (!root) return;
  if (level == 1) {
    result.push(root.value);
  } else if (level > 1) {
    pushLevel(root.left, level - 1, result);
    pushLevel(root.right, level - 1, result);
  }
}

expect(levelOrder(a)).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
