// const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')
const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = input.shift()
let originalGraph = input.map((str) => str.split(' ').map((i) => +i))

class Node {
  constructor(newValue) {
    this.value = newValue
    this.previous = null
    this.next = null
  }
  print() {
    console.log(this.value, this.previous, this.next)
  }
}

class Deque {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }
  pushRight(newValue) {
    const node = new Node(newValue)
    if (this.head === null) {
      this.head = node
      this.tail = node
    } else {
      const previousTail = this.tail
      node.previous = previousTail
      previousTail.next = node
      this.tail = node
    }
    this.size++
  }
  popLeft() {
    if (!this.head) {
      return null
    } else {
      if (this.size === 0) {
        console.log('empty deque!')
        return null
      }
      const popped = this.head
      this.head = this.head.next
      if (this.head === null) {
        this.tail = null
      } else {
        this.head.previous = null
      }
      this.size--
      return popped.value
    }
  }
  popRight() {
    if (this.size === 0) {
      console.log('empty deque!')
      return null
    }
    const popped = this.tail
    if (this.tail.previous === null && this.tail.next === null) {
      this.head = null
      this.tail = null
    } else {
      this.tail = this.tail.previous
      this.tail.next = null
    }
    this.size--
    return popped.value
  }
  display() {
    let currentNode = this.head
    if (this.size === 0) {
      console.log('empty!')
      return
    }
    while (currentNode) {
      console.log('node value: ', currentNode.value)
      currentNode = currentNode.next
    }
  }
}

const get = (row, col) => {
  if (originalGraph[row][col] !== 0) {
    deque.pushRight(originalGraph[row][col])
    originalGraph[row][col] = 0
  }
}

const merge = (row, col, dRow, dCol){
  
}

const solution = (count) => {
  if (count === 5) {
    const max = 0
    return max
  }
  const memoizedGraph = []
  memoizedGraph.forEach((row) => memoizedGraph.push([...row]))

  for (let loop = 0; loop < 4; loop++) {
    move(loop)
    solution(count + 1)
    originalGraph = []
    memoizedGraph.forEach((row) => originalGraph.push([...row]))
  }
}

const deque = new Deque()
const result = solution(1)
