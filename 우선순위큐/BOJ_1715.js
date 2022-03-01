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
    while (this.heap[parseInt((pos - 1) / 2)] > this.heap[pos]) {
      const tmp = this.heap[pos]
      this.heap[pos] = this.heap[parseInt((pos - 1) / 2)]
      this.heap[parseInt((pos - 1) / 2)] = tmp
      pos = parseInt((pos - 1) / 2)
    }
  }
  downHeap(pos) {
    while (pos < Math.floor(this.heap.length / 2)) {
      let childIndex = pos * 2 + 1
      if (childIndex + 1 < this.heap.length && this.heap[childIndex] > this.heap[childIndex + 1])
        childIndex++
      if (this.heap[pos] <= this.heap[childIndex]) break
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[childIndex]
      this.heap[childIndex] = temp
      pos = childIndex
    }
  }
}

const [N, ...arr] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const solution = () => {
  let result = 0
  const minHeap = new MinHeap()
  for (let i = 0; i < N; i++) {
    minHeap.insert(arr[i])
  }
  while (minHeap.getSize() !== 1) {
    const count = minHeap.getMin() + minHeap.getMin()
    result += count
    minHeap.insert(count)
  }
  return result
}
console.log(solution())
