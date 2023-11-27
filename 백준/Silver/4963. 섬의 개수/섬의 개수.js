const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')

const solution = () => {
  const [w, h] = input.shift().split(' ').map(Number)
  const graph = []
  let lands = 0
  for (let i = 0; i < h; i++) {
    graph.push(input.shift().split(' ').map(Number))
  }
  const dfs = (i, j) => {
    const dRow = [0, 0, 1, -1, 1, 1, -1, -1]
    const dCol = [1, -1, 0, 0, 1, -1, 1, -1]
    graph[i][j] = 0
    for (let index = 0; index < 8; index++) {
      const nextRow = i + dRow[index]
      const nextCol = j + dCol[index]
      if (
        nextRow < 0 ||
        nextRow >= h ||
        nextCol < 0 ||
        nextCol >= w ||
        graph[nextRow][nextCol] === 0
      ) {
        continue
      }
      dfs(nextRow, nextCol)
    }
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (graph[i][j] === 0) continue
      lands++
      dfs(i, j)
    }
  }
  return lands
}

while (input[0] !== '0 0') {
  console.log(solution())
}
