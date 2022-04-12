const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const graph = input.map((s) => s.split('').map(Number))
let answer = 0

const generateDpTable = (N, M) => {
  return Array.from({ length: N + 1 }, () => Array.from({ length: M + 1 }, () => 0))
}

const renewSquare = (row, col, graph, dp) => {
  const dpRow = row + 1
  const dpCol = col + 1
  const newEdge = Math.min(dp[dpRow - 1][dpCol - 1], dp[dpRow - 1][dpCol], dp[dpRow][dpCol - 1]) + 1
  dp[dpRow][dpCol] = newEdge
  answer = Math.max(answer, newEdge)
}

const solution = (N, M, graph) => {
  const dp = generateDpTable(N, M)
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (graph[row][col] !== 1) continue
      renewSquare(row, col, graph, dp)
    }
  }
}

solution(N, M, graph)
console.log(answer * answer)
