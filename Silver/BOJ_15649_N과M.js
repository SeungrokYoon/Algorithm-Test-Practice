const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const visited = new Array(N + 1).fill(false)
const pool = []
const result = []

const dfs = (visited, count, end) => {
  if (count === end) {
    const res = pool.join(' ')
    result.push(res)
    return
  }
  for (let i = 1; i < visited.length; i++) {
    if (visited[i]) continue
    visited[i] = true
    pool.push(i)
    dfs(visited, count + 1, M)
    visited[i] = false
    pool.pop()
  }
}

dfs(visited, 0, M)
console.log(result.join('\n'))
