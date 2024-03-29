const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(/([+  -])/g)

const solution = () => {
  let sum = 0
  let minus = 0
  let currentOperator = 1
  for (const element of input) {
    if (element === '+') {
      continue
    } else if (element === '-') {
      if (currentOperator === -1) {
        sum -= minus
        minus = 0
        continue
      }
      currentOperator = -1
    } else {
      const num = element * 1
      currentOperator === -1 ? (minus += num) : (sum += num)
    }
  }
  console.log(sum - minus)
}
solution()
