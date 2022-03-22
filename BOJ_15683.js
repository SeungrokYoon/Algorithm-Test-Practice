const [[N, M], ...graph] = require('fs')
  .readFileSync('test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const cameraMap = {
  1: [[[0, 1]], [[1, 0]], [[-1, 0]], [[0, -1]]],
  2: [
    [
      [0, 1],
      [0, -1],
    ],
    [
      [1, 0],
      [-1, 0],
    ],
  ],
  3: [
    [
      [-1, 0],
      [0, 1],
    ],
    [
      [0, 1],
      [1, 0],
    ],
    [
      [1, 0],
      [0, -1],
    ],
    [
      [0, -1],
      [-1, 0],
    ],
  ],
  4: [
    [
      [0, -1],
      [-1, 0],
      [0, 1],
    ],
    [
      [1, 0],
      [-1, 0],
      [0, 1],
    ],
    [
      [1, 0],
      [0, -1],
      [0, 1],
    ],
    [
      [0, -1],
      [1, 0],
      [-1, 0],
    ],
  ],
  5: [
    [
      [0, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
    ],
  ],
}

const setCamera = (row, col) => {
  const cNumber = graph[row][col]
  let counter = 0
  let remember = []
  for (const deltas of cameraMap[cNumber]) {
    let tempCounter = 0
    for (const [dRow, dCol] of deltas) {
      let nextRow = row + dRow
      let nextCol = col + dCol
      while (nextRow < N && nextRow >= 0 && nextCol < M && nextCol >= 0) {
        if (graph[nextRow][nextCol] === 6) break
        if (graph[nextRow][nextCol] === 0) tempCounter++
        nextRow += dRow
        nextCol += dCol
      }
    }
    if (counter <= tempCounter) {
      remember = deltas
      counter = tempCounter
    }
  }
  for (const [dRow, dCol] of remember) {
    let nextRow = row + dRow
    let nextCol = col + dCol
    while (nextRow < N && nextRow >= 0 && nextCol < M && nextCol >= 0) {
      if (graph[nextRow][nextCol] === 6) break
      if (graph[nextRow][nextCol] === 0) graph[nextRow][nextCol] = -1
      nextRow += dRow
      nextCol += dCol
    }
  }
}

for (let row = 0; row < N; row++) {
  for (let col = 0; col < M; col++) {
    if (graph[row][col] === -1 || graph[row][col] === 6 || graph[row][col] === 0) continue
    setCamera(row, col)
  }
}

let answer = 0
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    answer += graph[i][j] === 0 ? 1 : 0
  }
}
console.log(answer)
