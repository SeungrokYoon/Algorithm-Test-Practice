const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]

class Node {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }
}

class Deque {
  constructor() {
    this.length = 0
    this.head = null
    this.rear = null
  }
  printLength() {
    console.log(this.length)
  }
  isEmpty() {
    return this.length === 0
  }
  printIsEmpty() {
    console.log(this.isEmpty() ? 1 : 0)
  }
  pushFront(value) {
    const nextNode = new Node(value)
    if (this.length === 0) {
      this.head = nextNode
      this.rear = nextNode
    } else {
      this.head.prev = nextNode
      nextNode.next = this.head
      this.head = nextNode
    }
    this.length++
  }
  pushRear(value) {
    const nextNode = new Node(value)
    if (this.length === 0) {
      this.head = nextNode
      this.rear = nextNode
    } else {
      this.rear.next = nextNode
      nextNode.prev = this.rear
      this.rear = nextNode
    }
    this.length++
  }
  popFront() {
    if (!this.isEmpty()) {
      const popped = this.head
      const next = this.head.next
      next.prev = null
      this.head = next
      console.log(popped.value)
      this.length--
      return
    }
    console.log(-1)
  }
  popRear() {
    if (!this.isEmpty()) {
      const popped = this.rear
      const prev = this.rear.prev
      prev.next = null
      this.rear = prev
      console.log(popped.value)
      this.length--
      return
    }
    console.log(-1)
  }
  logFront() {
    console.log(!this.isEmpty() ? this.head.value : -1)
  }
  logRear() {
    console.log(!this.isEmpty() ? this.rear.value : -1)
  }
}

const deque = new Deque()
for (let i = 1; i < N + 1; i++) {
  const [cmd, value] = input[i].length > 1 ? input[i].split(' ').map(Number) : [+input[i], null]
  if (cmd === 1) {
    deque.pushFront(value)
  } else if (cmd === 2) {
    deque.pushRear(value)
  } else if (cmd === 3) {
    deque.popFront()
  } else if (cmd === 4) {
    deque.popRear()
  } else if (cmd === 5) {
    deque.printLength()
  } else if (cmd === 6) {
    deque.printIsEmpty()
  } else if (cmd === 7) {
    deque.logFront()
  } else {
    deque.logRear()
  }
}
