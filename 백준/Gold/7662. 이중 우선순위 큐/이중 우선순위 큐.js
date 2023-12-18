class Heap {
  constructor(compareFunc) {
    this.heap = []
    this.compareFunc = compareFunc
  }
  compare(a, b) {
    return this.compareFunc(this.heap[a], this.heap[b])
  }
  push(n) {
    this.heap.push(n)
    let childIdx = this.heap.length - 1
    while (Math.floor((childIdx - 1) / 2) >= 0) {
      const parentIdx = Math.floor((childIdx - 1) / 2)
      if (this.compare(childIdx, parentIdx)) break
      ;[this.heap[parentIdx], this.heap[childIdx]] = [this.heap[childIdx], this.heap[parentIdx]]
      childIdx = parentIdx
    }
  }
  pop() {
    if (this.heap.length === 0) return null
    else if (this.heap.length === 1) {
      const popped = this.heap[0]
      this.heap.pop()
      return popped
    } else {
      const popped = this.heap[0]
      this.heap[0] = this.heap[this.heap.length - 1]
      this.heap.pop()
      let parentIdx = 0
      while (parentIdx * 2 + 1 < this.heap.length) {
        let childIdx = parentIdx * 2 + 1
        childIdx + 1 < this.heap.length && this.compare(childIdx, childIdx + 1) && childIdx++
        if (this.compare(childIdx, parentIdx)) break
        ;[this.heap[parentIdx], this.heap[childIdx]] = [this.heap[childIdx], this.heap[parentIdx]]
        parentIdx = childIdx
      }
      return popped
    }
  }
  isEmpty() {
    return this.heap.length === 0
  }
  reset() {
    this.heap = []
  }
  top() {
    return this.heap[0]
  }
}

class DoubleEndedPQueue {
  constructor() {
    this.maxHeap = new Heap((a, b) => a < b)
    this.minHeap = new Heap((a, b) => a > b)
    this.map = new Map()
  }
  push(value) {
    this.maxHeap.push(value)
    this.minHeap.push(value)
    const previous = this.map.get(value)
    previous ? this.map.set(value, previous + 1) : this.map.set(value, 1)
  }
  popMax() {
    const popped = this.maxHeap.pop()
    if (popped !== null) {
      const previous = this.map.get(popped)
      this.map.set(popped, previous - 1)
      this.clear()
    }
  }
  popMin() {
    const popped = this.minHeap.pop()
    if (popped !== null) {
      const previous = this.map.get(popped)
      this.map.set(popped, previous - 1)
      this.clear()
    }
  }
  topMax() {
    return this.maxHeap.top()
  }
  topMin() {
    return this.minHeap.top()
  }
  clear() {
    while (!this.minHeap.isEmpty() && !(this.map.get(this.minHeap.top()) > 0)) {
      this.minHeap.pop()
    }
    while (!this.maxHeap.isEmpty() && !(this.map.get(this.maxHeap.top()) > 0)) {
      this.maxHeap.pop()
    }
  }
  reset() {
    this.maxHeap.reset()
    this.minHeap.reset()
    this.map.clear()
  }
}

const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: process.platform === 'linux' ? process.stdin : fs.createReadStream('test/test.txt'),
  output: process.stdout,
  terminal: false,
})

const answer = []
const depq = new DoubleEndedPQueue()

let index = 0
let endLine = 0
rl.on('line', (line) => {
  if (index === 0) {
    index++
    return
  }
  if (index > endLine) {
    endLine = +line + index++
    depq.reset()
    return
  }
  let [cmd, value] = line.split(' ')
  value = Number(value)
  if (cmd === 'I') {
    depq.push(value)
  } else {
    if (value === 1) {
      depq.popMax()
    } else {
      depq.popMin()
    }
  }
  if (index === endLine) {
    depq.clear()
    depq.maxHeap.isEmpty() || depq.minHeap.isEmpty()
      ? answer.push('EMPTY')
      : answer.push([depq.topMax(), depq.topMin()].join(' '))
  }
  index++
})

rl.on('close', () => {
  console.log(answer.join('\n'))
})
