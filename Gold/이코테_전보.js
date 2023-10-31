const input = require('fs')
  .readFileSync('test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

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
  isEmpty() {
    return this.heap.length === 0
  }
  upHeap(pos) {
    while (this.formerIsLargerThanLatter(parseInt((pos - 1) / 2), pos)) {
      const parentPos = parseInt((pos - 1) / 2)
      const tmp = this.heap[pos]
      this.heap[pos] = this.heap[parentPos]
      this.heap[parentPos] = tmp
      pos = parentPos
    }
  }
  downHeap(pos) {
    while (pos < Math.floor(this.heap.length / 2)) {
      let childIndex = pos * 2 + 1
      if (
        childIndex + 1 < this.heap.length &&
        this.formerIsLargerThanLatter(childIndex, childIndex + 1)
      )
        childIndex++
      if (this.formerIsLargerThanLatter(childIndex, pos)) break
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[childIndex]
      this.heap[childIndex] = temp
      pos = childIndex
    }
  }
  formerIsLargerThanLatter(pos1, pos2) {
    return this.heap[pos1][0] > this.heap[pos2][0]
  }
}

function dijkstra(input) {
  const [N, M, START] = input[0]
  const minHeap = new MinHeap()
  const graph = Array.from({ length: N + 1 }, () => [])
  const distanceTable = Array.from({ length: N + 1 }, () => Infinity)

  for (let i = 1; i < input.length; i++) {
    const [X, Y, Z] = input[i]
    graph[X].push([Y, Z])
    graph[Y].push([X, Z])
  }

  minHeap.insert([0, START])
  distanceTable[START] = 0

  while (!minHeap.isEmpty()) {
    const [dist, now] = minHeap.getMin()
    if (distanceTable[now] < dist) continue

    for (const i of graph[now]) {
      const cost = dist + i[1]
      if (cost < distanceTable[i[0]]) {
        distanceTable[i[0]] = cost
        minHeap.insert([cost, i[0]])
      }
    }
  }

  return distanceTable
}

function solution() {
  const table = dijkstra(input)
  const propagatedNodes = table.reduce((acc, curr) => {
    return curr !== Infinity ? acc + 1 : acc
  }, 0)
  const totalTimeForPropagation = table.reduce((acc, curr) => {
    return curr !== Infinity ? Math.max(acc, curr) : acc
  }, 0)
  console.log(propagatedNodes - 1, totalTimeForPropagation)
}

solution()
