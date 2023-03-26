const input = require('fs').readFileSync(0).toString().trim().split(' ').map(Number)
const compareStr = '112228'

console.log(
  input
    .reduce((prev, curr, i) => {
      prev.push(compareStr[i] - curr)
      return prev
    }, [])
    .join(' '),
)
