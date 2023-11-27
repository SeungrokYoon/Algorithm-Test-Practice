class MinHeap {
  constructor() {
    this.heap = []
  }
  push(n) {
    this.heap.push(n)
    this.upHeap(this.heap.length - 1)
  }
  upHeap(childIndex) {
    while (Math.floor((childIndex - 1) / 2) >= 0) {
      const parentIndex = Math.floor((childIndex - 1) / 2)
      if (this.formerIsSmaller(parentIndex, childIndex)) break
      const temp = this.heap[childIndex]
      this.heap[childIndex] = this.heap[parentIndex]
      this.heap[parentIndex] = temp
      childIndex = parentIndex
    }
  }
  pop() {
    if (this.size() === 0) return
    if (this.heap.length === 1) {
      const root = this.heap[0]
      this.heap.pop()
      return root
    }
    const root = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downHeap(0)
    return root
  }
  downHeap(parentIndex) {
    while (2 * parentIndex + 1 < this.heap.length) {
      let childIndex = 2 * parentIndex + 1
      childIndex + 1 < this.heap.length &&
        this.heap[childIndex + 1][1] < this.heap[childIndex][1] &&
        childIndex++
      if (this.formerIsSmaller(parentIndex, childIndex)) break
      const temp = this.heap[childIndex]
      this.heap[childIndex] = this.heap[parentIndex]
      this.heap[parentIndex] = temp
      parentIndex = childIndex
    }
  }
  print() {
    console.log(this.heap)
  }
  size() {
    return this.heap.length
  }
  formerIsSmaller(indexA, indexB) {
    return this.heap[indexA][1] < this.heap[indexB][1]
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const [N, M] = input[0]
const edges = input.slice(1)

const adjList = edges.reduce(
  (acc, curr) => {
    const [v1, v2, weight] = curr
    acc[v1].push({ v: v2, w: weight })
    acc[v2].push({ v: v1, w: weight })
    return acc
  },
  Array.from({ length: N + 1 }, () => []),
)

const memoizationTable = Array.from({ length: N + 1 }, () => Infinity)
memoizationTable[1] = 0

const minHeap = new MinHeap()
minHeap.push([1, 0])
while (minHeap.size()) {
  const [node, cost] = minHeap.pop()
  if (node === N) break
  if (memoizationTable[node] < cost) continue
  for (const { v, w } of adjList[node]) {
    const nCost = cost + w
    if (memoizationTable[v] > nCost) {
      memoizationTable[v] = nCost
      minHeap.push([v, nCost])
    }
  }
}

console.log(memoizationTable[N])
