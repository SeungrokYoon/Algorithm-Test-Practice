class MinHeap {
  //인스턴스 생성 시에 compare함수를 같이 넘겨주어 매서드로 설정한다.
  //함수는 1급 객체이기 때문에 가능한 방법.
  //이렇게 하면 내부적으로 복잡한 객체의 프로퍼티로 비교를 진행할 때 로직 수정이 쉬워지고 확장성이 높아진다.
  constructor(compareFunction) {
    this.heap = []
    this.compare = compareFunction
  }
  push(newValue) {
    this.heap.push(newValue)
    this.upheap()
  }
  upheap(childIndex = this.heap.length - 1) {
    while (
      Math.floor((childIndex - 1) / 2) >= 0 &&
      this.compare(this.heap[childIndex], this.heap[Math.floor((childIndex - 1) / 2)])
    ) {
      const parentIndex = Math.floor((childIndex - 1) / 2)
      const temp = this.heap[childIndex]
      this.heap[childIndex] = this.heap[parentIndex]
      this.heap[parentIndex] = temp
      childIndex = parentIndex
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
    while (2 * parentIndex + 1 < this.heap.length) {
      let childIndex = 2 * parentIndex + 1
      if (
        childIndex + 1 < this.heap.length &&
        this.compare(this.heap[childIndex + 1], this.heap[childIndex])
      ) {
        childIndex++
      }
      if (!this.compare(this.heap[childIndex], this.heap[parentIndex])) break
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
const weightGraph = Array.from({ length: 501 }, () => Array.from({ length: 501 }, () => 0))
const visitGraph = Array.from({ length: 501 }, () => Array.from({ length: 501 }, () => false))
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

const isFirstSmaller = (first, second) => {
  if (first.cost < second.cost) return true
  return false
}

const solution = () => {
  const minHeap = new MinHeap(isFirstSmaller)
  const dRow = [0, 1, 0, -1]
  const dCol = [1, 0, -1, 0]
  weightGraph[0][0] = 0
  visitGraph[0][0] = true
  minHeap.push({ row: 0, col: 0, cost: 0 })
  while (minHeap.size()) {
    const { row, col, cost } = minHeap.pop()
    for (let direction = 0; direction < 4; direction++) {
      const nRow = row + dRow[direction]
      const nCol = col + dCol[direction]
      if (overRange(nRow, nCol)) continue
      if (!visitGraph[nRow][nCol] && weightGraph[nRow][nCol] !== DEATH) {
        visitGraph[nRow][nCol] = true
        weightGraph[nRow][nCol] += cost
        minHeap.push({ row: nRow, col: nCol, cost: weightGraph[nRow][nCol] })
      }
    }
  }
  return visitGraph[500][500] ? weightGraph[500][500] : -1
}

console.log(solution())
