const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [V, E] = input.shift().split(' ').map(Number)
const start = +input.shift()

let uvws = input.map((str) => str.split(' ').map(Number))

const genGraph = (uvws) => {
  const graph = new Map()
  for (let i = 1; i < V + 1; i++) {
    graph.set(i, new Map())
  }
  uvws.forEach(([start, end, weight]) => {
    const adjEdges = graph.get(start)
    if (!adjEdges.has(end)) {
      adjEdges.set(end, weight)
      return
    }
    if (adjEdges.get(end) > weight) {
      adjEdges.set(end, weight)
    }
  })
  return graph
}
class MinHeap {
  constructor() {
    this.heap = []
  }

  push({ current, dist }) {
    this.heap.push({ current, dist })
    this.upHeap(this.heap.length - 1)
  }

  upHeap(currentIndex = this.heap.length - 1) {
    while (
      Math.floor((currentIndex - 1) / 2) >= 0 &&
      this.heap[Math.floor((currentIndex - 1) / 2)].dist > this.heap[currentIndex].dist
    ) {
      let parentIndex = Math.floor((currentIndex - 1) / 2)
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[currentIndex]
      this.heap[currentIndex] = temp
      currentIndex = parentIndex
    }
  }

  pop() {
    if (!this.heap.length) return null
    if (this.heap.length === 1) return this.heap.pop()
    const popped = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downHeap(0)
    return popped
  }

  downHeap(parentIndex) {
    while (parentIndex * 2 + 1 < this.heap.length) {
      let childIndex = parentIndex * 2 + 1
      if (
        childIndex + 1 < this.heap.length &&
        this.heap[childIndex].dist > this.heap[childIndex + 1].dist
      )
        childIndex++
      if (this.heap[parentIndex].dist <= this.heap[childIndex].dist) break
      const temp = this.heap[childIndex]
      this.heap[childIndex] = this.heap[parentIndex]
      this.heap[parentIndex] = temp
      parentIndex = childIndex
    }
  }
}

const dijkstra = (graph, start) => {
  const distance = Array.from({ length: V + 1 }, () => Infinity)
  distance[start] = 0

  const minHeap = new MinHeap()
  minHeap.push({ current: start, dist: 0 })
  while (minHeap.heap.length) {
    const { current, dist } = minHeap.pop()
    if (distance[current] < dist) continue
    if (!graph.get(current)) continue
    for (const [vertex, weight] of graph.get(current).entries()) {
      const newDist = dist + weight
      if (newDist >= distance[vertex]) continue
      distance[vertex] = newDist
      minHeap.push({ current: vertex, dist: newDist })
    }
  }
  return distance
}

const graph = genGraph(uvws)
const result = dijkstra(graph, start)
  .slice(1)
  .map((el) => (el === Infinity ? 'INF' : el))
  .join('\n')

console.log(result.trim())
