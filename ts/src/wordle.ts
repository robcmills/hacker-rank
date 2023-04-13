import { expect } from 'chai';
import { wordleDictionary } from './wordle-dictionary';

/*
Overview of the game of Wordle:

Attempt to guess a 5-letter word by guessing words. If you
correctly guess letters at the right location, those letters will be marked green.
If your guess word has a letter in the answer word but in the wrong location, those
letters will be marked yellow. You keep guessing words over-and-over until you have
all green letters.

Example Game:

If you are trying to guess "spare"

guess:  s-o-l-a-r
result: G _ _ Y Y

guess:  s-h-e-a-r
result: G _ Y Y Y

guess:  s-n-a-r-e
result: G _ G G G

guess:  s-p-a-r-e
result: G G G G G

You win!


## Part 1 of 3: buildGuessResult

Given an answer word and a guess word, return an array of length 5 that
determines the result of the guess. This array will return "G" for green if the
guessed letter is at the same index of the answer, "Y" for yellow if the guessed
string is in the answer (but not at the same index) and "_" otherwise.

Assume no word has multiple of the same letter (all letters in a word are unique).

const answer = "spare"
const guess = "solar"
buildGuessResult(answer, guess) => ["G", "_", "_", "Y", "Y"]

const answer = "piano"
const guess = "logic"
buildGuessResult(answer, guess) => ["_", "Y", "_", "Y", "_"]
*/
function buildGuessResult(answer: string, guess: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < 5; i++) {
    const guessChar = guess[i];
    const answerChar = answer[i];
    if (guessChar === answerChar) {
      result.push('G');
    } else if (answer.includes(guessChar)) {
      result.push('Y');
    } else {
      result.push('_');
    }
  }
  return result;
}

// Part 1 Tests
{
  expect(buildGuessResult('spare', 'solar')).to.deep.equal([
    'G',
    '_',
    '_',
    'Y',
    'Y',
  ]);
  expect(buildGuessResult('piano', 'logic')).to.deep.equal([
    '_',
    'Y',
    '_',
    'Y',
    '_',
  ]);
}

/*
## Part 2 of 3: guessAWord

This part is completely separate from part 1.

Write a function that takes three arguments and returns a new guess. The three
arguments to your function are: the last guessed word, the result of the last
guess, and a list of all possible words you can guess.

The guess must contain all "G" (green) letters in the correct location, and all
"Y" (yellow) letters in a different location than the previous guess.

If there are multiple possible choices to guess, select a word at random.

Assume no word has multiple of the same letter (all letters in a word are unique).

const priorGuess = "solar"
const priorResult = ["G", "_", "_", "Y", "Y"]
const dictionary = ["aback","abase","abate","abbey","abbot", ...]
guessAWord(priorGuess, priorResult, dictionary) => "scare"
(the guessed word could also be "spare" or some other word that works)

For now, don’t worry about runtime complexity.
*/
function guessAWord(
  priorGuess: string,
  priorResult: string[],
  dictionary: string[],
  prevGuesses = new Set<string>()
): string {
  let candidates = dictionary.filter((word) => {
    for (let i = 0; i < 5; i++) {
      const priorGuessChar = priorGuess[i];
      const priorResultChar = priorResult[i];
      const wordChar = word[i];
      if (priorResultChar === 'G' && priorGuessChar !== wordChar) {
        return false;
      }
      if (priorResultChar === 'Y' && !word.includes(priorGuessChar)) {
        return false;
      }
      if (priorResultChar === '_' && word.includes(priorGuessChar)) {
        return false;
      }
    }
    return true;
  });
  if (prevGuesses.size > 0) {
    candidates = candidates.filter((candidate) => !prevGuesses.has(candidate));
  }
  const guessIndex = Math.floor(Math.random() * (candidates.length - 1));
  return candidates[guessIndex];
}

// Part 2 Tests
{
  const candidates = new Set([
    'safer',
    'saner',
    'satyr',
    'scare',
    'scarf',
    'scary',
    'scram',
    'scrap',
    'shard',
    'share',
    'shark',
    'sharp',
    'shear',
    'smart',
    'smear',
    'snare',
    'spare',
    'spark',
    'spear',
    'spray',
    'stair',
    'stare',
    'stark',
    'strap',
    'straw',
    'stray',
    'sugar',
    'swarm',
    'swear',
  ]);
  const guess = guessAWord(
    'solar',
    ['G', '_', '_', 'Y', 'Y'],
    wordleDictionary
  );
  expect(candidates.has(guess)).to.equal(true);
}

/*
## Part 3 of 3: playWordle

Write a function that accepts an answer, a starting guess, and a list of words
in order to play the game of wordle. This function should return the number of
guesses the computer took to complete the problem as well as print out each guess
and guess result as it solves.

Assume no word has multiple of the same letter (all letters in a word are unique).

const dictionary = ["aback","abase","abate","abbey","abbot", ...]
const answer = "spare"
const firstGuess = "solar"
the output may look like:
playWordle(answer, firstGuess, dictionary) => 4 // this includes the starting guess
> saute
> snare
> spare
*/
function playWordle(
  answer: string,
  firstGuess: string,
  dictionary: string[]
): number {
  let guess = firstGuess;
  let guesses = new Set([guess]);
  while (guess !== answer) {
    const result = buildGuessResult(answer, guess);
    console.log({ guess, result });
    guess = guessAWord(guess, result, dictionary, guesses);
    guesses.add(guess);
  }
  return guesses.size;
}

// Part 3 Tests
{
  const answer = 'spare';
  const firstGuess = 'solar';
  console.log(playWordle(answer, firstGuess, wordleDictionary));
}
