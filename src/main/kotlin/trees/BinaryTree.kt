package trees

import java.util.*
import kotlin.collections.HashMap

fun <E> LinkedList<E>.indexOf(predicate: (element: E) -> Boolean): Int {
    var index = 0
    for (e in this) {
        if (predicate(e)) return index
        index++
    }
    return -1
}

class BinaryNode(val value: String, val left: BinaryNode? = null, val right: BinaryNode? = null) {
    override fun toString(): String {
        return "BinaryNode value:$value"
    }
}

class BinaryTree(val root: BinaryNode? = null) {
    // https://www.hackerrank.com/challenges/tree-height-of-a-binary-tree
    fun computeHeight(node: BinaryNode? = root, height: Int = 0): Int {
        if (node == null || node.left == null && node.right == null) return height
        val left = if (node.left != null) computeHeight(node.left, height + 1) else 0
        val right = if (node.right != null) computeHeight(node.right, height + 1) else 0
        return if (left > right) left else right
    }

    class TopViewEntry(val node: BinaryNode, val index: Int, val depth: Int) {
        override fun toString(): String {
            return "TopViewEntry node:$node index:$index depth:$depth"
        }
    }

    fun computeTopView(
        list: LinkedList<TopViewEntry>,
        map: HashMap<Int, TopViewEntry>,
        node: BinaryNode,
        index: Int,
        depth: Int
    ) {
        val entry = map[index]
        if (entry == null || depth < entry.depth) {
            val entry = TopViewEntry(node, index, depth)
            val listIndex = list.indexOf { entry: TopViewEntry -> entry.index == index }
            if (listIndex < 0) {
                if (index <= 0) {
                    list.addFirst(entry)
                    map[index] = entry
                } else {
                    list.addLast(entry)
                    map[index] = entry
                }
            } else {
                list[listIndex] = entry
            }
        }
        if (node.left != null) computeTopView(list, map, node.left, index - 1, depth + 1)
        if (node.right != null) computeTopView(list, map, node.right, index + 1, depth + 1)
    }

    // https://www.hackerrank.com/challenges/tree-top-view
    fun traverseTopView(onVisit: (node: BinaryNode) -> Unit) {
        if (root == null) return
        val list = LinkedList<TopViewEntry>()
        val map = HashMap<Int, TopViewEntry>()
        computeTopView(list, map, root, 0, 0)
        for (entry in list) onVisit(entry.node)
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
