const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

class MaxHeap {
  constructor() {
    this.heap = []
  }
  push(value) {
    this.heap.push(value)
    let childIdx = this.heap.length - 1
    while (Math.floor((childIdx - 1) / 2) >= 0) {
      const parentIdx = Math.floor((childIdx - 1) / 2)
      if (this.heap[parentIdx] < this.heap[childIdx]) {
        ;[this.heap[parentIdx], this.heap[childIdx]] = [this.heap[childIdx], this.heap[parentIdx]]
        childIdx = parentIdx
      } else break
    }
  }
  popMax() {
    if (this.heap.length === 0) return -1
    if (this.heap.length === 1) return this.heap.pop()
    const popped = this.heap[0]
    this.heap[0] = this.heap.pop()
    let parentIdx = 0
    while (parentIdx * 2 + 1 < this.heap.length) {
      let childIdx = parentIdx * 2 + 1
      if (childIdx + 1 < this.heap.length && this.heap[childIdx] < this.heap[childIdx + 1])
        childIdx++
      if (this.heap[parentIdx] < this.heap[childIdx]) {
        ;[this.heap[parentIdx], this.heap[childIdx]] = [this.heap[childIdx], this.heap[parentIdx]]
        parentIdx = childIdx
      } else break
    }
    return popped
  }
}

const N = +input[0]
const answer = []
const maxHeap = new MaxHeap()
input.slice(1).map((l) => {
  if (l === '0') {
    answer.push(maxHeap.popMax())
  } else {
    const num = l.trim().split(' ').map(Number)
    num.slice(1).map((n) => {
      maxHeap.push(n)
    })
  }
})

console.log(answer.join('\n'))
