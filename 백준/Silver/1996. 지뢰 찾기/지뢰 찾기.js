const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]
const map = input.slice(1).map((l) => l.split('').map((ch) => (ch === '.' ? 0 : Number(ch))))
const completedMap = Array.from({ length: N }, () => Array.from({ length: N }, () => 0))

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] !== 0) {
      completedMap[i][j] = '*'
      continue
    }
    const dRow = [-1, -1, -1, 0, 1, 1, 1, 0]
    const dCol = [-1, 0, 1, 1, 1, 0, -1, -1]
    let sum = 0
    for (let count = 0; count < 8; count++) {
      const nR = i + dRow[count]
      const nC = j + dCol[count]
      if (nR >= 0 && nC >= 0 && nR < N && nC < N) {
        sum += map[nR][nC]
      }
    }
    completedMap[i][j] = sum >= 10 ? 'M' : sum.toString()
  }
}

console.log(completedMap.map((arr) => arr.join('')).join('\n'))
