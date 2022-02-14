class Node {
  constructor(position, time) {
    this.position = position
    this.time = time
    this.previous = null
    this.next = null
  }
}
class Deque {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }
  popFromLeft() {
    if (this.head !== null) {
      this.size -= 1
      const popped = this.head
      if (this.head === this.tail) {
        //원소가 하나일 떄
        this.head = null
        this.tail = null
        return popped
      }
      this.head = this.head.next
      return popped
    }
  }
  popFromRight() {
    if (this.head !== null) {
      this.size -= 1
      const popped = this.tail
      if (this.head === this.tail) {
        //원소가 하나일 떄
        this.head = null
        this.tail = null
        return popped
      }
      this.tail = this.tail.previous
      this.tail.next = null
      return popped
    }
  }
  enqueue(position, time) {
    this.size += 1
    const node = new Node(position, time)
    if (this.head === null) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.previous = this.tail
      this.tail = node
    }
  }
}

const [N, K] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const solution = (n, k) => {
  const deque = new Deque()
  deque.enqueue(n, 0)
  while (deque.size >= 0) {
    const poppedFromLeft = deque.popFromLeft()
    if (poppedFromLeft.position === k) return poppedFromLeft.time
    deque.enqueue(poppedFromLeft.position - 1, poppedFromLeft.time + 1)
    deque.enqueue(poppedFromLeft.position + 1, poppedFromLeft.time + 1)
    deque.enqueue(poppedFromLeft.position * 2, poppedFromLeft.time + 1)
  }
}

console.log(solution(N, K))
