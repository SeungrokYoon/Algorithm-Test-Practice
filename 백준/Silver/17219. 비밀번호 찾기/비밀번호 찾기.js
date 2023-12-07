const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const answer = []
const map = new Map()

input.slice(1, 1 + N).forEach((l) => {
  const [key, value] = l.split(' ')
  map.set(key, value)
})

input.slice(1 + N).forEach((l) => {
  const key = l
  answer.push(map.get(key))
})

console.log(answer.join('\n'))
