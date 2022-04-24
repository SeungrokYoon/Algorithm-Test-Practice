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
      const node = new Node(i)
      if (k === i) {
        this.currentNode = node
      }
      if (this.head === null) {
        //첫 번째 노드
        this.head = node
        this.tail = node
        continue
      }
      this.tail.next = node
      node.previous = this.tail
      this.tail = node
    }
  }
  recoverDeletedNode() {
    const recoveredNode = this.deletedNodes.pop()
    //prevNode, nextNode도 리스트에서 삭제된 친구들일 수도 있다.링크드 리스트는 그래도 괜춘
    //0,1,(2),(3),(4),5,6,7 이고, 4,3,2순서로 삭제되었을 때를 생각해보면
    //[4{prev:3,next:5},3{prev:2,next:5},2{prev:1,next:5}]
    const prevNode = recoveredNode.previous
    const nextNode = recoveredNode.next
    //head, tail, currentNode에 대한 갱신해야함
    if (prevNode) prevNode.next = recoveredNode
    if (nextNode) nextNode.previous = recoveredNode
    if (prevNode === this.tail) {
      this.tail = recoveredNode
    }
    if (nextNode === this.head) {
      this.head = recoveredNode
    }
  }
  deleteCurrentNode() {
    this.deletedNodes.push(this.currentNode)
    if (this.currentNode === this.head) {
      this.head = this.currentNode.next
      this.head.previous = null
      this.currentNode = this.head
    } else if (this.currentNode === this.tail) {
      this.tail = this.currentNode.previous
      this.tail.next = null
      this.currentNode = this.tail
    } else {
      const previousNode = this.currentNode.previous
      const nextNode = this.currentNode.next
      previousNode.next = nextNode
      nextNode.previous = previousNode
      this.currentNode = nextNode
    }
  }
  moveUp(num) {
    for (let i = 0; i < num; i++) {
      this.currentNode = this.currentNode.previous
    }
  }
  moveDown(num) {
    for (let i = 0; i < num; i++) {
      this.currentNode = this.currentNode.next
    }
  }
  printList() {
    let result = ''
    let cNode = this.head
    while (cNode !== null) {
      result += cNode.value + ' '
      cNode = cNode.next
    }
    console.log(result)
  }
  display(n) {
    const table = new Array(n).fill('X')
    let result = ''
    let cNode = this.head
    while (cNode !== null) {
      table[cNode.value] = 'O'
      cNode = cNode.next
    }
    result = table.join('')
    return result
  }
}

function solution(n, k, cmd) {
  var answer = ''
  const linkedList = new LinkedList(n, k)
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
      linkedList.recoverDeletedNode()
    }
    linkedList.display()
  } //for
  answer = linkedList.display(n)
  return answer
} //solution
