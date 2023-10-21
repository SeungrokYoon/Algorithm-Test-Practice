const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : __dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

input.shift()

class Node {
  constructor(idx, val) {
    this.idx = idx
    this.val = val
  }
}

class MinHeap {
  constructor() {
    this.heap = []
  }
  insert(idx, num) {
    const nextNode = new Node(idx, num)
    this.heap.push(nextNode)
    this.upHeap()
  }
  upHeap() {
    if (this.heap.length === 1) return
    let currIdx = this.heap.length - 1
    while (parseInt((currIdx - 1) / 2 > 0)) {
      const parentIdx = parseInt((currIdx - 1) / 2)
      const parentNode = this.heap[parentIdx]
      const childNode = this.heap[currIdx]
      if (parentNode.val > childNode.val) {
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
    const poppedNode = this.heap[0]
    if (this.heap.length === 1) {
      this.heap.pop()
      return poppedNode
    }
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downHeap()
    return poppedNode
  }
  downHeap() {
    if (this.isEmpty() || this.heap.length === 1) return
    let currIdx = 0
    while (2 * currIdx + 1 < this.heap.length) {
      const leftChildIdx = 2 * currIdx + 1
      const rightChildIdx = 2 * currIdx + 2
      const childIdx =
        rightChildIdx < this.heap.length &&
        this.heap[leftChildIdx].val > this.heap[rightChildIdx].val
          ? rightChildIdx
          : leftChildIdx
      const parentNode = this.heap[currIdx]
      const childNode = this.heap[childIdx]
      if (parentNode.val > childNode.val) {
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

function solution(start, end, matrix, intervals) {
  const dpTable = Array.from({ length: matrix.length }, () => Infinity)
  const minHeap = new MinHeap()
  const visited = Array.from({ length: matrix.length }, () => false)
  visited[0] = true
  minHeap.insert(start, 0)

  while (visited.some((el) => el === false)) {
    const poppedNode = minHeap.pop()
    if (visited[poppedNode.idx]) continue
    for (let i = 1; i < matrix.length; i++) {
      if (visited[i]) continue
      visited[poppedNode.idx] = true
      const fromPoppedToI = matrix[poppedNode.idx][i]
      if (dpTable[i] > poppedNode.val + fromPoppedToI) {
        const nextDistance = poppedNode.val + fromPoppedToI
        dpTable[i] = nextDistance
        minHeap.insert(i, nextDistance)
      }
    }
  }
  return dpTable[end]
}

const getAnswer = () => {
  const answer = []
  const data = input.map((l) => l.split(' ').map(Number))

  let currI = 0
  while (currI < data.length) {
    const [N, M, S, D] = data[currI]
    const intersections = data.slice(currI, currI + M + 1)
    const intervals = data[currI + M + 1]
    const adjMatrix = Array.from({ length: N + 1 }, (_, i) =>
      Array.from({ length: N + 1 }, (_, j) => (i === j ? 0 : Infinity)),
    )
    intersections.forEach(([v, t, distance]) => {
      adjMatrix[t][v] = distance
      adjMatrix[v][t] = distance
    })
    answer.push(solution(S, D, adjMatrix, intervals))
    currI += M + 2
  }
  return answer
}

console.log(getAnswer().join('\n'))
