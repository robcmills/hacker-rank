/*
### Binary Search Tree

- A node has at max 2 child nodes, left and right.
- Left node value is less than right node value.

Tree structure depends on insertion order.

O(n) time complexity


### AVL Tree

Balanced version of Binary Search Tree.

- The height of a node on one side differs at most by one from the other.
- Rebalances itself on insertion and removal of nodes.
- Fast lookups. Great for use cases that require frequent lookups
  and infrequent insertion or removal.

O(log n) time complexity


### Red Black Tree 

Not balanced (slower lookups), but faster for insertion and removal.
Superset of AVL tree. You can convert an AVL tree to red black.

- Every node is either black or red.
- Nodes are inserted as red and re-colored if necessary.
- Root node is always black.
- Leaf null nodes are always black.
- If a node is red, its child nodes must be black.
- All paths from any node to its null descendents
  go through the same amount of black nodes.

*/
