const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const answer = []
input.slice(1).forEach((l) => {
  const scores = l
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)
  scores.shift()
  scores.pop()
  const min = scores[0]
  const max = scores[2]
  max - min >= 4 ? answer.push('KIN') : answer.push(scores[0] + scores[1] + scores[2])
})

console.log(answer.join('\n'))
