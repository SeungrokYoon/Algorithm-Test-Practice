class MinHeap {
  constructor(compareFunction) {
    this.heap = []
  }
  push(newValue) {
    this.heap.push(newValue)
    this.upheap()
  }
  upheap(childIndex = 0) {
    while (
      Math.floor((childIndex - 1) / 2) >= 0 &&
      this.heap[Math.floor((childIndex - 1) / 2)].cost > this.heap[childIndex].cost
    ) {
      const temp = this.heap[childIndex]
      this.heap[childIndex] = this.heap[Math.floor((childIndex - 1) / 2)]
      this.heap[Math.floor((childIndex - 1) / 2)] = temp
      childIndex = Math.floor((childIndex - 1) / 2)
    }
  }
  pop() {
    if (!this.heap.length) return null
    if (this.heap.length === 1) {
      return this.heap.pop()
    } else {
      const root = this.heap[0]
      this.heap[0] = this.heap[this.heap.length - 1]
      this.heap.pop()
      this.downheap()
      return root
    }
  }
  downheap(parentIndex = 0) {
    let childIndex = 2 * parentIndex + 1
    while (childIndex < this.heap.length) {
      if (
        childIndex + 1 < this.heap.length &&
        this.heap[childIndex].cost > this.heap[childIndex + 1].cost
      ) {
        childIndex++
      }
      if (this.heap[parentIndex].cost <= this.heap[childIndex].cost) break
      const temp = this.heap[childIndex]
      this.heap[childIndex] = this.heap[parentIndex]
      this.heap[parentIndex] = temp
      parentIndex = childIndex
    }
  }
  size() {
    return this.heap.length
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

//죽음의 구역 - 벽, 위험한 구역 - 생명이 1씩 소모, 자유로운 이동 구역
const weightGraph = Array.from({ length: 501 }, () => Array.from({ length: 501 }, () => 0))
const visitGrgph = Array.from({ length: 501 }, () => Array.from({ length: 501 }, () => false))
const N = input[0] * 1
const dangerousSpots = input.slice(1, 1 + N).map((s) => s.split(' ').map(Number))
const M = input[1 + N] * 1
const deadlySpots = input.slice(2 + N).map((s) => s.split(' ').map(Number))
const DANGEROUS = 1
const DEATH = -1

dangerousSpots.forEach((coordinates) => {
  const [x1, y1, x2, y2] = coordinates
  for (let row = Math.min(x1, x2); row <= Math.max(x1, x2); row++) {
    for (let col = Math.min(y1, y2); col <= Math.max(y1, y2); col++) {
      weightGraph[row][col] = DANGEROUS
    }
  }
})

deadlySpots.forEach((coordinates) => {
  const [x1, y1, x2, y2] = coordinates
  for (let row = Math.min(x1, x2); row <= Math.max(x1, x2); row++) {
    for (let col = Math.min(y1, y2); col <= Math.max(y1, y2); col++) {
      weightGraph[row][col] = DEATH
    }
  }
})

const overRange = (x, y) => {
  if (x < 0 || x > 500 || y < 0 || y > 500) return true
  return false
}

const solution = () => {
  const minHeap = new MinHeap()
  const dRow = [0, 1, 0, -1]
  const dCol = [1, 0, -1, 0]
  weightGraph[0][0] = 0
  visitGrgph[0][0] = true
  minHeap.push({ row: 0, col: 0, cost: weightGraph[0][0] })
  while (minHeap.size()) {
    const { row, col, cost } = minHeap.pop()
    for (let direction = 0; direction < 4; direction++) {
      const nRow = row + dRow[direction]
      const nCol = col + dCol[direction]
      if (overRange(nRow, nCol)) continue
      if (!visitGrgph[nRow][nCol] && weightGraph[nRow][nCol] !== DEATH) {
        visitGrgph[nRow][nCol] = true
        weightGraph[nRow][nCol] += cost
        minHeap.push({ row: nRow, col: nCol, cost: weightGraph[nRow][nCol] })
      }
    }
  }
  if (visitGrgph[500][500] === 0) return -1
  return weightGraph[500][500]
}

console.log(solution())
