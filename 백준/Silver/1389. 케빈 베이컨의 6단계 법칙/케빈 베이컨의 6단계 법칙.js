const [[N, M], ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((l) => l.split(' ').map(Number))

const adjMatrix = Array.from({ length: N + 1 }, () => Array.from({ length: N + 1 }, () => 0))
arr.forEach(([a, b]) => {
  if (adjMatrix[a][b] === 0) {
    adjMatrix[a][b] = 1
    adjMatrix[b][a] = 1
  }
})

//플로이드 워셜을 이용한 모든 정점에서 모든 정점까지의 최단거리
for (let mid = 1; mid < N + 1; mid++) {
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      if (i !== j && adjMatrix[i][mid] && adjMatrix[mid][j]) {
        adjMatrix[i][j] = Math.min(
          adjMatrix[i][j] === 0 ? Infinity : adjMatrix[i][j],
          adjMatrix[i][mid] + adjMatrix[mid][j],
        )
        adjMatrix[j][i] = Math.min(
          adjMatrix[i][j] === 0 ? Infinity : adjMatrix[i][j],
          adjMatrix[i][mid] + adjMatrix[mid][j],
        )
      }
    }
  }
}

const answer = adjMatrix
  .map((l, i) => [i, l.reduce((a, b) => a + b, 0)])
  .sort((a, b) => a[1] - b[1] || a[0] - b[0])[1][0]

console.log(answer)
