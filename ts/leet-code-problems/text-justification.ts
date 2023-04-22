import { expect } from 'chai';

/*
68. Text Justification
Hard
2.3K
3.4K
company
Airbnb
company
Google
company
LinkedIn

Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space characters only.
Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
The input array words contains at least one word.
 
Constraints:

1 <= words.length <= 300
1 <= words[i].length <= 20
words[i] consists of only English letters and symbols.
1 <= maxWidth <= 100
words[i].length <= maxWidth

### Approach

Iterate the words array and build our lines one at a time.
We will just run a loop, that packs words into the current line as long as they will fit, keeping track of the width and respecting maxWidth.
Once our line is full, we add the extra spacing as neccessary, push it into our result and continue to the next line.

*/
function fullJustify(words: string[], maxWidth: number): string[] {
  const result: string[] = [];

  let currentLine: string[] = [];

  for (const word of words) {
    const canFit = [...currentLine, word].join(' ').length <= maxWidth;
    if (canFit) {
      currentLine.push(word);
    } else {
      result.push(justifyLine(currentLine, maxWidth));
      currentLine = [word];
    }
  }
  // Add any "leftover" words.
  if (currentLine.length) {
    result.push(justifyLineLeft(currentLine, maxWidth));
  }

  return result;
}

function justifyLine(words: string[], width: number): string {
  const wordsLength = words.join('').length;
  const diff = width - wordsLength;
  if (words.length === 1) {
    return words[0] + Array(diff).fill(' ').join('');
  }
  const numGaps = words.length - 1;
  const paddingLength = Math.floor(diff / numGaps);
  const padding = Array(paddingLength).fill(' ').join('');
  const remainder = diff % numGaps;
  for (let r = 0; r < remainder; r++) {
    words[r] += ' ';
  }
  return words.join(padding);
}

function justifyLineLeft(words: string[], width: number): string {
  const wordsLength = words.join(' ').length;
  const diff = width - wordsLength;
  return words.join(' ') + Array(diff).fill(' ').join('');
}

// justifyLine test
{
  expect(justifyLine(['This', 'is', 'an'], 16)).to.equal('This    is    an');
  expect(justifyLine(['example', 'of', 'text'], 16)).to.equal(
    'example  of text'
  );
  expect(justifyLine(['justification.'], 16)).to.equal('justification.  ');
  expect(justifyLineLeft(['shall', 'be'], 16)).to.equal('shall be        ');
}

// Example 1:
{
  const words = ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'];
  const maxWidth = 16;
  const expected = ['This    is    an', 'example  of text', 'justification.  '];
  expect(fullJustify(words, maxWidth)).to.deep.equal(expected);
}

// Example 2:
{
  const words = ['What', 'must', 'be', 'acknowledgment', 'shall', 'be'];
  const maxWidth = 16;
  const expected = ['What   must   be', 'acknowledgment  ', 'shall be        '];
  expect(fullJustify(words, maxWidth)).to.deep.equal(expected);
  // Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
  // Note that the second line is also left-justified because it contains only one word.
}

// Example 3:
{
  const words = [
    'Science',
    'is',
    'what',
    'we',
    'understand',
    'well',
    'enough',
    'to',
    'explain',
    'to',
    'a',
    'computer.',
    'Art',
    'is',
    'everything',
    'else',
    'we',
    'do',
  ];
  const maxWidth = 20;
  const expected = [
    'Science  is  what we',
    'understand      well',
    'enough to explain to',
    'a  computer.  Art is',
    'everything  else  we',
    'do                  ',
  ];
  expect(fullJustify(words, maxWidth)).to.deep.equal(expected);
}
