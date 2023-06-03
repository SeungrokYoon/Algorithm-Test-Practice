const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

let answer = ''
let pool = []

function search(deps, startIndex) {
  if (deps === M) {
    answer += pool.join(' ') + '\n'
    return
  }
  for (let i = startIndex; i <= N; i++) {
    pool.push(i)
    search(deps + 1, i + 1)
    pool.pop()
  }
}
search(0, 1)

console.log(answer)
