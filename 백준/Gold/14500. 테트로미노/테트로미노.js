const [[N, M], ...map] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const tetronominoes = [
  // -
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  // [
  //   [0, 0],
  //   [0, -1],
  //   [0, -2],
  //   [0, -3],
  // ],
  // [
  //   [0, 0],
  //   [-1, 0],
  //   [-2, 0],
  //   [-3, 0],
  // ],
  // ㅁ
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  //ㄴ
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [-1, 2],
  ],
  [
    [0, 0],
    [-1, 0],
    [-2, 0],
    [-2, -1],
  ],
  [
    [0, 0],
    [0, -1],
    [0, -2],
    [1, -2],
  ],
  //ㄴ대칭
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, -1],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
  ],
  [
    [0, 0],
    [-1, 0],
    [-2, 0],
    [-2, 1],
  ],
  [
    [0, 0],
    [0, -1],
    [0, -2],
    [-1, -2],
  ],
  //번개
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [-1, 1],
    [-1, 2],
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [-2, -1],
  ],
  [
    [0, 0],
    [0, -1],
    [1, -1],
    [1, -2],
  ],
  //번개대칭
  [
    [0, 0],
    [1, 0],
    [1, -1],
    [2, -1],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [-2, 1],
  ],
  [
    [0, 0],
    [0, -1],
    [-1, -1],
    [-1, -2],
  ],
  //ㅜ
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [0, 2],
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [-2, 0],
  ],
  [
    [0, 0],
    [0, -1],
    [-1, -1],
    [0, -2],
  ],
  [
    [0, 0],
    [1, 0],
    [1, -1],
    [2, 0],
  ],
  //ㅜ대칭인 ㅗ
  [
    [0, 0],
    [0, 1],
    [-1, 1],
    [0, 2],
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [-2, 0],
  ],
  [
    [0, 0],
    [0, -1],
    [1, -1],
    [0, -2],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 0],
  ],
]

let max = 0
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    tetronominoes.forEach((coords) => {
      let sum = 0
      coords.forEach(([dRow, dCol]) => {
        const nRow = i + dRow
        const nCol = j + dCol
        if (nRow >= 0 && nRow < N && nCol >= 0 && nCol < M) {
          sum += map[nRow][nCol]
        }
      })
      max = Math.max(max, sum)
    })
  }
}

console.log(max)
