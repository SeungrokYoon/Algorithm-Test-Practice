let input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const arrMaze = input.slice(1).map((s) => s.split('').map(Number))

const queue = [[0, 0, 1]]
const dx = [0, 1, 0, -1]
const dy = [1, 0, -1, 0]

let answer = 0
let idx = 0
while (queue) {
  const [x, y, dist] = queue.shift()
  if (arrMaze[x][y] === 0) continue
  arrMaze[x][y] = 0
  if (x === N - 1 && y === M - 1) {
    answer = dist
    break
  }
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + dx[i], y + dy[i]]
    if (nx < 0 || nx >= N || ny < 0 || ny >= M || arrMaze[nx][ny] === 0) continue
    queue.push([nx, ny, dist + 1])
  }
}

console.log(answer)
