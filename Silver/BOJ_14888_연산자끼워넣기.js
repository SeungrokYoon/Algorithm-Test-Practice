const MAX = Number.MAX_SAFE_INTEGER
const MIN = Number.MIN_SAFE_INTEGER

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = input[0]
const numArr = input[1].split(' ').map(Number)
const [plus, minus, multiply, divide] = input[2].split(' ').map(Number)
const operators = (
  '+'.repeat(plus) +
  '-'.repeat(minus) +
  '*'.repeat(multiply) +
  '/'.repeat(divide)
).split('')
const operatorPool = []
const result = { max: MIN, min: MAX }

const dfs = (currDepth, targetDepth) => {
  if (currDepth === targetDepth) {
    const calcResult = numArr.reduce((acc, curr, i) => {
      if (i === 0) {
        return acc + curr
      } else {
        if (operatorPool[i - 1] === '/') {
          return acc > 0 ? Math.floor(acc / curr) : -1 * Math.floor((-1 * acc) / curr)
        } else {
          if (operatorPool[i - 1] === '+') {
            return acc + curr
          }
          if (operatorPool[i - 1] === '-') {
            return acc - curr
          }
          if (operatorPool[i - 1] === '*') {
            return acc * curr
          }
        }
      }
    }, 0)

    result.max = result.max ? Math.max(result.max, calcResult) : calcResult
    result.min = result.min ? Math.min(result.min, calcResult) : calcResult
    return
  }
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i]
    if (operator === 'v') continue
    operatorPool.push(operators[i])
    operators[i] = 'v'
    dfs(currDepth + 1, targetDepth)
    operatorPool.pop()
    operators[i] = operator
  }
}

dfs(0, operators.length)
console.log(result.max)
console.log(result.min)
