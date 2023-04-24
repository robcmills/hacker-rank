export class DNode<ValueType = any> {
  public val: ValueType;
  public prev: DNode | null;
  public next: DNode | null;

  constructor(val: ValueType) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

export class Dequeue<ValueType = any> {
  private first: DNode | null;
  private last: DNode | null;
  private _size: number;

  constructor() {
    this.first = null;
    this.last = null;
    this._size = 0;
  }

  push(val: ValueType) {
    const newNode = new DNode(val);
    if (this._size === 0) {
      this.first = newNode;
    } else {
      const prev = this.last;
      if (prev) {
        prev.next = newNode;
        newNode.prev = prev;
      }
    }
    this.last = newNode;
    this._size += 1;
  }

  shift(): ValueType | null {
    if (this.first === null) return null;

    const val = this.first.val;

    if (this.first === this.last) {
      this.first = null;
      this.last = null;
    } else {
      if (this.first.next) this.first.next.prev = null;
      this.first = this.first.next;
    }

    this._size -= 1;
    return val;
  }

  size() {
    return this._size;
  }
}
