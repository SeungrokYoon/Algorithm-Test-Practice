const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const map = input.slice(1).map((s) => s.split(''))

const isItSameForNonColorBlind = (colorA, colorB) => colorA === colorB
const isItSameForColorBlind = (colorA, colorB) => {
  const blindColorSet = new Set(['R', 'G'])
  if (colorA === colorB) return true
  if (blindColorSet.has(colorA) && blindColorSet.has(colorB)) return true
  return false
}

const dfs = (map, i, j, visited, compareFunc) => {
  const dRow = [0, 1, 0, -1]
  const dCol = [1, 0, -1, 0]
  const target = map[i][j]
  const N = map.length
  visited[i][j] = 1
  for (let idx = 0; idx < 4; idx++) {
    const [nRow, nCol] = [i + dRow[idx], j + dCol[idx]]
    if (
      nRow < 0 ||
      nRow >= N ||
      nCol < 0 ||
      nCol >= N ||
      visited[nRow][nCol] ||
      !compareFunc(target, map[nRow][nCol])
    )
      continue
    dfs(map, nRow, nCol, visited, compareFunc)
  }
}

const findSectors = (map, compareFunc) => {
  const N = map.length
  const visited = Array.from({ length: N }, () => Array.from({ length: N }, () => 0))
  let sectors = 0
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue
      dfs(map, i, j, visited, compareFunc)
      sectors++
    }
  }
  return sectors
}

const answer = []
answer.push(findSectors(map, isItSameForNonColorBlind))
answer.push(findSectors(map, isItSameForColorBlind))

console.log(answer.join(' '))
