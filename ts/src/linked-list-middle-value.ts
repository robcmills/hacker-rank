import { expect } from 'chai';

/*
Write a function, middleValue, that takes in the head of a linked list as an argument. The function should return the value of the middle ListNode in the linked list. If the linked list has an even number of nodes, then return the value of the second middle node.

You may assume that the input list is non-empty.
*/

class ListNode<ValueType> {
  val: ValueType;
  next: ListNode<ValueType> | null;

  constructor(val: ValueType) {
    this.val = val;
    this.next = null;
  }
}

function middleValue(head: ListNode<string>): string {
  if (head.next === null) return head.val;

  let mid: ListNode<string> | null = head;
  let last: ListNode<string> | null = head;

  while (last !== null && last.next !== null) {
    mid = mid!.next;
    last = last.next.next;
  }

  return mid!.val;
}

// test_00:
{
  const a = new ListNode('a');
  const b = new ListNode('b');
  const c = new ListNode('c');
  const d = new ListNode('d');
  const e = new ListNode('e');

  a.next = b;
  b.next = c;
  c.next = d;
  d.next = e;

  // a -> b -> c -> d -> e
  expect(middleValue(a)).to.equal('c');
}

// test_01:
{
  const a = new ListNode('a');
  const b = new ListNode('b');
  const c = new ListNode('c');
  const d = new ListNode('d');
  const e = new ListNode('e');
  const f = new ListNode('f');

  a.next = b;
  b.next = c;
  c.next = d;
  d.next = e;
  e.next = f;

  // a -> b -> c -> d -> e -> f
  expect(middleValue(a)).to.equal('d');
}

// test_02:
{
  const x = new ListNode('x');
  const y = new ListNode('y');
  const z = new ListNode('z');

  x.next = y;
  y.next = z;

  // x -> y -> z
  expect(middleValue(x)).to.equal('y');
}

// test_03:
{
  const x = new ListNode('x');
  const y = new ListNode('y');

  x.next = y;

  // x -> y
  expect(middleValue(x)).to.equal('y');
}

// test_04:
{
  const q = new ListNode('q');

  // q
  expect(middleValue(q)).to.equal('q');
}
