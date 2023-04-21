import { expect } from 'chai';

/*
269. Alien Dictionary
Hard

There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. 

You are given a list of strings `words` from the alien language's dictionary, where the strings in `words` are sorted lexicographically by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.

A string `s` is lexicographically smaller than a string `t` if at the first letter where they differ, the letter in `s` comes before the letter in `t` in the alien language. If the first `min(s.length, t.length)` letters are the same, then `s` is smaller if and only if `s.length < t.length`.

Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] consists of only lowercase English letters.


### Approach

The first step is to derive a list of directed edges from the list of words.
We can iterate through the words and compare each one to its following neighbor and derive edges based on differing characters.

For example if words = ['c', 'b'] then we know that c should come before b, so we can append that edge.

For words that start with the same prefix, we will have to iterate through them with two pointers until we find a differing character (or none if they are differing lengths).

For example if words = ['cud', 'cub'] then we know that d should come before b.
However if words = ['cu', 'cud'] then we can not derive an edge.

Edge case:
The problem description says that if there is no solution, to return an empty string. So we should assume that there is the possibility of an invalid words array. 
If words = ['cud', 'cu'] that is invalid since words that share the same prefix should be sorted such that the shorter string comes first. So we should check for this case.

Once we have all the edges we can derive, then we simply need to return a topological ordering of the graph (or "" if not possible (resulting graph has a cycle)).

*/
function alienDictionary(words: string[]): string {
  const edges: [string, string][] = [];

  for (let i = 0; i < words.length - 1; i++) {
    const wordA = words[i];
    const wordB = words[i + 1];

    // edge case where two words with same prefix are sorted such that the longer one comes first (invalid)
    const minLength = Math.min(wordA.length, wordB.length);
    if (wordA.length > wordB.length && wordA.startsWith(wordB)) {
      return '';
    }

    for (let j = 0; j < minLength; j++) {
      if (wordA[j] !== wordB[j]) {
        edges.push([wordA[j], wordB[j]]);
        break;
      }
    }
  }

  return topologicalOrder(edges);
}

function topologicalOrder(edges: [string, string][]): string {
  console.log({ edges });
  const result: string[] = [];

  const adjacents: { [parent: string]: string[] } = {};
  for (let [a, b] of edges) {
    if (!(a in adjacents)) adjacents[a] = [];
    adjacents[a].push(b);
    if (!(b in adjacents)) adjacents[b] = [];
  }

  const parentCounts: { [child: string]: number } = {};
  for (let node of Object.keys(adjacents)) {
    parentCounts[node] = 0;
  }
  for (let children of Object.values(adjacents)) {
    for (let child of children) {
      parentCounts[child] += 1;
    }
  }

  const stack = Object.keys(parentCounts).filter(
    (child) => parentCounts[child] === 0
  );
  while (stack.length > 0) {
    const current = stack.pop() as string;
    result.push(current);
    for (let child of adjacents[current]) {
      parentCounts[child] -= 1;
      if (parentCounts[child] === 0) stack.push(child);
    }
  }

  return result.join('');
}

// // Example 1
// {
//   const words = ['wrt', 'wrf', 'er', 'ett', 'rftt'];
//   const expected = 'wertf';
//   expect(alienDictionary(words)).to.equal(expected);
// }
//
// // Example 2
// {
//   const words = ['z', 'x'];
//   const expected = 'zx';
//   expect(alienDictionary(words)).to.equal(expected);
// }
//
// // Example 3:
// {
//   const words = ['z', 'x', 'z'];
//   const expected = '';
//   // Explanation: The order is invalid, so return "".
//   expect(alienDictionary(words)).to.equal(expected);
// }

// Example 4
{
  const words = ['z', 'z'];
  const expected = 'z';
  expect(alienDictionary(words)).to.equal(expected);
}
