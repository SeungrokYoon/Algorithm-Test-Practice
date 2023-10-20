const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : __dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

input.shift()

class MinHeap {
  constructor() {
    this.heap = []
  }
  insert(num) {
    this.heap.push(num)
    this.upHeap()
  }
  upHeap() {
    if (this.heap.length === 1) return
    let currIdx = this.heap.length - 1
    while (currIdx > 0) {
      const parentIdx = Math.floor(this.heap / 2) - 1
      const parentNode = this.heap[parentIdx]
      const childNode = this.heap[currIdx]
      if (parentNode > childNode) {
        const temp = parentNode
        this.heap[parentIdx] = childNode
        this.heap[currIdx] = temp
        currIdx = parentIdx
      } else {
        break
      }
    }
  }
  pop() {
    if (this.isEmpty()) {
      console.log('Empty heap')
      return null
    }
    const popped = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downHeap()
    return popped
  }
  downHeap() {
    if (this.isEmpty() || this.heap.length === 1) return
    let currIdx = 0
    while (currIdx < this.heap.length) {
      const leftChildIdx = 2 * currIdx - 1
      const rightChildIdx = 2 * currIdx
      const childIdx =
        this.heap[leftChildIdx] < this.heap[rightChildIdx] ? leftChildIdx : rightChildIdx
      const parentNode = this.heap[currIdx]
      const childNode = this.heap[childIdx]
      if (parentNode > childNode) {
        const temp = parentNode
        this.heap[currIdx] = childNode
        this.heap[childIdx] = temp
      } else {
        break
      }
    }
  }
  isEmpty() {
    return this.heap.length === 0
  }
}

function solution(start, end, matrix) {
  const dpTable = [...matrix[start]]
  const minHeap = new MinHeap()
  const visited = Array.from({ length: matrix.length + 1 }, () => false)
  visited[0] = true
  visited[start] = true

  while (visited.some((el) => el === false)) {
    //find the lest dist vertex
  }
}

const getAnswer = () => {
  const answer = []
  const data = input.map((l) => l.split(' ').map(Number))

  let currI = 0
  while (currI < data.length) {
    const [N, M, S, D] = data[currI]
    const intersections = data.slice(currI, currI + M + 1)
    const adjMatrix = Array.from({ length: N }, (_, i) =>
      Array.from({ length: N }, (_, j) => (j === 1 ? 0 : 1)),
    )
    intersections.forEach(([v, t, distance]) => {
      adjMatrix[t][v] = distance
      adjMatrix[v][t] = distance
    })

    answer.push(solution(S, D, adjMatrix))
    currI += M + 1
  }
  return answer
}

console.log(getAnswer().join('\n'))
