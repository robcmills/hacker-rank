import { expect } from 'chai';

/*
Write a function, linkedPalindrome, that takes in the head of a linked list as an argument. The function should return a boolean indicating whether or not the linked list is a palindrome. A palindrome is a sequence that is the same both forwards and backwards.
*/

class ListNode<ValueType> {
  val: ValueType;
  next: ListNode<ValueType> | null;

  constructor(val: ValueType) {
    this.val = val;
    this.next = null;
  }
}

function linkedPalindrome(head: ListNode<number> | null): boolean {
  return isPalindrome(getListValues(head));
}

function getListValues<ValueType>(
  head: ListNode<ValueType> | null
): ValueType[] {
  const values: ValueType[] = [];
  let current = head;

  while (current !== null) {
    values.push(current.val);
    current = current.next;
  }

  return values;
}

function isPalindrome(arr: any[]) {
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    if (arr[i] !== arr[j]) return false;
    i++;
    j--;
  }
  return true;
}

// test_00:
{
  const a = new ListNode(3);
  const b = new ListNode(2);
  const c = new ListNode(7);
  const d = new ListNode(7);
  const e = new ListNode(2);
  const f = new ListNode(3);

  a.next = b;
  b.next = c;
  c.next = d;
  d.next = e;
  e.next = f;

  // 3 -> 2 -> 7 -> 7 -> 2 -> 3
  expect(linkedPalindrome(a)).to.equal(true);
}

// test_01:
{
  const a = new ListNode(3);
  const b = new ListNode(2);
  const c = new ListNode(4);

  a.next = b;
  b.next = c;

  // 3 -> 2 -> 4
  expect(linkedPalindrome(a)).to.equal(false);
}

// test_02:
{
  const a = new ListNode(3);
  const b = new ListNode(2);
  const c = new ListNode(3);

  a.next = b;
  b.next = c;

  // 3 -> 2 -> 3
  expect(linkedPalindrome(a)).to.equal(true);
}

// test_03:
{
  const a = new ListNode(0);
  const b = new ListNode(1);
  const c = new ListNode(0);
  const d = new ListNode(1);
  const e = new ListNode(0);

  a.next = b;
  b.next = c;
  c.next = d;
  d.next = e;

  // 0 -> 1 -> 0 -> 1 -> 0
  expect(linkedPalindrome(a)).to.equal(true);
}

// test_04:
{
  const a = new ListNode(0);
  const b = new ListNode(1);
  const c = new ListNode(0);
  const d = new ListNode(1);
  const e = new ListNode(1);

  a.next = b;
  b.next = c;
  c.next = d;
  d.next = e;

  // 0 -> 1 -> 0 -> 1 -> 1
  expect(linkedPalindrome(a)).to.equal(false);
}

// test_05:
{
  const a = new ListNode(5);

  // 5
  expect(linkedPalindrome(a)).to.equal(true);
}

// test_06:
{
  expect(linkedPalindrome(null)).to.equal(true);
}
