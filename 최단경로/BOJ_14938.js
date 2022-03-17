const input = require('fs').readFileSync('test.txt').toString().trim().split('\n')
const [N, M, R] = input[0].split(' ').map(Number)
const itemsPerVertex = [0].concat(input[1].split(' ').map(Number))
const edges = input.slice(2, R + 2).map((s) => s.split(' ').map(Number))

const floydWarshall = (N, edges) => {
  //create graph
  const adjMatrix = Array.from({ length: N + 1 }, (_, i) =>
    Array.from({ length: N + 1 }, (_, j) => (i === j ? 0 : Infinity)),
  )

  for (const [v1, v2, weight] of edges) {
    const smaller = Math.min(adjMatrix[v1][v2], weight)
    adjMatrix[v1][v2] = smaller
    adjMatrix[v2][v1] = smaller
  }

  //O(V^3) traverse
  for (let m = 1; m < N + 1; m++) {
    for (let s = 1; s < N + 1; s++) {
      for (let e = 1; e < N + 1; e++) {
        if (adjMatrix[s][e] > adjMatrix[s][m] + adjMatrix[m][e]) {
          adjMatrix[s][e] = adjMatrix[s][m] + adjMatrix[m][e]
          adjMatrix[e][s] = adjMatrix[s][m] + adjMatrix[m][e]
        }
      }
    }
  }
  return adjMatrix
}

const solution = () => {
  const adjMatrix = floydWarshall(N, edges)
  let answer = 0
  for (let i = 1; i < N + 1; i++) {
    let tempSum = 0
    adjMatrix[i].forEach((dist, vertex) => {
      tempSum += dist <= M ? itemsPerVertex[vertex] : 0
    })
    answer = Math.max(answer, tempSum)
  }
  return answer
}

console.log(solution())
