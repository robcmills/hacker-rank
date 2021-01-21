package trees

class BinaryNode(val value: String, val left: BinaryNode? = null, val right: BinaryNode? = null)

class BinaryTree(val root: BinaryNode? = null) {
    // https://www.hackerrank.com/challenges/tree-height-of-a-binary-tree
    fun computeHeight(node: BinaryNode? = root, height: Int = 0): Int {
        if (node == null || node.left == null && node.right == null) return height
        val left = if (node.left != null) computeHeight(node.left, height + 1) else 0
        val right = if (node.right != null) computeHeight(node.right, height + 1) else 0
        return if (left > right) left else right
    }

    // https://www.hackerrank.com/challenges/tree-inorder-traversal
    fun traverseInOrder(onVisit: (node: BinaryNode) -> Unit, node: BinaryNode? = root): Unit {
        if (node == null) return
        if (node.left != null) traverseInOrder(onVisit, node.left)
        onVisit(node)
        if (node.right != null) traverseInOrder(onVisit, node.right)
    }

    // https://www.hackerrank.com/challenges/tree-postorder-traversal
    fun traversePostOrder(onVisit: (node: BinaryNode) -> Unit, node: BinaryNode? = root): Unit {
        if (node == null) return
        if (node.left != null) traversePostOrder(onVisit, node.left)
        if (node.right != null) traversePostOrder(onVisit, node.right)
        onVisit(node)
    }

    // https://www.hackerrank.com/challenges/tree-preorder-traversal
    fun traversePreOrder(onVisit: (node: BinaryNode) -> Unit, node: BinaryNode? = root): Unit {
        if (node == null) return
        onVisit(node)
        if (node.left != null) traversePreOrder(onVisit, node.left)
        if (node.right != null) traversePreOrder(onVisit, node.right)
    }

}
