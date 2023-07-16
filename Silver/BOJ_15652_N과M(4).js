const targetDir = process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt'
const [N, M] = require('fs').readFileSync(targetDir).toString().trim().split(' ').map(Number)

let answer = ''
const pool = []

function search(deps, startIndex) {
  if (pool.length === M) {
    answer += pool.join(' ') + '\n'
    return
  }
  for (let i = startIndex; i <= N; i++) {
    pool.push(i)
    search(deps + 1, i)
    pool.pop()
  }
}

search(M, 1)

console.log(answer)
