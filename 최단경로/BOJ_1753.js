class MinHeap {
  constructor() {
    this.heap = []
  }
  push({ current, dist }) {
    this.heap.push({ current, dist })
    let currentIndex = this.heap.length - 1
    let parent = Math.floor((currentIndex - 1) / 2)
    while (parent >= 0 && this.heap[parent].dist > this.heap[currentIndex].dist) {
      const temp = this.heap[parent]
      this.heap[parent] = this.heap[currentIndex]
      this.heap[currentIndex] = temp
      currentIndex = parent
      parent = Math.floor((currentIndex - 1) / 2)
    }
  }
  pop() {
    if (!this.heap.length) return null
    if (this.heap.length === 1) return this.heap.pop()
    const popped = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    const downHeap = (parentIndex) => {
      let childIndex = parentIndex * 2 + 1
      while (childIndex < this.heap.length) {
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
    downHeap(0)
    return popped
  }
  size() {
    return this.heap.length
  }
}

const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [V, E] = input.shift().split(' ').map(Number)
const start = input.shift() * 1
const graph = Array.from({ length: V + 1 }, () => [])

for (const row of input) {
  const [u, v, w] = row.split(' ').map(Number)
  graph[u].push([v, w])
}

const dijkstra = (start) => {
  const distance = Array.from({ length: V + 1 }, () => Infinity)
  distance[start] = 0

  const minHeap = new MinHeap()
  minHeap.push({ current: start, dist: 0 })
  while (minHeap.size()) {
    const { current, dist } = minHeap.pop()
    if (distance[current] < dist) {
      continue
    }

    for (const edge of graph[current]) {
      const [to, weight] = edge
      const newDist = dist + weight
      if (newDist < distance[to]) {
        distance[to] = newDist
        minHeap.push({ current: to, dist: newDist })
      }
    }
  }
  return distance.slice(1)
}

const result = dijkstra(start)
let answer = ''
result.forEach((value) => {
  if (value === Infinity) {
    answer += 'INF\n'
  } else {
    answer += `${value}\n`
  }
})
console.log(answer.trim())
