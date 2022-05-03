class Node {
  constructor(value, x, y) {
    this.value = value
    this.x = x
    this.y = y
    this.left = null
    this.right = null
  }
}

class BinaryTree {
  constructor(rootNode) {
    this.root = rootNode
  }
  insert(newNode) {
    let currNode = this.root
    //마지막 노드 찾아가기
    while (currNode.y > newNode.y) {
      if (currNode.x < newNode.x) {
        if (currNode.right === null) {
          currNode.right = newNode
          break
        } else {
          currNode = currNode.right
        }
      } else {
        if (currNode.left === null) {
          currNode.left = newNode
          break
        } else {
          currNode = currNode.left
        }
      }
    }
  }
}

const preorder = (bTree, currNode, result) => {
  if (currNode) {
    result.push(currNode.value)
    preorder(bTree, currNode.left, result)
    preorder(bTree, currNode.right, result)
  }
}

const postorder = (bTree, currNode, result) => {
  if (currNode) {
    postorder(bTree, currNode.left, result)
    postorder(bTree, currNode.right, result)
    result.push(currNode.value)
  }
}

function solution(nodeinfo) {
  const answer = []
  //전위순회: root, left, right
  //후위순회: left, right, root
  //트리 만들기
  nodeinfo = nodeinfo.map((node, i) => ({ value: i + 1, x: node[0], y: node[1] }))
  nodeinfo.sort((prevNode, currNode) => currNode.y - prevNode.y)
  const root = new Node(nodeinfo[0].value, nodeinfo[0].x, nodeinfo[0].y)
  const binaryTree = new BinaryTree(root)
  for (let i = 1; i < nodeinfo.length; i++) {
    const { value, x, y } = nodeinfo[i]
    const newNode = new Node(value, x, y)
    binaryTree.insert(newNode)
  }
  const pre = []
  const post = []
  preorder(binaryTree, binaryTree.root, pre)
  postorder(binaryTree, binaryTree.root, post)
  answer.push(pre)
  answer.push(post)

  return answer
}
