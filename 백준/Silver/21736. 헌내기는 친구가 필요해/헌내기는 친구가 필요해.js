const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const map = input.slice(1).map((l) => l.split(''))

const findDoyeonPosition = (n, m, map) => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 'I') return [i, j]
    }
  }
}

const countPeople = ({ height, width, map, startRow, startCol }) => {
  let count = 0
  const dRow = [0, 1, 0, -1]
  const dCol = [1, 0, -1, 0]
  const dfs = (r, c, map) => {
    if (map[r][c] === 'P') count++
    map[r][c] = 'X'
    for (let idx = 0; idx < 4; idx++) {
      const [nRow, nCol] = [r + dRow[idx], c + dCol[idx]]
      if (nRow >= 0 && nRow < height && nCol >= 0 && nCol < width && map[nRow][nCol] !== 'X') {
        dfs(nRow, nCol, map)
      }
    }
  }
  dfs(startRow, startCol, map)
  return count || 'TT'
}

const [startRow, startCol] = findDoyeonPosition(N, M, map)
console.log(countPeople({ height: N, width: M, map, startRow, startCol }))
