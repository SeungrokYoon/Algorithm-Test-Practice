const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]
const adjMatrix = input.slice(1).map((l) => l.split(' ').map(Number))

for (let mid = 0; mid < N; mid++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (adjMatrix[i][mid] && adjMatrix[mid][j]) adjMatrix[i][j] = 1
    }
  }
}

console.log(adjMatrix.map((l) => l.join(' ')).join('\n'))
