import { expect } from 'chai';

/*
Write a function, tokenReplace, that takes in an object of tokens and a string. The function should return a new string where tokens are replaced.

Tokens are enclosed in a pair of '$'. You can assume that the input string is properly formatted. Tokens should be replaced from left to right in the string (see test_05).

### Approach

Use two pointers.

Complexity:

n = string length
Time: O(n)
Space: O(n)
*/
function tokenReplace(s: string, tokens: Record<string, string>): string {
  let r: string[] = [];
  let i = 0;
  let j = 1;

  while (j <= s.length) {
    if (s[i] !== '$') {
      r.push(s[i]);
      i++;
      j++;
    } else if (s[j] !== '$') {
      j++;
    } else {
      const token = s.slice(i, j + 1);
      r.push(tokens[token]);
      i = j + 1;
      j = i + 1;
    }
  }

  return r.join('');
}

// test_00:
{
  const tokens = {
    $LOCATION$: 'park',
    $ANIMAL$: 'dog',
  };
  expect(tokenReplace('Walk the $ANIMAL$ in the $LOCATION$!', tokens)).to.equal(
    'Walk the dog in the park!'
  );
}

// test_01:
{
  const tokens = {
    $ADJECTIVE$: 'quick',
    $VERB$: 'hopped',
    $DIRECTION$: 'North',
  };
  tokenReplace(
    'the $ADJECTIVE$ fox $VERB$ $ADJECTIVE$ly $DIRECTION$ward',
    tokens
  );
  // -> 'the quick fox hopped quickly Northward'
}

// test_02:
{
  const tokens = {
    $greeting$: 'hey programmer',
  };
  expect(tokenReplace('his greeting is always $greeting$.', tokens)).to.equal(
    'his greeting is always hey programmer.'
  );
}

// test_03:
{
  const tokens = {
    $A$: 'lions',
    $B$: 'tigers',
    $C$: 'bears',
  };
  expect(tokenReplace('$A$$B$$C$, oh my.', tokens)).to.equal(
    'lionstigersbears, oh my.'
  );
}

// test_04:
{
  const tokens = {
    $A$: 'lions',
    $B$: 'tigers',
    $C$: 'bears',
  };
  expect(tokenReplace('$B$', tokens)).to.equal('tigers');
}

// test_05:
{
  const tokens = {
    $second$: 'beta',
    $first$: 'alpha',
    $third$: 'gamma',
  };
  expect(tokenReplace('$first$second$third$', tokens)).to.equal(
    'alphasecondgamma'
  );
}
