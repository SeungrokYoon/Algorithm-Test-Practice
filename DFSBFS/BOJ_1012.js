const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const T = input.shift() * 1

for (let test = 0; test < T; test++) {
  const [M, N, K] = input.shift().split(' ').map(Number)
  //그래프 작성
  const graph = Array.from({ length: N }, () => Array.from({ length: M }, () => 0))
  for (let i = 0; i < K; i++) {
    const [col, row] = input.shift().split(' ').map(Number)
    graph[row][col] = 1
  }
  //각 좌표별 DFS
  let count = 0
  const dRow = [1, -1, 0, 0]
  const dCol = [0, 0, 1, -1]
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (graph[row][col] !== 1) continue
      count++
      const stack = [[row, col]]
      while (stack.length) {
        const [row, col] = stack.pop()
        for (let i = 0; i < 4; i++) {
          const newRow = dRow[i] + row
          const newCol = dCol[i] + col
          if (
            0 <= newRow &&
            newRow < N &&
            0 <= newCol &&
            newCol < M &&
            graph[newRow][newCol] === 1
          ) {
            graph[newRow][newCol] = 2 //방문표시
            stack.push([newRow, newCol])
          }
        }
      }
    }
  }
  console.log(count)
}
