export class TreeNode<ValueType = any> {
  val: ValueType;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: ValueType) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
