const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const CMD_CODE = +input[1][0]
const QUESTION = CMD_CODE === 1 ? +input[1].split(' ')[1] : input[1].split(' ').slice(1).join(' ')

const visited = Array(N + 1).fill(0)
let permutationNumber = 1
const pool = []
let found = false

const permutation = (depth, target) => {
  if (depth === target) {
    const keyStr = pool.join(' ')
    if (CMD_CODE === 1 && permutationNumber === QUESTION) {
      console.log(keyStr)
      found = true
    } else if (CMD_CODE === 2 && QUESTION === keyStr) {
      console.log(permutationNumber)
      found = true
    } else {
      permutationNumber++
    }
  }
  if (found) return
  for (let i = 1; i < N + 1; i++) {
    if (visited[i]) continue
    visited[i] = 1
    pool.push(i)
    permutation(depth + 1, target)
    visited[i] = 0
    pool.pop()
  }
}
permutation(0, N)
