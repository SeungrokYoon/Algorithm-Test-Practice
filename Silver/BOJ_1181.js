const [n, ...arr] = require('fs').readFileSync(0).toString().trim().split('\n')
arr.sort((prev, curr) => prev.length - curr.length || prev.localeCompare(curr, 'en'))
const answer = arr.reduce((acc, curr, index, self) => {
  if (self[index - 1] === curr) {
    return acc
  }
  return acc + curr + '\n'
}, '')

console.log(answer)
