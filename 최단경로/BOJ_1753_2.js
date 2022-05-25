//최단경로 두 번째 문제풀이
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const [V, E] = input.shift().split(' ').map(Number)
const start = input.shift() * 1
const arr = input.map((s) => s.split(' ').map(Number))

//그래프 생성
const genGraph = (edges) => {
  const graph = new Map()
  for (let i = 1; i < V + 1; i++) {
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

const dijkstra = (start, graph) => {
  const dp = Array.from({ length: V + 1 }, () => Infinity)
  dp[start] = 0
  const pq = new MinHeap()
  pq.push({ node: start, weight: 0 })
  while (pq.size() > 0) {
    const { node, weight } = pq.pop()
    if (dp[node] < weight) continue
    if (!graph.has(node)) continue
    // for (let i = 1; i < V + 1; i++) {
    //   if (!graph.get(node).has(i)) continue
    //   const endNode = i
    //   const endWeight = graph.get(node).get(i)
    //   const newCost = weight + endWeight
    //   if (dp[endNode] > newCost) {
    //     dp[endNode] = newCost
    //     pq.push({ node: endNode, weight: newCost })
    //   }
    // }
    //Map 객체는 for ...of iteration 가능하니까 해보자.왠지 위 로직때문에 시간초과가 발생한느낌?
    for (const [nextNode, nextWeight] of [...graph.get(node)]) {
      const newWeight = weight + nextWeight
      if (newWeight < dp[nextNode]) {
        dp[nextNode] = newWeight
        pq.push({ node: nextNode, weight: newWeight })
      }
    }
  }
  return dp
}

const graph = genGraph(arr)
const answer = dijkstra(start, graph)
  .slice(1)
  .map((i) => (i === Infinity ? 'INF' : i))
  .join('\n')
  .trim()

console.log(answer)
