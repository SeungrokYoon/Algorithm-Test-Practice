const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

class Node {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }
}
class Deque {
  constructor() {
    this.head = null
    this.rear = null
    this.size = 0
  }
  push_back(newNode) {
    this.size++
    if (this.head === null) {
      this.head = newNode
      this.rear = newNode
    } else {
      this.rear.next = newNode
      newNode.prev = this.rear
      this.rear = newNode
    }
  }
  pop_back() {
    const rear = this.rear.value
    if (this.size === 1) {
      this.head = null
      this.rear = null
    } else {
      this.rear = this.rear.prev
      this.rear.next = null
    }
    this.size--
    return rear
  }
  push_front(newNode) {
    if (this.size === 0) {
      this.head = newNode
    } else {
      this.head.prev = newNode
      newNode.next = this.head
      this.head = newNode
    }
    this.size++
  }
}

const N = +input[0]
const floorCards = input[1].split(' ').map(Number)
const deque = new Deque()

let cardNumber = 1
while (floorCards.length) {
  const latestCommand = floorCards.pop()
  if (latestCommand === 1) {
    deque.push_back(new Node(cardNumber))
  } else if (latestCommand === 2) {
    const top = deque.pop_back()
    deque.push_back(new Node(cardNumber))
    deque.push_back(new Node(top))
  } else {
    deque.push_front(new Node(cardNumber))
  }
  cardNumber++
}

let answer = ''
while (deque.size) {
  answer += deque.pop_back() + ' '
}

console.log(answer.trim())
