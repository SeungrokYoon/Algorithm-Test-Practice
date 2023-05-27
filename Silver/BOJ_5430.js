const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const nTests = input.shift()

class Node {
  constructor(value) {
    this.value = value
    this.previous = null
    this.next = null
  }
  getNextNode({ direction }) {
    switch (direction) {
      case 1:
        return this.next
      default:
        return this.previous
    }
  }
}

class Deque {
  constructor(initArray) {
    this.direction = 1
    this.head = 0
    this.tail = 0
    this.size = 0
    this.error = 0
    this.init(initArray)
  }
  init(inintialArray) {
    inintialArray.map((value) => {
      this.addNode(value)
    })
  }
  addNode(value) {
    const size = this.size
    const newNode = new Node(value)
    if (size === 0) {
      this.head = newNode
      this.tail = newNode
    } else if (size === 1) {
      if (this.direction === 1) {
        newNode.previous = this.tail
        this.tail.next = newNode
        this.tail = newNode
      } else {
        newNode.next = this.head
        this.head.previous = newNode
        this.head = newNode
      }
    } else {
      if (this.direction === 1) {
        newNode.previous = this.tail
        this.tail.next = newNode
        this.tail = newNode
      } else {
        newNode.next = this.head
        this.head.previous = newNode
        this.head = newNode
      }
    }
    this.size += 1
  }
  deleteNode() {
    const size = this.size
    if (!size) {
      this.error = 1
    } else if (size === 1) {
      this.head = null
      this.tail = null
      this.size -= 1
    } else {
      if (this.direction === 1) {
        this.head = this.head.next
        this.head.previous = null
      } else {
        this.tail = this.tail.previous
        this.tail.next = null
      }
      this.size -= 1
    }
  }
  reverse() {
    this.direction *= -1
  }
  operateCommand({ command }) {
    for (const c of command) {
      if (this.error) {
        break
      }
      if (c === 'R') {
        this.reverse()
      } else if (c === 'D') {
        this.deleteNode()
      }
    }
  }
  display() {
    if (this.error) {
      console.log('error')
      return
    }
    const l = []
    let current = this.direction === 1 ? this.head : this.tail
    while (current) {
      l.push(current.value)
      current = current.getNextNode({ direction: this.direction })
    }
    console.log(l)
  }
}

for (let i = 0; i < input.length; i += 3) {
  const command = input[i]
  const n = input[i + 1]
  const initialArray = input[i + 2]
    .slice(1, -1)
    .split(',')
    .filter((s) => s.length)
    .map(Number)
  const deque = new Deque(initialArray)
  deque.operateCommand({ command })
  deque.display()
}
