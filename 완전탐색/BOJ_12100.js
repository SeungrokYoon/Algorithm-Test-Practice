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

const move = (direction) => {
  if (direction === 0) {
    // 아래에서 위로 합침
    for (let col = 0; col < N; col++) {
      for (let row = 0; row < N; row++) {
        get(row, col)
      }
      merge(0, col, 1, 0)
    }
  } else if (direction === 1) {
    // 위에서 아래로 합침
    for (let col = 0; col < N; col++) {
      for (let row = N - 1; row >= 0; row--) {
        get(row, col)
      }
      merge(N - 1, col, -1, 0)
    }
  } else if (direction === 2) {
    // 오른쪽에서 왼쪽으로 합침
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        get(row, col)
      }
      merge(row, 0, 0, 1)
    }
  } else {
    // 왼쪽에서 오른쪽으로 합침
    for (let row = 0; row < N; row++) {
      for (let col = N - 1; col >= 0; col--) {
        get(row, col)
      }
      merge(row, N - 1, 0, 1)
    }
  }
}

const get = (row, col) => {
  if (originalGraph[row][col] !== 0) {
    deque.pushRight(originalGraph[row][col])
    originalGraph[row][col] = 0
  }
}

const merge = (row, col, dRow, dCol) => {
  while (deque.size) {
    const popped = deque.popLeft()
    if (!originalGraph[row][col]) {
      originalGraph[row][col] = popped
    } else if (originalGraph[row][col] === popped) {
      originalGraph[row][col] = 2 * popped
      row = row + dRow
      col = col + dCol
    } else {
      row = row + dRow
      col = col + dCol
      originalGraph[row][col] = popped
    }
  }
}

const solution = (count) => {
  if (count === 1) {
    for (const i of Array(N).keys()) {
      answer = Math.max(answer, Math.max(...originalGraph[i]))
    }
    return
  }
  const memoizedGraph = []
  originalGraph.forEach((row) => memoizedGraph.push([...row]))

  for (let loop = 0; loop < 4; loop++) {
    move(loop)
    solution(count + 1)
    originalGraph = []
    memoizedGraph.forEach((row) => originalGraph.push([...row]))
  }
}

let answer = 0
const deque = new Deque()
solution(0)
console.log(answer)
