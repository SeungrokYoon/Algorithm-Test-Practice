const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

input.pop()

const VISITED = -1
const SEA = 0
const dRow = [-1, -1, 0, 1, 1, 1, 0, -1]
const dCol = [0, 1, 1, 1, 0, -1, -1, -1]
const isValidCoords = (map, row, col, W, H) =>
  row >= 0 && row < H && col >= 0 && col < W && map[row][col] !== VISITED && map[row][col] !== SEA

const answer = []

const dfs = (map, row, col, H, W) => {
  map[row][col] = VISITED
  for (let deltaIndex = 0; deltaIndex < 8; deltaIndex++) {
    const [nRow, nCol] = [row + dRow[deltaIndex], col + dCol[deltaIndex]]
    if (!isValidCoords(map, nRow, nCol, W, H)) continue
    dfs(map, nRow, nCol, H, W)
  }
}

const solution = (map, W, H) => {
  let islands = 0
  for (let row = 0; row < H; row++) {
    for (let col = 0; col < W; col++) {
      if (map[row][col] === VISITED || map[row][col] === SEA) continue
      dfs(map, row, col, H, W)
      islands++
    }
  }
  return islands
}

for (let i = 0; i < input.length; i++) {
  const [W, H] = input[i].split(' ').map(Number)
  const map = input.slice(i + 1, i + 1 + H).map((s) => s.split(' ').map(Number))
  answer.push(solution(map, W, H))
  i += H
}

console.log(answer.join('\n'))
