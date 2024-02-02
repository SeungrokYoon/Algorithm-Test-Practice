const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const dwarfs = input.map(Number)

const pool = []
const results = []
const visited = Array.from({ length: dwarfs.length }, () => 0)
const combi = (depth, target) => {
  if (depth === target) {
    if (pool.reduce((acc, curr) => acc + curr, 0) === 100) {
      results.push(pool.sort((a, b) => a - b).join('\n'))
    }

    return
  }
  if (results.length) return
  for (let i = 0; i < visited.length; i++) {
    if (visited[i]) continue
    visited[i] = 1
    pool.push(dwarfs[i])
    combi(depth + 1, target)
    pool.pop()
    visited[i] = 0
  }
}

combi(0, 7)
console.log(results[0])
