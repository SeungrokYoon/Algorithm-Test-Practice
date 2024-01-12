const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const VERTICES = +input[0]
const LINES = +input[1]
const visited = Array(VERTICES + 1).fill(false)
visited[1] = true

const adjList = Array.from({ length: VERTICES + 1 }, () => new Set())
input.slice(2).forEach((l) => {
  const [a, b] = l.split(' ').map(Number)
  !adjList[a].has(b) ? adjList[a].add(b) : ''
  !adjList[b].has(a) ? adjList[b].add(a) : ''
})

let answer = 0
const queue = [{ vertex: 1, dist: 0 }]
visited[1] = true
while (queue.length) {
  const { vertex, dist } = queue.pop()
  for (const friend of adjList[vertex]) {
    if (visited[friend] || dist + 1 > 2) continue
    visited[friend] = true
    queue.push({ vertex: friend, dist: dist + 1 })
    answer++
  }
}

console.log(answer)
