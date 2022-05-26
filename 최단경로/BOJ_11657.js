const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

class MinHeap {
  constructor() {
    this.heap = []
  }
  push(newValue) {
    this.heap.push(newValue)
    this.upheap()
  }
  upheap() {
    let childIndex = this.heap.length - 1
    let parentIndex = Math.floor((childIndex - 1) / 2)
    while (parentIndex >= 0 && this.heap[parentIndex].weight > this.heap[childIndex].weight) {
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[childIndex]
      this.heap[childIndex] = temp
      childIndex = parentIndex
      parentIndex = Math.floor((childIndex - 1) / 2)
    }
  }
  pop() {
    if (!this.heap.length) return null
    if (this.heap.length === 1) return this.heap.pop()
    const root = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downheap()
    return root
  }
  downheap() {
    if (this.heap.length === 0) return null
    let parentIndex = 0
    while (2 * parentIndex + 1 < this.heap.length) {
      let childIndex = 2 * parentIndex + 1
      if (
        childIndex + 1 < this.heap.length &&
        this.heap[childIndex].weight > this.heap[childIndex + 1].weight
      )
        childIndex++
      if (this.heap[parentIndex].weight <= this.heap[childIndex].weight) break
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[childIndex]
      this.heap[childIndex] = temp
      parentIndex = childIndex
    }
  }
  size() {
    return this.heap.length
  }
  display() {
    console.log(this.heap)
  }
}

const genGraph = (vertex, edges) => {
  const graph = new Map()
  for (let i = 1; i < vertex + 1; i++) {
    graph.set(i, new Map())
  }
  edges.forEach((edge) => {
    const [u, v, w] = edge
    graph.get(u).set(v, w)
  })
  return graph
}

const [N, M] = input[0]
const edges = input.slice(1)
const distance = Array.from({ length: N + 1 }, () => Infinity)

const belmanFord = (start, distance) => {
  const pq = new MinHeap()
  distance[start] = 0
  pq.push({ current: start, weight: 0 })
  //벨만 포드에서는 정점개수-1 만큼 edge relaxation 진행 후, 마지막 한 번을 더 해줌.
  for (let v = 1; v < N + 1; v++) {
    //모든 간선을 살펴보기
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]
      const [curr, next, dist] = edge
      if (distance[curr] !== Infinity && distance[next] > distance[curr] + dist) {
        distance[next] = distance[curr] + dist
        if (v === N) {
          //마지막 한 번의 edge relaxation때 갱신이 발생하면 음수 사이클 존재확인
          return true
        }
      }
    }
  }
  return false
}

const isCycle = belmanFord(1, distance)
if (isCycle) {
  console.log('-1')
} else {
  const answer = distance
    .slice(2)
    .reduce((prev, curr) => {
      const element = curr === Infinity ? -1 : curr
      return (prev += element + '\n')
    }, '')
    .trim()
  console.log(answer)
}
