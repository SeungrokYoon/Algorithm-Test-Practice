const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : __dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

let remainingTests = +input.shift()

class HeapNode {
  constructor(idx, val, prev) {
    this.idx = idx
    this.val = val
    this.prev = prev
  }
}

class MinHeap {
  constructor() {
    this.heap = []
  }
  insert(idx, num, prev) {
    const nextNode = new HeapNode(idx, num, prev)
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

class Graph {
  constructor(N) {
    this.graph = []
    this.init(N)
  }
  init(N) {
    for (let i = 1; i <= N; i++) {
      this.graph.push(new GraphNode(i))
    }
  }
  addEdge(start, dest, dist) {
    this.getNode(start).adjNodes[dest] = { nodeNum: dest, dist }
    this.getNode(dest).adjNodes[start] = { nodeNum: start, dist }
  }
  addIntervals(intervalArr) {
    for (let i = 0; i < intervalArr.length; i++) {
      this.getNode(i + 1).setInterval(intervalArr[i])
    }
  }
  getNode(num) {
    return this.graph[num - 1]
  }
  print() {
    console.log(this.graph)
  }
}

class GraphNode {
  constructor(nodeNum) {
    this.nodeNum = nodeNum
    this.distFromStart = Infinity
    this.visited = false
    this.adjNodes = {}
    this.interval = -1
  }
  getInterval() {
    return this.interval
  }
  setInterval(n) {
    this.interval = n
  }
  getDistFromStart() {
    return this.distFromStart
  }
  setDistFromStart(n) {
    this.distFromStart = n
  }
  getVisited() {
    return this.visited
  }
  setVisited(visited) {
    this.visited = visited
  }
  getAdjNodes() {
    return this.adjNodes
  }
}

function solution(start, end, graph) {
  const minHeap = new MinHeap()
  graph.getNode(start).setDistFromStart(0)
  graph.getNode(start).setVisited(true)

  const adjNodeOfStart = graph.getNode(start).getAdjNodes()

  for (const node in adjNodeOfStart) {
    const { nodeNum, dist } = adjNodeOfStart[node]
    if (graph.getNode(node).getVisited()) continue
    minHeap.insert(nodeNum, dist, start)
    graph.getNode(node).setDistFromStart(dist)
  }

  while (!minHeap.isEmpty()) {
    const routingHeapNode = minHeap.pop()
    if (routingHeapNode.idx === end) break
    const routingGraphNode = graph.getNode(routingHeapNode.idx)
    if (routingGraphNode.getVisited() === true) continue
    routingGraphNode.setVisited(true)
    const adjObj = Object.keys(routingGraphNode.getAdjNodes())
    const routingOrderOfPrevNode = adjObj.findIndex((el) => el === routingHeapNode.prev + '')
    for (let destNodeNumber of adjObj) {
      destNodeNumber = parseInt(destNodeNumber)
      const destGraphNode = graph.getNode(destNodeNumber)
      const unvisitable =
        destGraphNode.getVisited() === true ||
        routingGraphNode.adjNodes[destNodeNumber].dist === Infinity
      if (unvisitable) continue
      const timeForPrevNodeToPassRoutingNode = getValidTime(
        routingHeapNode.val,
        routingOrderOfPrevNode,
        routingGraphNode.getInterval(),
        Object.keys(routingGraphNode.getAdjNodes()).length,
      )
      const nextDist =
        timeForPrevNodeToPassRoutingNode + routingGraphNode.adjNodes[destNodeNumber].dist
      const isUpdatable = destGraphNode.getDistFromStart() > nextDist
      if (isUpdatable) {
        destGraphNode.setDistFromStart(nextDist)
        minHeap.insert(destNodeNumber, nextDist, routingHeapNode.idx)
      }
    }
  }

  const endDist = graph.getNode(end).getDistFromStart()
  return endDist === Infinity ? -1 : endDist
}

const getValidTime = (
  currTime,
  routingOrderOfPrevNode,
  intervalOfRoutingNode,
  nOfConnectedNodes,
) => {
  let startTime = routingOrderOfPrevNode * intervalOfRoutingNode
  let found = false
  let validTime = 0
  const cycleTime = intervalOfRoutingNode * nOfConnectedNodes

  while (!found) {
    if (startTime <= currTime && currTime < startTime + intervalOfRoutingNode) {
      found = true
      validTime = currTime
    } else if (startTime - cycleTime + intervalOfRoutingNode <= currTime && currTime < startTime) {
      validTime = startTime
      found = true
    } else {
      startTime += cycleTime
    }
  }
  return validTime
}

const getAnswer = () => {
  let answer = ''
  const data = input.map((l) => l.split(' ').map(Number))
  let currI = 0
  while (remainingTests--) {
    const [N, M, S, D] = data[currI]
    const graph = new Graph(N)
    for (let i = currI + 1; i < currI + M + 1; i++) {
      const [start, dest, distance] = data[i]
      graph.addEdge(start, dest, distance)
    }
    const intervals = data[currI + M + 1]
    graph.addIntervals(intervals)
    answer += solution(S, D, graph) + '\n'
    currI += M + 2
  }
  return answer.trim()
}

console.log(getAnswer())
