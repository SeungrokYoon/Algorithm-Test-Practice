const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const NUMBER_OF_MAZE = +input[0]
const STARTING_SIGN = 'S'
const GOAL_SIGN = 'G'
const WALL_SIGN = 'X'

const findStartAndEnd = (map, N, M) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === STARTING_SIGN) {
        return [i, j]
      }
    }
  }
}

const answer = []

for (let i = 1; i < input.length; i++) {
  const [N, M] = input[i].split(' ').map(Number)
  const map = input.slice(i + 1, i + 1 + N).map((s) => s.split(''))
  const dRow = [0, 1, 0, -1]
  const dCol = [1, 0, -1, 0]
  const start = findStartAndEnd(map, N, M)

  const MAX_DISTS = N * M + 1

  let shortestDist = MAX_DISTS
  const queue = [[...start, 0]]
  while (queue.length) {
    const [row, col, dist] = queue.shift()
    if (map[row][col] === WALL_SIGN) continue
    if (map[row][col] === GOAL_SIGN) {
      shortestDist = dist
      break
    }
    map[row][col] = WALL_SIGN
    for (let i = 0; i < 4; i++) {
      const nextRow = row + dRow[i]
      const nextCol = col + dCol[i]
      if (
        nextRow < 0 ||
        nextRow >= N ||
        nextCol < 0 ||
        nextCol >= M ||
        map[nextRow][nextCol] === WALL_SIGN
      )
        continue
      queue.push([nextRow, nextCol, dist + 1])
    }
  }
  answer.push(shortestDist === MAX_DISTS ? 'No Exit' : `Shortest Path: ${shortestDist}`)
  i += N
}

console.log(answer.join('\n'))
