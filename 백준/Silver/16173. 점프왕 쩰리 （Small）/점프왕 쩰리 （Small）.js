const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const map = input.slice(1).map((s) => s.split(' ').map(Number))

const queue = [[0, 0, map[0][0]]]
const dRow = [0, 1]
const dCol = [1, 0]

const isEnd = (x, y, N) => x === N - 1 && y === N - 1

const solution = (N, map) => {
  while (queue.length) {
    const [row, col, delta] = queue.shift()
    if (isEnd(row, col, N)) {
      return 'HaruHaru'
    }
    map[row][col] = -1
    for (let i = 0; i < 2; i++) {
      const nextRow = row + dRow[i] * delta
      const nextCol = col + dCol[i] * delta
      if (
        nextRow < 0 ||
        nextRow >= N ||
        nextCol < 0 ||
        nextCol >= N ||
        map[(nextRow, nextCol)] === -1
      )
        continue
      queue.push([nextRow, nextCol, map[nextRow][nextCol]])
    }
  }
  return 'Hing'
}

console.log(solution(N, map))
