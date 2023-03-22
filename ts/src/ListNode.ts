export class ListNode<ValueType = number> {
  val: ValueType;
  next: ListNode<ValueType> | null;

  constructor(val: ValueType) {
    this.val = val;
    this.next = null;
  }
}
