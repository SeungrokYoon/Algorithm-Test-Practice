const data = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((l) => +l)

data.shift()

class AbsHeap {
  constructor() {
    this.heap = []
  }
  formerIsSmaller(idx1, idx2) {
    if (this.heap[idx1][0] < this.heap[idx2][0]) return true
    if (this.heap[idx1][0] === this.heap[idx2][0]) {
      return this.heap[idx1][1] < this.heap[idx2][1]
    }
    return false
  }
  push(v) {
    this.heap.push(v)
    this.upHeap()
  }
  pop() {
    if (this.heap.length === 0) return [0, 0]
    if (this.heap.length === 1) {
      return this.heap.pop()
    }
    const popped = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downHeap()
    return popped
  }
  upHeap() {
    let childIdx = this.heap.length - 1
    while (0 <= Math.floor((childIdx - 1) / 2)) {
      const parentIdx = Math.floor((childIdx - 1) / 2)
      if (this.formerIsSmaller(parentIdx, childIdx)) break
      ;[this.heap[childIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[childIdx]]
      childIdx = parentIdx
    }
  }
  downHeap() {
    let parentIdx = 0
    while (2 * parentIdx + 1 < this.heap.length) {
      let childIdx = 2 * parentIdx + 1
      2 * parentIdx + 2 < this.heap.length &&
        this.formerIsSmaller(2 * parentIdx + 2, 2 * parentIdx + 1) &&
        childIdx++
      if (this.formerIsSmaller(parentIdx, childIdx)) break
      ;[this.heap[childIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[childIdx]]
      parentIdx = childIdx
    }
  }
  print() {
    console.log(this.heap)
  }
}

const absHeap = new AbsHeap()
const answer = []
data.forEach((n) => {
  if (n === 0) {
    answer.push(absHeap.pop()[1])
  } else {
    absHeap.push([Math.abs(n), n])
  }
})

console.log(answer.join('\n'))
