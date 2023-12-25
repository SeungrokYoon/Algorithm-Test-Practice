const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input[0].split(' ').map(Number)

const data = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b)

const pool = []
const result = []

const visited = Array.from({ length: N }, () => 0)
const permutationDFS = (index, count, r) => {
  if (count === r) {
    result.push(pool.join(' '))
    return
  }
  for (let i = 0; i < N; i++) {
    if (visited[i]) continue
    visited[i] = 1
    pool.push(data[i])
    permutationDFS(i, count + 1, r)
    pool.pop()
    visited[i] = 0
  }
}

permutationDFS(0, 0, M)
console.log(result.join('\n'))
