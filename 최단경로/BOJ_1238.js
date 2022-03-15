class MinHeap {
  constructor() {
    this.heap = []
  }
  push({ current, dist }) {
    this.heap.push({ current, dist })
    this.upHeap()
  }
  upHeap(currentIndex = this.heap.length - 1) {
    let parentIndex = Math.floor((currentIndex - 1) / 2)
    while (parentIndex >= 0 && parentIndex < currentIndex) {
      if (this.heap[parentIndex].dist <= this.heap[currentIndex].dist) break
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[currentIndex]
      this.heap[currentIndex] = temp
      currentIndex = parentIndex
      parentIndex = Math.floor((currentIndex - 1) / 2)
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
  size() {
    return this.heap.length
  }
}

const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M, X] = input.shift().split(' ').map(Number)
const graph = Array.from({ length: N + 1 }, () => [])

for (const row of input) {
  const [u, v, w] = row.split(' ').map(Number)
  graph[u].push([v, w])
}

const dijkstra = (start) => {
  const distance = Array.from({ length: N + 1 }, () => Infinity)
  distance[start] = 0
  const minHeap = new MinHeap()
  minHeap.push({ current: start, dist: 0 })
  while (minHeap.size()) {
    const { current, dist } = minHeap.pop()
    if (distance[current] < dist) {
      continue
    }
    for (const edge of graph[current]) {
      //current의 인접 경로를 탐색
      const [to, weight] = edge
      //dist: start부터 current까지의 거리
      //weight: current부터 to 까지의 거리
      const newDist = dist + weight
      if (newDist < distance[to]) {
        //만약 기존 start-to 보다 새 거리가 더 짧다면 갱신
        distance[to] = newDist
        minHeap.push({ current: to, dist: newDist })
      }
    }
  }
  return distance
}

let answer = 0
const backDist = dijkstra(X).slice(0)
for (let i = 1; i < N + 1; i++) {
  const goDist = dijkstra(i)
  answer = Math.max(answer, goDist[X] + backDist[i])
}

console.log(answer)
