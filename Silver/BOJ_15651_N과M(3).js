const targetDir = process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt'
const [N, M] = require('fs').readFileSync(targetDir).toString().trim().split(' ').map(Number)

let answer = ''
const pool = []

function search(count) {
  if (pool.length === M) {
    answer += pool.join(' ') + '\n'
    return
  }
  for (let i = 1; i <= N; i++) {
    pool.push(i)
    search(count + 1)
    pool.pop()
  }
}

search(0)

console.log(answer)
