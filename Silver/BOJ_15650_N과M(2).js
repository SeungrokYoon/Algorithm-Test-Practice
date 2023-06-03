const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

let answer = ''

const dfs = (visited, n, m, pool, prev, count) => {
  if (count === m) {
    answer += pool.join(' ') + '\n'
    return
  }
  for (let i = 1; i < n + 1; i++) {
    if (i <= prev) continue
    visited[i] = true
    pool.push(i)
    dfs(visited, n, m, pool, i, count + 1)
    visited[i] = false
    pool.pop(i)
  }
}

const solution = (N, M) => {
  const visited = new Array(N + 1).fill(false)
  const pool = []
  dfs(visited, N, M, pool, 0, 0)
}

solution(N, M)

console.log(answer)
