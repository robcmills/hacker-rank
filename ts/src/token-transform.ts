import { expect } from 'chai';

/*
Write a function, tokenTransform, that takes in an object of tokens and a string. In the object, the replacement values for a token may reference other tokens. The function should return a new string where tokens are replaced with their fully evaluated string values.

Tokens are enclosed in a pair of '$'.

You may assume that there are no circular token dependencies.
*/
type Graph = Record<string, string[]>;

function tokenTransform(s: string, tokens: Record<string, string>): string {
  const tokenGraph: Graph = {};
  for (let [key, val] of Object.entries(tokens)) {
    tokenGraph[key] = getTokens(val);
  }
  const topologicalOrderTokens = getTopologicalOrder(tokenGraph);
  for (let token of topologicalOrderTokens.reverse()) {
    tokens[token] = tokenReplace(tokens[token], tokens);
  }
  return tokenReplace(s, tokens);
}

function getTopologicalOrder(graph: Graph): string[] {
  const parents: Record<string, number> = {};
  for (let node in graph) {
    parents[node] = 0;
  }
  for (let parent in graph) {
    for (let child of graph[parent]) {
      parents[child] += 1;
    }
  }
  const topological: string[] = [];
  const stack = Object.keys(parents).filter((node) => parents[node] === 0);
  while (stack.length > 0) {
    const current = stack.pop() as string;
    topological.push(current);
    for (let child of graph[current]) {
      parents[child] -= 1;
      if (parents[child] === 0) stack.push(child);
    }
  }
  return topological;
}

function getTokens(s: string): string[] {
  const tokens = new Set<string>();
  let i = 0;
  let j = 1;

  while (j <= s.length) {
    if (s[i] !== '$') {
      i++;
      j++;
    } else if (s[j] !== '$') {
      j++;
    } else {
      const token = s.slice(i, j + 1);
      tokens.add(token);
      i = j + 1;
      j = i + 1;
    }
  }

  return Array.from(tokens);
}

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
    $LOCATION$: '$ANIMAL$ park',
    $ANIMAL$: 'dog',
  };
  expect(
    tokenTransform('Walk the $ANIMAL$ in the $LOCATION$!', tokens)
  ).to.equal('Walk the dog in the dog park!');
}

// test_01:
{
  const tokens = {
    $ADJECTIVE_1$: 'quick',
    $ADJECTIVE_2$: 'eager',
    $ADVERBS$: '$ADJECTIVE_1$ly and $ADJECTIVE_2$ly',
    $VERB$: 'hopped $DIRECTION$',
    $DIRECTION$: 'North',
  };
  expect(
    tokenTransform('the $ADJECTIVE_1$ fox $ADVERBS$ $VERB$ward', tokens)
  ).to.equal('the quick fox quickly and eagerly hopped Northward');
}

// test_02:
{
  const tokens = {
    $B$: 'epicly $C$',
    $A$: 'pretty $B$ problem $D$', // a →  b →  c
    $D$: 'we have', //                ↓
    $C$: 'clever', //                 d
  };
  expect(tokenTransform('What a $A$ here!', tokens)).to.equal(
    'What a pretty epicly clever problem we have here!'
  );
}

// test_03:
{
  const tokens = {
    $1$: 'a$2$',
    $2$: 'b$3$',
    $3$: 'c$4$',
    $4$: 'd$5$',
    $5$: 'e$6$',
    $6$: 'f!',
  };
  expect(tokenTransform('$1$ $1$ $1$ $1$ $1$ $1$ $4$ $4$', tokens)).to.equal(
    'abcdef! abcdef! abcdef! abcdef! abcdef! abcdef! def! def!'
  );
}

// test_04:
{
  const tokens = {
    $0$: '$1$$1$$1$$1$$1$$1$$1$$1$$1$$1$$1$$1$',
    $1$: '$2$$2$$2$$2$$2$$2$$2$$2$$2$',
    $2$: '$3$$3$$3$$3$$3$$3$$3$',
    $3$: '$4$$4$$4$$4$$4$$4$',
    $4$: '$5$$5$$5$$5$$5$',
    $5$: '$6$$6$$6$$6$',
    $6$: '$7$$7$$7$',
    $7$: '$8$$8$',
    $8$: '',
  };
  expect(tokenTransform('z$0$z$0$z$0$z$0$z$0$z$0$z', tokens)).to.equal(
    'zzzzzzz'
  );
}
