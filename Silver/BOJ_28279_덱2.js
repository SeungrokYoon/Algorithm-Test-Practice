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
    return this.length
  }
  isEmpty() {
    return this.length === 0
  }
  printIsEmpty() {
    return this.isEmpty() ? 1 : 0
  }
  pushFront(value) {
    const nextNode = new Node(value)
    if (this.length === 0) {
      this.head = nextNode
      this.rear = nextNode
    } else {
      nextNode.next = this.head
      this.head.prev = nextNode
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
      nextNode.prev = this.rear
      this.rear.next = nextNode
      this.rear = nextNode
    }
    this.length++
  }
  popFront() {
    if (this.length > 1) {
      const poppedValue = this.head.value
      const next = this.head.next
      next.prev = null
      this.head = next
      this.length--
      return poppedValue
    } else if (this.length === 1) {
      const poppedValue = this.head.value
      this.head = null
      this.rear = null
      this.length--
      return poppedValue
    }
    return -1
  }
  popRear() {
    if (this.length > 1) {
      const poppedValue = this.rear.value
      const prev = this.rear.prev
      prev.next = null
      this.rear = prev
      this.length--
      return poppedValue
    } else if (this.length === 1) {
      const poppedValue = this.rear.value
      this.length--
      this.head = null
      this.rear = null
      return poppedValue
    }
    return -1
  }
  logFront() {
    return !this.isEmpty() ? this.head.value : -1
  }
  logRear() {
    return !this.isEmpty() ? this.rear.value : -1
  }
}

let answer = ''
const updateAnswer = (value) => {
  answer += value + '\n'
}

const deque = new Deque()
for (let i = 1; i < N + 1; i++) {
  const [cmd, value] = input[i].length > 1 ? input[i].split(' ').map(Number) : [+input[i], null]
  if (cmd === 1) {
    deque.pushFront(value)
  } else if (cmd === 2) {
    deque.pushRear(value)
  } else if (cmd === 3) {
    updateAnswer(deque.popFront())
  } else if (cmd === 4) {
    updateAnswer(deque.popRear())
  } else if (cmd === 5) {
    updateAnswer(deque.printLength())
  } else if (cmd === 6) {
    updateAnswer(deque.printIsEmpty())
  } else if (cmd === 7) {
    updateAnswer(deque.logFront())
  } else {
    updateAnswer(deque.logRear())
  }
}

console.log(answer.trim())
