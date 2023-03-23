import { expect } from 'chai';

/*
Write a function, wordle, that accepts a target string and
a guess string.
Both strings must be valid 5-letter words in English.
The function should return an array of colors that show
how close the guess was to the target word. 
The length of the return array should be 5, where each
element corresponds to a letter.

green: letter is in the word and in the correct spot
yellow: letter is in the word but in the wrong spot
red: letter is not in the word in any spot

*/
function wordle(word: string, guess: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < 5; i++) {
    if (guess[i] === word[i]) {
      result.push('green');
    } else if (word.includes(guess[i])) {
      result.push('yellow');
    } else {
      result.push('red');
    }
  }
  return result;
}

expect(wordle('weary', 'wrong')).to.deep.equal([
  'green',
  'yellow',
  'red',
  'red',
  'red',
]);
