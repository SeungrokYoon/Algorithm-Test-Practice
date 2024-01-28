const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]
const dismissStr = input[1]
const LIMIT = 641
let idx = 0
let cnt = 0
while (idx < N) {
  if (Number(dismissStr[idx]) === 0) {
    idx--
    continue
  }
  if (idx + 3 <= N && Number(dismissStr.slice(idx, idx + 3)) <= LIMIT) {
    cnt++
    idx += 3
    continue
  }
  if (idx + 2 <= N && Number(dismissStr.slice(idx, idx + 2)) <= LIMIT) {
    cnt++
    idx += 2
    continue
  }
  cnt++
  idx++
}
console.log(cnt)
