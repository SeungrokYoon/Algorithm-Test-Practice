class Node {
  constructor(position) {
    this.position = position
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
        return popped.position
      }
      this.head = this.head.next
      return popped.position
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
      return popped.position
    }
  }
  enqueue(position) {
    this.size += 1
    const node = new Node(position)
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

const MAX = 100001
const solution = (n, k) => {
  const table = new Array(MAX).fill(-1)
  const queue = new Deque()
  table[n] = 0
  queue.enqueue(n)
  while (queue.size >= 0) {
    const popped = queue.popFromLeft()
    const time = table[popped]
    if (popped === k) {
      break
    }
    if (table[popped - 1] === -1 && popped - 1 >= 0) {
      table[popped - 1] = time + 1
      queue.enqueue(popped - 1)
    }
    if (table[popped + 1] === -1 && popped + 1 < MAX) {
      table[popped + 1] = time + 1
      queue.enqueue(popped + 1)
    }
    if (table[popped * 2] === -1 && popped * 2 < MAX) {
      table[popped * 2] = time + 1
      queue.enqueue(popped * 2)
    }
  }
  return table[k]
}

console.log(solution(N, K))
