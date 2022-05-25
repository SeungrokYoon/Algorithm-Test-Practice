const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const genGraph = (edges) => {
  const graph = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => Infinity))
  for (let i = 1; i < n + 1; i++) {
    graph[i][i] = 0
  }
  edges.forEach((edge) => {
    const [u, v, w] = edge
    graph[u][v] = Math.min(graph[u][v], w)
  })
  return graph
}

const floyd = (graph) => {
  for (let u = 1; u < n + 1; u++) {
    for (let s = 1; s < n + 1; s++) {
      for (let e = 1; e < n + 1; e++) {
        if (u === s || s === e || u === e) continue
        graph[s][e] = Math.min(graph[s][e], graph[s][u] + graph[u][e])
      }
    }
  }
}

const getResult = (graph) => {
  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < n + 1; j++) {
      graph[i][j] === Infinity ? (graph[i][j] = 0) : ''
    }
  }
  const result = graph.slice(1).reduce((prevRow, curRow) => {
    return prevRow + curRow.slice(1).join(' ') + '\n'
  }, '')
  return result.trim()
}

const n = +input[0]
const m = +input[1]
const edges = input.slice(2, m + 2).map((s) => s.split(' ').map(Number))
const graph = genGraph(edges)
floyd(graph)
const result = getResult(graph)
console.log(result)
