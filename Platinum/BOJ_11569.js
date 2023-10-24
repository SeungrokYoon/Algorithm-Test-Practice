const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : __dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

let remainingTests = +input.shift()

class Node {
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
    const nextNode = new Node(idx, num, prev)
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
    this.heapq = new MinHeap()
    this.adjMatrix = Array.from({ length: N + 1 }, (_, i) => [])
    this.dpTable = Array.from({ length: N + 1 }, () => Infinity)
    this.visited = Array.from({ length: N + 1 }, () => false)
    this.interval = [0]
  }
  init(edges, intervals) {
    edges.forEach((el) => {
      const [v, t, distance] = el
      this.adjMatrix[t].push({ v, distance })
      this.adjMatrix[v].push({ v, distance })
    })
    this.interval = [...this.interval, ...intervals]
  }
}

function solution(start, end, matrix, intervals) {
  const minHeap = new MinHeap()
  const dpTable = Array.from({ length: matrix.length }, () => Infinity)
  const visited = Array.from({ length: matrix.length }, () => false)
  dpTable[start] = 0
  visited[0] = true
  visited[start] = true
  for (let i = 1; i < matrix.length; i++) {
    if (matrix[start][i] === Infinity) continue
    minHeap.insert(i, matrix[start][i], start)
    dpTable[i] = matrix[start][i]
  }

  while (!minHeap.isEmpty()) {
    const routingNode = minHeap.pop()
    if (visited[routingNode.idx] === true) continue
    visited[routingNode.idx] = true
    const connectedNodes = matrix[routingNode.idx]
      .map((el, i) => [i, el])
      .filter((el) => el[1] !== Infinity && el[1] !== 0)
    const routingOrderOfPrevNode = connectedNodes.findIndex((el) => el[0] === routingNode.prev)
    for (let targetNodeNumber = 1; targetNodeNumber < matrix.length; targetNodeNumber++) {
      const unvisitable =
        visited[targetNodeNumber] === true || matrix[routingNode.idx][targetNodeNumber] === Infinity
      if (unvisitable) continue
      const interValOfRouting = intervals[targetNodeNumber - 1]
      const timeForPrevNodeToPassRoutingNode = getValidTime(
        routingNode.val,
        routingOrderOfPrevNode,
        interValOfRouting,
        connectedNodes.length,
      )
      const nextDist = timeForPrevNodeToPassRoutingNode + matrix[routingNode.idx][targetNodeNumber]
      const updatable = dpTable[targetNodeNumber] > nextDist
      if (updatable) {
        dpTable[targetNodeNumber] = nextDist
        minHeap.insert(targetNodeNumber, nextDist, routingNode.idx)
      }
    }
  }
  return dpTable[end] === Infinity ? -1 : dpTable[end]
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
    const adjMatrix = Array.from({ length: N + 1 }, (_, i) =>
      Array.from({ length: N + 1 }, (_, j) => (i === j ? 0 : Infinity)),
    )
    for (let i = currI + 1; i < currI + M + 1; i++) {
      const [v, t, distance] = data[i]
      adjMatrix[t][v] = distance
      adjMatrix[v][t] = distance
    }
    const intervals = data[currI + M + 1]
    answer += solution(S, D, adjMatrix, intervals) + '\n'
    currI += M + 2
  }
  return answer.trim()
}

console.log(getAnswer())
