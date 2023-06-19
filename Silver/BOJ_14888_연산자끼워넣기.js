const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const MAX = Number.MAX_SAFE_INTEGER
const MIN = Number.MIN_SAFE_INTEGER
const N = +input[0]
const numArr = input[1].split(' ').map(Number)

let [add, sub, mul, div] = input[2].split(' ').map(Number)
let max = MIN
let min = MAX

const dfs = (currDepth, targetDepth, calcResult) => {
  if (currDepth === targetDepth) {
    max = Math.max(max, calcResult)
    min = Math.min(min, calcResult)
    return
  }

  if (add > 0) {
    add -= 1
    dfs(currDepth + 1, targetDepth, calcResult + numArr[currDepth])
    add += 1
  }
  if (sub > 0) {
    sub -= 1
    dfs(currDepth + 1, targetDepth, calcResult - numArr[currDepth])
    sub += 1
  }
  if (mul > 0) {
    mul -= 1
    dfs(currDepth + 1, targetDepth, calcResult * numArr[currDepth])
    mul += 1
  }
  if (div > 0) {
    div -= 1
    dfs(currDepth + 1, targetDepth, parseInt(calcResult / numArr[currDepth]))
    div += 1
  }
}

dfs(1, N, numArr[0])
console.log(max === 0 ? 0 : max)
console.log(min === 0 ? 0 : min)
