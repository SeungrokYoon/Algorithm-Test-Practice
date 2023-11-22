const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const floor = input.slice(1).map((s) => s.split(''))

const VISITED_PANEL = 'o'
const HORIZONTAL_PANEL = '-'
const VERTICAL_PANEL = '|'

const visitWithBFS = (i, j) => {
  const dx = floor[i][j] === HORIZONTAL_PANEL ? [0, 0] : [1, -1]
  const dy = floor[i][j] === HORIZONTAL_PANEL ? [1, -1] : [0, 0]
  const target = floor[i][j] === HORIZONTAL_PANEL ? HORIZONTAL_PANEL : VERTICAL_PANEL

  const queue = [[i, j]]
  while (queue.length) {
    const [x, y] = queue.shift()
    if (floor[x][y] === VISITED_PANEL) continue
    floor[x][y] = VISITED_PANEL
    for (let delta = 0; delta < 2; delta++) {
      const [nx, ny] = [x + dx[delta], y + dy[delta]]
      if (
        nx < 0 ||
        ny < 0 ||
        nx >= N ||
        ny >= M ||
        floor[nx][ny] === VISITED_PANEL ||
        floor[nx][ny] !== target
      )
        continue
      queue.push([nx, ny])
    }
  }
}

let count = 0
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (floor[i][j] === VISITED_PANEL) continue
    visitWithBFS(i, j)
    count++
  }
}

console.log(count)
