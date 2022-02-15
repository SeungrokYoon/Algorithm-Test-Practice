const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const graph = input.map((str) => str.split('').map(Number))

//각 좌표를 기준으로 변의 길이를 늘려가며 탐색
let finalEdge = 1
for (let edge = 0; edge < Math.min(N, M); edge++) {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      const target = graph[row][col]
      let isComplete = true
      const dRow = [edge, 0, edge]
      const dCol = [0, edge, edge]
      for (let i = 0; i < 3; i++) {
        const nextRow = row + dRow[i]
        const nextCol = col + dCol[i]
        if (
          nextRow < N &&
          nextCol < M &&
          0 <= nextRow &&
          0 <= nextCol &&
          graph[nextRow][nextCol] === target
        ) {
          continue
        }
        isComplete = false
      }
      isComplete ? (finalEdge = edge + 1) : ''
    }
  }
}

console.log(finalEdge * finalEdge)
