const [info, numStr] = require('fs').readFileSync(0).toString().trim().split('\n')
const [N, k] = info.split(' ').map(Number)
const sortedNumArr = numStr
  .split(' ')
  .map(Number)
  .sort((a, b) => b - a)

console.log(sortedNumArr[k - 1])
