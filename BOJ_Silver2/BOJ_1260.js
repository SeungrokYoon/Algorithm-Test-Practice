const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M, V] = input.shift().split(' ').map(Number)

const adjList = Array.from({ length: N + 1 }, () => [])
input.forEach((str) => {
  const [from, to] = str.split(' ').map(Number)
  adjList[from].push(to)
  adjList[to].push(from)
})
adjList.forEach((l) => l.sort((a, b) => a - b))

const dfsVisited = Array.from({ length: N + 1 }, () => false)
const dfsResult = []
const DFS = (start) => {
  if (dfsVisited[start]) return
  dfsVisited[start] = true
  dfsResult.push(start)
  for (const nextNode of adjList[start]) {
    DFS(nextNode)
  }
}

const bfsVisited = Array.from({ length: N + 1 }, () => false)
const bfsResult = []
const BFS = (start) => {
  const queue = []
  queue.push(start)
  bfsVisited[start] = true
  bfsResult.push(start)
  while (queue.length) {
    const dequeued = queue.shift()
    for (const nextNode of adjList[dequeued]) {
      if (bfsVisited[nextNode]) continue
      bfsVisited[nextNode] = true
      queue.push(nextNode)
      bfsResult.push(nextNode)
    }
  }
}

DFS(V)
BFS(V)
console.log(dfsResult.join(' '))
console.log(bfsResult.join(' '))
