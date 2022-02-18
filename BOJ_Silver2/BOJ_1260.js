const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const [N, M, V] = input.shift().split(' ').map(Number)

const adjList = Array.from({ length: N + 1 }, () => [])
input.forEach((str) => {
  const [from, to] = str.split(' ').map(Number)
  adjList[from].push(to)
  adjList[to].push(from)
})
adjList.forEach((l) => l.sort((a, b) => a - b))

const DFS = (start) => {
  let result = ''
  const visited = Array.from({ length: N + 1 }, () => false)
  const stack = []
  stack.push(start)
  while (stack.length) {
    const popped = stack.pop()
    if (!visited[popped]) {
      visited[popped] = true
      result += popped + ' '
    }
    for (let i = adjList[popped].length - 1; i >= 0; i--) {
      const to = adjList[popped][i]
      if (!visited[to]) {
        stack.push(to)
      }
    }
  }
  return result
}

const BFS = (start) => {
  let result = ''
  const visited = Array.from({ length: N + 1 }, () => false)
  const queue = []
  queue.push(start)
  visited[start] = true
  while (queue.length) {
    const dequeued = queue.shift()
    result += dequeued + ' '
    for (let i = 0; i < adjList[dequeued].length; i++) {
      const to = adjList[dequeued][i]
      if (!visited[to]) {
        visited[to] = true
        queue.push(to)
      }
    }
  }
  return result
}

console.log(DFS(V))
console.log(BFS(V))
