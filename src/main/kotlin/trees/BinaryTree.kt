package trees

class BinaryNode(val value: String, val left: BinaryNode? = null, val right: BinaryNode? = null)

class BinaryTree(val root: BinaryNode? = null) {
    fun visitNodeInOrder(node: BinaryNode, visit: (node: BinaryNode) -> Unit) {
        if (node.left != null) visitNodeInOrder(node.left, visit)
        visit(node)
        if (node.right != null) visitNodeInOrder(node.right, visit)
    }

    fun visitNodePostOrder(node: BinaryNode, visit: (node: BinaryNode) -> Unit) {
        if (node.left != null) visitNodePostOrder(node.left, visit)
        if (node.right != null) visitNodePostOrder(node.right, visit)
        visit(node)
    }

    fun visitNodePreOrder(node: BinaryNode, visit: (node: BinaryNode) -> Unit) {
        visit(node)
        if (node.left != null) visitNodePreOrder(node.left, visit)
        if (node.right != null) visitNodePreOrder(node.right, visit)
    }

    fun traverseInOrder(visit: (node: BinaryNode) -> Unit): Unit {
        if (root == null) return
        visitNodeInOrder(root, visit)
    }

    fun traversePostOrder(visit: (node: BinaryNode) -> Unit): Unit {
        if (root == null) return
        visitNodePostOrder(root, visit)
    }

    fun traversePreOrder(visit: (node: BinaryNode) -> Unit): Unit {
        if (root == null) return
        visitNodePreOrder(root, visit)
    }
}
