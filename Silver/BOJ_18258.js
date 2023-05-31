const [n, ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
    this.log = []
  }
  push(value) {
    const nextNode = new Node(value)
    if (this.size === 0) {
      this.head = nextNode
      this.tail = nextNode
    } else {
      this.tail.next = nextNode
      this.tail = nextNode
    }
    this.size++
  }
  pop() {
    if (this.size === 0) {
      this.log.push(-1)
    } else if (this.size === 1) {
      this.log.push(this.head.value)
      this.head = null
      this.tail = null
      this.size--
    } else {
      this.log.push(this.head.value)
      this.head = this.head.next
      this.size--
    }
  }
  getSize() {
    this.log.push(this.size)
  }
  empty() {
    this.log.push(Number(this.size === 0))
  }
  front() {
    if (this.head === null) {
      this.log.push(-1)
    } else {
      this.log.push(this.head.value)
    }
  }
  back() {
    if (this.head === null) {
      this.log.push(-1)
    } else {
      this.log.push(this.tail.value)
    }
  }
  getLog() {
    return this.log
  }
}

const queue = input.reduce((queue, command) => {
  const value = command.split(' ')[1] * 1
  switch (command) {
    case 'front':
      queue.front()
      break
    case 'back':
      queue.back()
      break
    case 'size':
      queue.getSize()
      break
    case 'empty':
      queue.empty()
      break
    case 'pop':
      queue.pop()
      break
    default:
      queue.push(value)
  }
  return queue
}, new Queue())

console.log(queue.getLog().join('\n'))
