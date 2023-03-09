import { expect } from 'chai';
import { listToArray } from './linked-list-to-array';

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

/*
Write a function, mergeLists, that takes in the head of two sorted linked lists as arguments. The function should merge the two lists together into single sorted linked list. The function should return the head of the merged linked list.

Do this in-place, by mutating the original ListNodes.

You may assume that both input lists are non-empty and contain increasing sorted numbers.

### Approach

Create a "dummy" head from which to construct new list (c),
and three pointers: a, b (args), and c (new)
While nodes exist in both arg lists, append the smaller
head to the new list.
Once one of the lists is exhausted, append rest of
remaining list.

 a = 5 -> 7 -> 10 -> 12 -> 20 -> 28
                                 ^currentA
 b = 6 -> 8 -> 9 -> 25 -> null
                          ^currentB
 c -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 12 -> 20 -> 25
                                                 ^currentC

*/
function mergeLists(a: ListNode, b: ListNode): ListNode | null {
  let c = new ListNode(0);
  let currentA: ListNode | null = a;
  let currentB: ListNode | null = b;
  let currentC = c;

  while (currentA !== null && currentB !== null) {
    if (currentA.val < currentB.val) {
      currentC.next = currentA;
      currentA = currentA.next;
    } else {
      currentC.next = currentB;
      currentB = currentB.next;
    }
    currentC = currentC.next;
  }

  if (currentA === null) currentC.next = currentB;
  if (currentB === null) currentC.next = currentA;

  return c.next;
}

// test_00:
{
  const a = new ListNode(5);
  const b = new ListNode(7);
  const c = new ListNode(10);
  const d = new ListNode(12);
  const e = new ListNode(20);
  const f = new ListNode(28);
  a.next = b;
  b.next = c;
  c.next = d;
  d.next = e;
  e.next = f;
  // 5 -> 7 -> 10 -> 12 -> 20 -> 28

  const q = new ListNode(6);
  const r = new ListNode(8);
  const s = new ListNode(9);
  const t = new ListNode(25);
  q.next = r;
  r.next = s;
  s.next = t;
  // 6 -> 8 -> 9 -> 25

  expect(listToArray(mergeLists(a, q))).to.deep.equal([
    5, 6, 7, 8, 9, 10, 12, 20, 25, 28,
  ]);
}

// test_01:
{
  const a = new ListNode(5);
  const b = new ListNode(7);
  const c = new ListNode(10);
  const d = new ListNode(12);
  const e = new ListNode(20);
  const f = new ListNode(28);
  a.next = b;
  b.next = c;
  c.next = d;
  d.next = e;
  e.next = f;
  // 5 -> 7 -> 10 -> 12 -> 20 -> 28

  const q = new ListNode(1);
  const r = new ListNode(8);
  const s = new ListNode(9);
  const t = new ListNode(10);
  q.next = r;
  r.next = s;
  s.next = t;
  // 1 -> 8 -> 9 -> 10

  expect(listToArray(mergeLists(a, q))).to.deep.equal([
    1, 5, 7, 8, 9, 10, 10, 12, 20, 28,
  ]);
}

// test_02:
{
  const h = new ListNode(30);
  // 30

  const p = new ListNode(15);
  const q = new ListNode(67);
  p.next = q;
  // 15 -> 67

  expect(listToArray(mergeLists(h, p))).to.deep.equal([15, 30, 67]);
}


