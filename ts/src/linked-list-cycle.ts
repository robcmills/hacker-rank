import { expect } from 'chai';

/*
Write a function, linkedListCycle, that takes in the head of a linked list as an argument. The function should return a boolean indicating whether or not the linked list contains a cycle.
*/
class ListNode<ValueType> {
  val: ValueType;
  next: ListNode<ValueType> | null;

  constructor(val: ValueType) {
    this.val = val;
    this.next = null;
  }
}

function linkedListCycle(head: ListNode<string> | null) {
  const visited = new Set<ListNode<string>>();
  let current = head;
  while (current !== null) {
    if (visited.has(current)) return true;
    visited.add(current);
    current = current.next;
  }
  return false;
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
  d.next = b; // cycle

  //         _______
  //       /        \
  // a -> b -> c -> d

  expect(linkedListCycle(a)).to.equal(true);
}

// test_01:
{
  const q = new ListNode('q');
  const r = new ListNode('r');
  const s = new ListNode('s');
  const t = new ListNode('t');
  const u = new ListNode('u');

  q.next = r;
  r.next = s;
  s.next = t;
  t.next = u;
  u.next = q; // cycle

  //    ________________
  //  /                 \
  // q -> r -> s -> t -> u

  expect(linkedListCycle(q)).to.equal(true);
}

// test_02;
{
  const a = new ListNode('a');
  const b = new ListNode('b');
  const c = new ListNode('c');
  const d = new ListNode('d');

  a.next = b;
  b.next = c;
  c.next = d;

  // a -> b -> c -> d

  expect(linkedListCycle(a)).to.equal(false);
}

// test_03:
{
  const q = new ListNode('q');
  const r = new ListNode('r');
  const s = new ListNode('s');
  const t = new ListNode('t');
  const u = new ListNode('u');

  q.next = r;
  r.next = s;
  s.next = t;
  t.next = u;
  u.next = t; // cycle

  //                   __
  //                 /   \
  // q -> r -> s -> t -> u

  expect(linkedListCycle(q)).to.equal(true);
}

// test_04:
{
  const p = new ListNode('p');

  // p

  expect(linkedListCycle(p)).to.equal(false);
}

// test_05:
{
  expect(linkedListCycle(null)).to.equal(false);
}
