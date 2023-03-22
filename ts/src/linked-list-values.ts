import { expect } from 'chai';
import { ListNode } from './ListNode';

/*
Write a function, linkedListValues, that takes in the head of a linked list as an argument. The function should return an array containing all values of the ListNodes in the linked list.

Hey. This is our first linked list problem, so you should be liberal with watching the Approach and Walkthrough. Be productive, not stubborn. -AZ
*/
export function linkedListValues(head: ListNode<string> | null): string[] {
  const result = [];
  let current: ListNode<string> | null = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// test_00:
{
  const a = new ListNode('a');
  const b = new ListNode('b');
  const c = new ListNode('c');
  const d = new ListNode('d');

  a.next = b;
  b.next = c;
  c.next = d;

  // a -> b -> c -> d

  expect(linkedListValues(a)).to.deep.equal(['a', 'b', 'c', 'd']);
}

// test_01:
{
  const x = new ListNode('x');
  const y = new ListNode('y');

  x.next = y;

  // x -> y

  expect(linkedListValues(x)).to.deep.equal(['x', 'y']);
}

// test_02:
{
  const q = new ListNode('q');

  // q

  expect(linkedListValues(q)).to.deep.equal(['q']);
}

// test_03:
{
  expect(linkedListValues(null)).to.deep.equal([]);
}
