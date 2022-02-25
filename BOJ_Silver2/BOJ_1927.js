class MinHeap {
  constructor() {
    this.heap = []
    this.size = 0
  }
  insert(v) {
    this.heap.push(v)
    this.size += 1
    this.upHeap(this.size - 1)
  }
  getMin() {
    if (this.size === 0) return 0
    if (this.size === 1) {
      const min = this.heap[0]
      this.size -= 1
      this.heap.pop()
      return min
    }
    const min = this.heap[0]
    const temp = this.heap[this.size - 1]
    this.heap.pop()
    this.size -= 1
    this.heap[0] = temp
    this.downHeap(0)
    return min
  }
  print() {
    console.log(this.heap)
  }
  getSize() {
    return this.size
  }
  upHeap(index) {
    if (index === 0) return
    const parentIndex = Math.floor(index / 2)
    if (this.heap[parentIndex] > this.heap[index]) {
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[index]
      this.heap[index] = temp
      this.upHeap(parentIndex)
    }
  }
  downHeap(index) {
    const leftChildIndex = 2 * index + 1
    const rightChildIndex = 2 * index + 2
    let nextIndex = index
    //더 작은 child 찾아주기
    if (leftChildIndex < this.size && rightChildIndex < this.size) {
      if (
        this.heap[leftChildIndex] <= this.heap[rightChildIndex] &&
        this.heap[leftChildIndex] < this.heap[index]
      ) {
        nextIndex = leftChildIndex
      } else if (
        this.heap[leftChildIndex] >= this.heap[rightChildIndex] &&
        this.heap[rightChildIndex] < this.heap[index]
      ) {
        nextIndex = rightChildIndex
      } else {
        return
      }
    } else if (leftChildIndex < this.size && rightChildIndex >= this.size) {
      if (this.heap[leftChildIndex] < this.heap[index]) {
        nextIndex = leftChildIndex
      } else {
        return
      }
    } else {
      //왼쪽은 안되는데 오른쪽이 될 리는 없음
      return
    }
    const temp = this.heap[nextIndex]
    this.heap[nextIndex] = this.heap[index]
    this.heap[index] = temp
    this.downHeap(nextIndex)
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
