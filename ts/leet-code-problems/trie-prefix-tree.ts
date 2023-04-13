import { expect } from 'chai';
import { depthFirstValues } from './depthFirstValues';

/*
https://leetcode.com/problems/implement-trie-prefix-tree/description/

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
*/

export class TrieNode {
  public children: Record<string, TrieNode>;
  public isEnd: boolean;

  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

export class Trie {
  public root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let current = this.root;
    for (const char of word) {
      if (!(char in current.children)) current.children[char] = new TrieNode();
      current = current.children[char];
    }
    current.isEnd = true;
  }

  search(word: string): boolean {
    let current = this.root;
    for (const char of word) {
      if (!(char in current.children)) return false;
      current = current.children[char];
    }
    return current.isEnd;
  }

  startsWith(prefix: string): boolean {
    let current = this.root;
    for (const char of prefix) {
      if (!(char in current.children)) return false;
      current = current.children[char];
    }
    return true;
  }
}

/* Test 1
             root
         ┌────┴────┐
         t         a
         │      ┌──┴──┐
         r      n     s
      ┌──┴──┐   │     │
      i     y   d     k
      │
      e
*/
{
  const trie = new Trie();
  trie.insert('trie');
  trie.insert('try');
  trie.insert('and');
  trie.insert('ask');
  expect(depthFirstValues(trie.root).join('')).to.deep.equal('trieyandsk');
}

/* Test 2 */
{
  const trie = new Trie();
  trie.insert('apple');
  expect(trie.search('apple')).to.equal(true);
  expect(trie.search('app')).to.equal(false);
  expect(trie.startsWith('app')).to.equal(true);
  trie.insert('app');
  expect(trie.search('app')).to.equal(true);
}
