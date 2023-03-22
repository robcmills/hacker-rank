import { expect } from 'chai';
import { linkedListValues } from './linked-list-values';
import { ListNode } from './ListNode';

/*
Write a function, reverseList, that takes in the head of a linked list as an argument. The function should reverse the order of the ListNodes in the linked list in-place and return the new head of the reversed linked list.
*/
function reverseList(head: ListNode<string>): ListNode<string> {
  let current: ListNode<string> | null = head;
  let previous = null;
  let next = null;
  while (current !== null) {
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  return previous!;
}

// test_00:
{
  const a = new ListNode<string>('a');
  const b = new ListNode<string>('b');
  const c = new ListNode<string>('c');
  const d = new ListNode<string>('d');
  const e = new ListNode<string>('e');
  const f = new ListNode<string>('f');

  a.next = b;
  b.next = c;
  c.next = d;
  d.next = e;
  e.next = f;

  // a -> b -> c -> d -> e -> f

  expect(linkedListValues(reverseList(a))).to.deep.equal([
    'f',
    'e',
    'd',
    'c',
    'b',
    'a',
  ]);
}

// test_01:
{
  const x = new ListNode<string>('x');
  const y = new ListNode<string>('y');

  x.next = y;

  // x -> y

  expect(linkedListValues(reverseList(x))).to.deep.equal(['y', 'x']);
}

// test_02:
{
  const p = new ListNode<string>('p');

  // p

  expect(linkedListValues(reverseList(p))).to.deep.equal(['p']);
}
