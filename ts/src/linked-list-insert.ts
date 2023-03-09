class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

const h = new ListNode(30);
// 30

const p = new ListNode(15);
const q = new ListNode(67);
p.next = q;
// 15 -> 67

const next = p.next;
p.next = h;
h.next = next;

console.log(p);
