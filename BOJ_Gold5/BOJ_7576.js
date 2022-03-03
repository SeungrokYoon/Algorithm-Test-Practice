const [[M, N], ...graph] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number))

const queue = []
let totalUnripe = 0
let minDay = 0
let pointer = 0
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (graph[i][j] === 1) {
      queue.push(i)
      queue.push(j)
      queue.push(0)
    } else if (graph[i][j] === 0) {
      totalUnripe++
    }
  }
}

while (pointer < queue.length) {
  const row = queue[pointer++]
  const col = queue[pointer++]
  const day = queue[pointer++]
  const dRow = [0, 0, 1, -1]
  const dCol = [1, -1, 0, 0]
  for (let i = 0; i < 4; i++) {
    const nextRow = row + dRow[i]
    const nextCol = col + dCol[i]
    if (nextRow < 0 || nextRow >= N || nextCol < 0 || nextCol >= M || graph[nextRow][nextCol] !== 0)
      continue
    queue.push(nextRow)
    queue.push(nextCol)
    queue.push(day + 1)
    minDay = Math.max(minDay, day + 1)
    graph[nextRow][nextCol] = 1
    totalUnripe--
  }
}
console.log(totalUnripe ? -1 : minDay)
