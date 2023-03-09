import { expect } from 'chai';
import { listToArray } from './linked-list-to-array';
import { ListNode } from './ListNode';

/*
Write a function, addLists, that takes in the head of two linked lists, each representing a number. The ListNodes of the linked lists contain digits as values. The nodes in the input lists are reversed; this means that the least significant digit of the number is the head. The function should return the head of a new linked listed representing the sum of the input lists. The output list should have its digits reversed as well.

Say we wanted to compute 621 + 354 normally. The sum is 975:

   621
 + 354
 -----
   975

Then, the reversed linked list format of this problem would appear as:

    1 -> 2 -> 6
 +  4 -> 5 -> 3
 --------------
    5 -> 7 -> 9

*/
function addLists(a: ListNode, b: ListNode) {
  const n = parseNumber(a);
  const m = parseNumber(b);
  const sum = n + m;
  return listify(sum);
}

function listify(num: number) {
  const head = new ListNode(0);
  let tail = head;
  const s = String(num);
  for (let i = s.length - 1; i >= 0; i--) {
    tail.next = new ListNode(parseInt(s[i], 10));
    tail = tail.next;
  }
  return head.next;
}

function parseNumber(l: ListNode) {
  let num = 0;
  let factor = 1;
  let current: ListNode | null = l;
  while (current !== null) {
    num += current.val * factor;
    factor *= 10;
    current = current.next;
  }
  return num;
}

// test_00:
//   621
// + 354
// -----
//   975
{
  const a1 = new ListNode(1);
  const a2 = new ListNode(2);
  const a3 = new ListNode(6);
  a1.next = a2;
  a2.next = a3;
  // 1 -> 2 -> 6

  const b1 = new ListNode(4);
  const b2 = new ListNode(5);
  const b3 = new ListNode(3);
  b1.next = b2;
  b2.next = b3;
  // 4 -> 5 -> 3

  expect(listToArray(addLists(a1, b1))).to.deep.equal([5, 7, 9]);
}

// test_01:
//  7541
// +  32
// -----
//  7573
{
  const a1 = new ListNode(1);
  const a2 = new ListNode(4);
  const a3 = new ListNode(5);
  const a4 = new ListNode(7);
  a1.next = a2;
  a2.next = a3;
  a3.next = a4;
  // 1 -> 4 -> 5 -> 7

  const b1 = new ListNode(2);
  const b2 = new ListNode(3);
  b1.next = b2;
  // 2 -> 3

  expect(listToArray(addLists(a1, b1))).to.deep.equal([3, 7, 5, 7]);
}

// test_02:
//   39
// + 47
// ----
//   86
{
  const a1 = new ListNode(9);
  const a2 = new ListNode(3);
  a1.next = a2;
  // 9 -> 3

  const b1 = new ListNode(7);
  const b2 = new ListNode(4);
  b1.next = b2;
  // 7 -> 4

  expect(listToArray(addLists(a1, b1))).to.deep.equal([6, 8]);
}

// test_03:
//   89
// + 47
// ----
//  136
{
  const a1 = new ListNode(9);
  const a2 = new ListNode(8);
  a1.next = a2;
  // 9 -> 8

  const b1 = new ListNode(7);
  const b2 = new ListNode(4);
  b1.next = b2;
  // 7 -> 4

  expect(listToArray(addLists(a1, b1))).to.deep.equal([6, 3, 1]);
}

// test_04:
//   999
//  +  6
//  ----
//  1005
{
  const a1 = new ListNode(9);
  const a2 = new ListNode(9);
  const a3 = new ListNode(9);
  a1.next = a2;
  a2.next = a3;
  // 9 -> 9 -> 9

  const b1 = new ListNode(6);
  // 6

  expect(listToArray(addLists(a1, b1))).to.deep.equal([5, 0, 0, 1]);
}
