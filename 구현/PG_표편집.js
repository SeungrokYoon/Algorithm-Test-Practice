class Node {
  constructor(value) {
    this.value = value
    this.previous = null
    this.next = null
  }
}

class LinkedList {
  constructor(n, k) {
    this.currentNode = null
    this.head = null
    this.tail = null
    this.deletedNodes = []
    this.generateLinkedNodes(n, k)
  }
  generateLinkedNodes(n, k) {
    for (let i = 0; i < n; i++) {
      const node = new Node(n)
      if (this.tail === null) {
        //첫 번째 노드
        this.head = node
      }
      if (k === i) this.currentNode = node
      this.tail.next = node
      node.previous = this.tail
      this.tail = node
    }
  }
  recoverDeletedNode(node) {
    const recoveredNode = this.deletedNodes.pop()
    const prevNode = recoveredNode.previous
    const nextNode = recoveredNode.next
    prevNode.next = recoveredNode
    if (nextNode !== null) nextNode.prevNode = recoveredNode
  }
  deleteCurrentNode(value) {
    const previousNode = this.currentNode.previous
    const nextNode = this.currentNode.next
    previousNode.next = nextNode
    nextNode.previous = previousNode
    this.deletedNodes.push(this.currentNode)
    this.currentNode = nextNode !== null ? nextNode : previousNode
  }
  moveDown(num) {
    for (let i = 0; i < num; i++) {
      this.currentNode = this.currentNode.previous
    }
  }
  moveUp(num) {
    for (let i = 0; i < num; i++) {
      this.currentNode = this.currentNode.next
    }
  }
}

const binarySearch = (arr, key) => {
  let start = 0
  let end = arr.length - 1
  const mid = Math.floor((start + end) / 2)
  if (arr[mid] === key) {
    return mid
  } else if (arr[mid] > key) {
    end = mid - 1
  } else {
    start = mid + 1
  }
  return -1
}

function solution(n, k, cmd) {
  var answer = ''
  const linkedList = new LinkedList(n, k)
  console.log(linkedList)
  for (const command of cmd) {
    const commandType = command[0]
    if (commandType === 'U') {
      const move = Number(command.split(' ')[1])
      linkedList.moveUp(move)
    } else if (commandType === 'D') {
      const move = Number(command.split(' ')[1])
      linkedList.moveDown(move)
    } else if (commandType === 'C') {
      linkedList.deleteCurrentNode()
    } else {
      //Z
      linkedList.recoverDeletedNode()
    }
  } //for
  return answer
} //solution

console.log(solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']))
