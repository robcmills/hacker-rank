import { type TrieNode } from './trie-prefix-tree';

export function depthFirstValues(trieNode: TrieNode) {
  let result: string[] = [];
  for (const child in trieNode.children) {
    result.push(child, ...depthFirstValues(trieNode.children[child]));
  }
  return result;
}
