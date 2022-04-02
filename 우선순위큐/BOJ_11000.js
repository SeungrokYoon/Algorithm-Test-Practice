const [[N], ...arr] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

class MinHeap {
  constructor() {
    this.heap = []
  }
  insert(value) {
    this.heap.push(value)
    this.upheap()
  }
  upheap(childIndex = this.heap.length - 1) {
    while (Math.floor((childIndex - 1) / 2) >= 0) {
      const parentIndex = Math.floor((childIndex - 1) / 2)
      if (this.heap[parentIndex] < this.heap[childIndex]) break
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[childIndex]
      this.heap[childIndex] = temp
      childIndex = parentIndex
    }
  }
  pop() {
    if (this.heap.length === 0) return null
    const root = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    if (this.heap.length === 1) {
      return root
    }
    this.downheap()
  }
  downheap(parentIndex = 0) {
    while (2 * parentIndex + 1 < this.heap.length) {
      let childIndex = 2 * parentIndex + 1
      if (childIndex + 1 < this.heap.length && this.heap[childIndex] > this.heap[childIndex + 1])
        childIndex++
      if (this.heap[parentIndex] < this.heap[childIndex]) break
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[childIndex]
      this.heap[childIndex] = temp
      parentIndex = childIndex
    }
  }
  top() {
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}

const lectures = arr.sort((a, b) => a[0] - b[0])

let maxClassCount = 0
let classCount = 1
const minHeap = new MinHeap()
minHeap.insert(lectures[0][1])
for (let i = 1; i < lectures.length; i++) {
  const [startTime, endTime] = lectures[i]
  while (startTime >= minHeap.top()) {
    minHeap.pop()
    classCount--
  }
  minHeap.insert(endTime)
  classCount++
  maxClassCount = Math.max(maxClassCount, classCount)
}

console.log(maxClassCount)
