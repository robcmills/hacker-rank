import { expect } from 'chai';
import { TrieNode } from './trie-prefix-tree';

/*
https://leetcode.com/problems/design-add-and-search-words-data-structure/

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise.
word may contain dots '.' where dots can be matched with any letter.

*/
class WordDictionary {
  public root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addWord(word: string): void {
    let current = this.root;
    for (const char of word) {
      if (!(char in current.children)) current.children[char] = new TrieNode();
      current = current.children[char];
    }
    current.isEnd = true;
  }

  search(word: string): boolean {
    const dfs = (j: number, root: TrieNode) => {
      let current = root;
      for (let i = j; i < word.length; i++) {
        const char = word[i];
        if (char === '.') {
          for (const child of Object.values(current.children)) {
            if (dfs(i + 1, child)) return true;
          }
          return false;
        } else {
          if (!(char in current.children)) return false;
          current = current.children[char];
        }
      }
      return current.isEnd;
    };
    return dfs(0, this.root);
  }
}

// Test 1
{
  const wordDictionary = new WordDictionary();
  wordDictionary.addWord('bad');
  wordDictionary.addWord('dad');
  wordDictionary.addWord('mad');
  expect(wordDictionary.search('pad')).to.equal(false);
  expect(wordDictionary.search('bad')).to.equal(true);
  expect(wordDictionary.search('.ad')).to.equal(true);
  expect(wordDictionary.search('b..')).to.equal(true);
  expect(wordDictionary.search('b.')).to.equal(false);
}
