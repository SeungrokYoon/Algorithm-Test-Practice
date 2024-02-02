const inputStr = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
const answer = []

const visited = []
const pool = []
const permu = (depth, slate) => {
  if (depth === 2) {
    const firstPart = inputStr.slice(0, pool[0]).split('').reverse().join('')
    const secondPart = inputStr.slice(pool[0], pool[1]).split('').reverse().join('')
    const thirdPart = inputStr.slice(pool[1]).split('').reverse().join('')
    answer.push(firstPart + secondPart + thirdPart)
    return
  }
  for (let i = 1; i < inputStr.length; i++) {
    if (i <= slate || visited[i]) continue
    visited[i] = 1
    pool.push(i)
    permu(depth + 1, i)
    visited[i] = 0
    pool.pop()
  }
}
permu(0, -1)
console.log(answer.sort()[0])
