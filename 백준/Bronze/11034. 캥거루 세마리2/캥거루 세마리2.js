const tests = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const isProceed = (a, b, c) => {
  const prevMid = Math.floor((a + b) / 2)
  const postMid = Math.floor((b + c) / 2)
  if ((a < prevMid && prevMid < b) || (b < postMid && postMid < c)) return true
  return false
}

const genNext = ([a, b, c]) => {
  const frontDelta = b - a
  const rearDelta = c - b
  return frontDelta > rearDelta ? [a, Math.floor((a + b) / 2), b] : [b, Math.floor((b + c) / 2), c]
}

const answer = []
tests.forEach((element) => {
  const [a, b, c] = element.split(' ').map(Number)
  const frontDelta = b - a - 1
  const rearDelta = c - b - 1
  answer.push(Math.max(frontDelta, rearDelta))
})

console.log(answer.join('\n'))
