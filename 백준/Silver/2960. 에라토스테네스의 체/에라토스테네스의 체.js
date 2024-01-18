const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const [N, K] = input.split(' ').map(Number)
const net = Array.from({ length: N + 1 }, () => 0)
let count = 0
let answer = 0
for (let i = 2; i < N + 1; i++) {
  for (let j = 1; i * j < N + 1; j++) {
    const numToDelete = i * j
    if (net[numToDelete] === 0) {
      net[numToDelete] = 1
      count++
      if (count === K) {
        answer = numToDelete
        break
      }
    }
  }
}

console.log(answer)
