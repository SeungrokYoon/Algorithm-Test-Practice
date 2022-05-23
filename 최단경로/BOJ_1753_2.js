//최단경로 두 번째 문제풀이
const input = require('fs').readFileSync('test/test.txt').toString().trim().split('\n')
//const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n')
const [V, E] = input.shift().split(' ').map(Number)
const start = input.shift() * 1
const arr = input.map((s) => s.split(' ').map(Number))
const dp = Array.from({ length: V + 1 }, () => Infinity)
const graph = Array.from({ length: V + 1 }, () => ({}))
dp[start] = 0
//그래프 생성
arr.forEach((edge) => {
  const [u, v, w] = edge
  if (v in graph[u]) {
    if (graph[u][v] > w) graph[u][v] = w
    return
  }
  graph[u][v] = w
})

//최소힙 작성
class MinHeap {
  constructor() {
    this.heap = []
  }
  push(newValue) {
    this.heap.push(newValue)
    this.upheap()
  }
  pop() {
    if (!this.heap.length) return null
    if (this.heap.length === 1) return this.heap.pop()
    if (this.heap.length) {
      const root = this.heap[0]
      this.heap[0] = this.heap[this.heap.length - 1]
      this.heap.pop()
      this.downheap()
      return root
    }
    return null
  }
  upheap() {
    let childIndex = this.heap.length - 1
    while (childIndex > 0) {
      const parentIndex = Math.floor((childIndex - 1) / 2)
      if (this.heap[parentIndex].weight <= this.heap[childIndex].weight) break
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[childIndex]
      this.heap[childIndex] = temp
      childIndex = parentIndex
    }
  }
  downheap() {
    if (this.heap.length === 0) return
    let parentIndex = 0
    while (2 * parentIndex + 1 < this.heap.length) {
      let childIndex = 2 * parentIndex + 1
      if (childIndex + 1 < this.heap.length && this.heap[childIndex] > this.heap[childIndex + 1])
        childIndex++
      if (this.heap[parentIndex] <= this.heap[childIndex]) break
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[childIndex]
      this.heap[childIndex] = temp
      parentIndex = childIndex
    }
  }
  size() {
    return this.heap.length
  }
}

const dijkstra = (startNode, graph, dp) => {
  const pq = new MinHeap()
  pq.push({ node: startNode, weight: 0 })
  while (pq.size()) {
    const popped = pq.pop()
    const startNode = popped.node
    const startWeight = popped.weight
    if (dp[startNode] < startWeight) continue
    for (let i = 1; i < V + 1; i++) {
      if (!(i in graph[startNode])) continue
      const endNode = i
      const endWeight = graph[startNode][i]
      const newCost = startWeight + endWeight
      if (dp[endNode] > newCost) {
        dp[endNode] = newCost
        pq.push({ node: endNode, weight: newCost })
      }
    }
  }
}

const solution = (start, graph, dp) => {
  dijkstra(start, graph, dp)
  const answer = dp
    .slice(1)
    .map((i) => (i === Infinity ? 'INF' : i))
    .join('\n')
  return answer.trim()
}

console.log(solution(start, graph, dp))
