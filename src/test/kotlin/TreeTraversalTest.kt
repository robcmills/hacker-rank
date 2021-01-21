import org.junit.Test
import trees.BinaryNode
import trees.BinaryTree
import kotlin.test.assertEquals

class TreeTraversalTest {
        /*    a
            /   \
          b       c
         / \     / \
        d   e   f   g
         */
        fun getTree(): BinaryTree {
        return BinaryTree(BinaryNode(
            "a",
            left = BinaryNode("b", left = BinaryNode("d"), right = BinaryNode("e")),
            right = BinaryNode("c", left = BinaryNode("f"), right = BinaryNode("g"))
        ))
    }

    @Test
    fun testTraverseInOrder() {
        val tree = getTree()
        val result = mutableListOf<String>()
        tree.traverseInOrder({ node: BinaryNode -> result.add(node.value) })
        assertEquals("d b e a f c g", result.joinToString(" "))
    }

    @Test
    fun testTraversePostOrder() {
        val tree = getTree()
        val result = mutableListOf<String>()
        tree.traversePostOrder({ node: BinaryNode -> result.add(node.value) })
        assertEquals("d e b f g c a", result.joinToString(" "))
    }

    @Test
    fun testTraversePreOrder() {
        val tree = getTree()
        val result = mutableListOf<String>()
        tree.traversePreOrder({ node: BinaryNode -> result.add(node.value) })
        assertEquals("a b d e c f g", result.joinToString(" "))
    }

}