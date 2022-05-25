const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

//최소힙 작성
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

//그래프 생성
const genGraph = (N, edges) => {
  const graph = new Map()
  for (let i = 1; i < N + 1; i++) {
    graph.set(i, new Map())
  }
  edges.forEach((edge) => {
    const [u, v, w] = edge
    if (graph.get(u).has(v)) {
      if (graph.get(u).get(v) > w) {
        graph.get(u).set(v, w)
      }
    } else {
      graph.get(u).set(v, w)
    }
  })
  return graph
}

const N = +input[0]
const M = +input[1]
const edges = input.slice(2, M + 2).map((s) => s.split(' ').map(Number))
const [start, end] = input[M + 2].split(' ').map(Number)
const graph = genGraph(N, edges)

const dijkstra = (start, graph) => {
  const distance = Array.from({ length: N + 1 }, () => Infinity)
  const pq = new MinHeap()
  pq[start] = 0
  pq.push({ current: start, weight: 0 })
  while (pq.size()) {
    const { current, weight } = pq.pop()
    if (distance[current] < weight) continue
    for (const edge of [...graph.get(current)]) {
      const [nextNode, nextWeight] = edge
      const newCost = weight + nextWeight
      if (distance[nextNode] <= newCost) continue
      distance[nextNode] = newCost
      pq.push({ current: nextNode, weight: newCost })
    }
  }
  return distance
}
const result = dijkstra(start, graph)[end]
console.log(result)
