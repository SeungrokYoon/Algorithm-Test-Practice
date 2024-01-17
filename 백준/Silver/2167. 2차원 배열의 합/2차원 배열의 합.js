const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const [N, M] = input[0].split(' ').map(Number)
const arr = input.slice(1, 1 + N).map((l) => l.split(' ').map(Number))

const answer = []
input.slice(N + 2).map((l) => {
  let sum = 0
  const [i, j, x, y] = l.split(' ').map(Number)
  for (let row = i - 1; row <= x - 1; row++) {
    for (let col = j - 1; col <= y - 1; col++) {
      sum += arr[row][col]
    }
  }
  answer.push(sum)
})

console.log(answer.join('\n'))
