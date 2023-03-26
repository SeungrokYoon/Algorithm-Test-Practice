const [[M, N], ...infoArr] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const arr = new Array(M + 1).fill().map((_, index) => index)

const answer = infoArr.reduce((prevArr, currInput) => {
  const [i, j, k] = currInput
  const head = prevArr.slice(0, i)
  const frontMiddle = prevArr.slice(i, k)
  const rearMiddle = prevArr.slice(k, j + 1)
  const tail = prevArr.slice(j + 1)

  return [...head, ...rearMiddle, ...frontMiddle, ...tail]
}, arr)

console.log(answer.slice(1).join(' '))
