const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const [N, M] = input[0]
const map = input.slice(1)
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => 0))

const findStart = (map, N, M) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 2) return [i, j]
    }
  }
}

const [startRow, startCol] = findStart(map, N, M)

const dRow = [0, 1, 0, -1]
const dCol = [1, 0, -1, 0]

const queue = [[startRow, startCol, 0]]
while (queue.length) {
  const [row, col, dest] = queue.shift()
  if (visited[row][col]) continue
  visited[row][col] = 1
  map[row][col] = dest
  for (let i = 0; i < 4; i++) {
    const [nRow, nCol] = [row + dRow[i], col + dCol[i]]
    if (nRow < 0 || nRow >= N || nCol < 0 || nCol >= M || visited[nRow][nCol]) continue
    if (map[nRow][nCol] === 0) {
      //   visited[nRow][nCol] = 1
      continue
    }
    queue.push([nRow, nCol, dest + 1])
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j] === 0 && map[i][j] === 1) {
      map[i][j] = -1
    }
  }
}

console.log(map.map((arr) => arr.join(' ')).join('\n'))
