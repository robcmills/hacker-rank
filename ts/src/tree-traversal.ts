// Depth First Search

function preOrder(node) { 
  console.log(node.val) 
  node.left && preOrder(node.left) 
  node.right && preOrder(node.right) 
} 

function inOrder(root) { 
   root.left && inOrder(root.left) 
   console.log(root.val) 
   root.right && inOrder(root.right) 
} 

function postOrder(node) { 
  node.left && postOrder(node.left) 
  node.right && postOrder(node.right) 
  console.log(node.val); 
} 
