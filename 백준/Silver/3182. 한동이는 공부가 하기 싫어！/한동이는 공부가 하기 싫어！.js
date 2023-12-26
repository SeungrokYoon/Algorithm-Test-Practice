const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const VERTICES = input[0]
const visited = Array(VERTICES + 1).fill(0)
const directedGraph = Array(VERTICES + 1).fill(0)

input.slice(1).forEach((who, student) => {
  const studentNumber = student + 1
  directedGraph[studentNumber] = who
})

const dfs = (node) => {
  let max = 0
  if (directedGraph[node] !== 0) {
    const nextNode = directedGraph[node]
    if (visited[nextNode]) return 1
    visited[nextNode] = 1
    max = Math.max(max, dfs(nextNode))
    visited[nextNode] = 0
  }
  return max + 1
}

const answer = []
for (let i = 1; i <= VERTICES; i++) {
  visited[i] = 1
  const counter = dfs(i)
  answer.push({ student: i, connection: counter })
  visited[i] = 0
}

const sorted = answer.sort((a, b) => b.connection - a.connection || a.student - b.student)

console.log(sorted[0].student)
