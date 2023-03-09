import { ListNode } from './ListNode';

export function listToArray(list: ListNode | null): number[] {
  const array = [];
  let current: ListNode | null = list;
  while (current !== null) {
    array.push(current.val);
    current = current.next;
  }
  return array;
}
