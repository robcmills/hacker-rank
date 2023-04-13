import { expect } from 'chai';
import { Trie, TrieNode } from './trie-prefix-tree';

/*
https://leetcode.com/problems/word-search-ii/

Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
 

Example 1:

  o a a n
  e t a e
  i h k r
  i f l v

Input:
  board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
  words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]

Example 2:

  a b
  c d

Input:
  board = [["a","b"],["c","d"]],
  words = ["abcb"]
Output: []
 

Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 12
board[i][j] is a lowercase English letter.
1 <= words.length <= 3 * 104
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
All the strings of words are unique.

*/
function findWords(board: string[][], words: string[]): string[] {
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }

  const output = new Set<string>();
  // iterate every char of the board
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      // from each char do a breadth first search using trie to find words
      // when a word is found, add it to output
      search(board, x, y, '', trie.root, output);
    }
  }
  return Array.from(output);
}

function search(
  board: string[][],
  x: number,
  y: number,
  prevWord: string,
  node: TrieNode,
  output: Set<string>,
  visited = new Set<string>()
) {
  const char = board[y][x];
  if (!(char in node.children)) return;

  const word = prevWord + char;
  node = node.children[char];
  if (node.isEnd) output.add(word);

  const key = `${x},${y}`;
  visited.add(key);
  for (const [neighborX, neighborY] of getNeighbors(board, x, y, visited)) {
    search(board, neighborX, neighborY, word, node, output, visited);
  }
  visited.delete(key);
}

const deltas = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function getNeighbors(
  board: string[][],
  x: number,
  y: number,
  visited: Set<string>
) {
  const neighbors: [number, number][] = [];
  const height = board.length;
  const width = board[0].length;
  for (const [deltaX, deltaY] of deltas) {
    const targetX = x + deltaX;
    const targetY = y + deltaY;
    const key = `${targetX},${targetY}`;
    if (
      visited.has(key) ||
      targetX < 0 ||
      targetX >= width ||
      targetY < 0 ||
      targetY >= height
    ) {
      continue;
    }
    neighbors.push([targetX, targetY]);
  }
  return neighbors;
}

// Test 1
{
  const board = [
    ['o', 'a', 'a', 'n'],
    ['e', 't', 'a', 'e'],
    ['i', 'h', 'k', 'r'],
    ['i', 'f', 'l', 'v'],
  ];
  const words = ['oath', 'pea', 'eat', 'rain'];
  const output = ['oath', 'eat'];
  expect(findWords(board, words)).to.deep.equal(output);
}

// Test 2
{
  const board = [
    ['a', 'b'],
    ['c', 'd'],
  ];
  const words = ['abcb'];
  const output: string[] = [];
  expect(findWords(board, words)).to.deep.equal(output);
}

// Test 3
{
  const board = [
    ['o', 'a', 'b', 'n'],
    ['o', 't', 'a', 'e'],
    ['a', 'h', 'k', 'r'],
    ['a', 'f', 'l', 'v'],
  ];
  const words = ['oa', 'oaa'];
  const output: string[] = ['oa', 'oaa'];
  expect(findWords(board, words)).to.deep.equal(output);
}

// Test 4
{
  const board = [['a', 'a']];
  const words = ['aaa'];
  const output: string[] = [];
  expect(findWords(board, words)).to.deep.equal(output);
}

// Test 5
{
  const board = [
    ['a', 'b', 'c', 'e'],
    ['x', 'x', 'c', 'd'],
    ['x', 'x', 'b', 'a'],
  ];
  const words = ['abc', 'abcd'];
  const output = ['abc', 'abcd'];
  expect(findWords(board, words)).to.deep.equal(output);
}

// Test 6
{
  const board = [
    ['o', 'a', 'a', 'n'],
    ['e', 't', 'a', 'e'],
    ['i', 'h', 'k', 'r'],
    ['i', 'f', 'l', 'v'],
  ];
  const words = ['oath', 'pea', 'eat', 'rain', 'hklf', 'hf'];
  const output = ['oath', 'eat', 'hf', 'hklf'];
  expect(findWords(board, words)).to.deep.equal(output);
}

// Test 7
{
  const board = [
    ['a', 'b'],
    ['c', 'd'],
  ];
  const words = ['abdc', 'acdb'];
  const output = ['acdb', 'abdc'];
  expect(findWords(board, words)).to.deep.equal(output);
}
