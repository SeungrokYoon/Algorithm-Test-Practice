const [n, ...arr] = require('fs').readFileSync(0).toString().trim().split('\n')
arr.sort((prev, curr) => {
  const [x1, y1] = prev.split(' ').map(Number)
  const [x2, y2] = curr.split(' ').map(Number)
  return y1 - y2 || x1 - x2
})
const answer = arr.reduce((acc, curr) => {
  return acc + curr + '\n'
}, '')

console.log(answer)
