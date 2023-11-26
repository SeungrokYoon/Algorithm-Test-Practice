const isRightTriangle = (a, b, c) => {
  const sorted = [a, b, c].sort((a, b) => a - b).map((n) => n ** 2)
  return sorted[2] === sorted[0] + sorted[1]
}

const answer = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))
  .map((line) => (isRightTriangle(...line) ? 'right' : 'wrong'))

answer.pop()

console.log(answer.join('\n'))
