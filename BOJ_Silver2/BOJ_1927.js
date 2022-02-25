class MinHeap {
  constructor() {
    this.heap = []
  }
  insert(v) {
    this.heap.push(v)
    this.upHeap(this.heap.length - 1)
  }
  getMin() {
    if (this.heap.length === 0) return 0
    if (this.heap.length === 1) {
      const min = this.heap[0]
      this.heap.pop()
      return min
    }
    const min = this.heap[0]
    const temp = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.heap[0] = temp
    this.downHeap(0)
    return min
  }
  print() {
    console.log(this.heap)
  }
  getSize() {
    return this.heap.length
  }
  upHeap(pos) {
    let parentIndex = parseInt((pos - 1) / 2)
    while (this.heap[parentIndex] > this.heap[pos]) {
      console.log(pos, parentIndex)
      const tmp = this.heap[pos]
      this.heap[pos] = this.heap[parentIndex]
      this.heap[parentIndex] = tmp
      pos = parentIndex
      parentIndex = parseInt((pos - 1) / 2)
    }
  }
  downHeap(pos) {
    let tmp = this.heap[pos],
      child
    while (pos < Math.floor(this.heap.length / 2)) {
      child = pos * 2 + 1
      if (child < this.heap.length && this.heap[child] > this.heap[child + 1]) child++
      if (tmp <= this.heap[child]) break
      this.heap[pos] = this.heap[child]
      pos = child
    }
    this.heap[pos] = tmp
  }
}

const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)
const N = input.shift()
const heap = new MinHeap()
let result = ''
for (let i = 0; i < N; i++) {
  const v = input[i]
  if (v === 0) {
    result += `${heap.getMin()}\n`
  } else {
    heap.insert(v)
  }
}
console.log(result.trim())
