package trees

class BinaryNode(val value: String, val left: BinaryNode? = null, val right: BinaryNode? = null)

class BinaryTree(val root: BinaryNode? = null) {
    // https://www.hackerrank.com/challenges/tree-height-of-a-binary-tree/problem
    fun computeHeight(node: BinaryNode? = root, height: Int = 0): Int {
        if (node == null || node.left == null && node.right == null) return height
        val left = if (node.left != null) computeHeight(node.left, height + 1) else 0
        val right = if (node.right != null) computeHeight(node.right, height + 1) else 0
        return if (left > right) left else right
    }

    // https://www.hackerrank.com/challenges/tree-inorder-traversal/problem
    fun traverseInOrder(onVisit: (node: BinaryNode) -> Unit, node: BinaryNode? = root): Unit {
        if (node == null) return
        if (node.left != null) traverseInOrder(onVisit, node.left)
        onVisit(node)
        if (node.right != null) traverseInOrder(onVisit, node.right)
    }

    fun traversePostOrder(onVisit: (node: BinaryNode) -> Unit): Unit {
        if (root == null) return
        visitNodePostOrder(root, onVisit)
    }

    fun traversePreOrder(onVisit: (node: BinaryNode) -> Unit): Unit {
        if (root == null) return
        visitNodePreOrder(root, onVisit)
    }

    fun visitNodePostOrder(node: BinaryNode, onVisit: (node: BinaryNode) -> Unit) {
        if (node.left != null) visitNodePostOrder(node.left, onVisit)
        if (node.right != null) visitNodePostOrder(node.right, onVisit)
        onVisit(node)
    }

    fun visitNodePreOrder(node: BinaryNode, onVisit: (node: BinaryNode) -> Unit) {
        onVisit(node)
        if (node.left != null) visitNodePreOrder(node.left, onVisit)
        if (node.right != null) visitNodePreOrder(node.right, onVisit)
    }

}
