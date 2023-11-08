const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const arr = input[1]
  .split(' ')
  .map(Number)
  .map((v, i) => ({ index: i, move: v, shot: false }))

let answer = ''
let currI = 0
let remaining = N

while (remaining) {
  remaining--
  arr[currI].shot = true
  answer += currI + 1 + ' '
  let { move } = arr[currI]
  let counter = Math.abs(arr[currI].move)
  while (counter && remaining) {
    const nextI = move > 0 ? (currI + 1) % N : (currI + N - 1) % N
    if (!arr[nextI].shot) counter--
    currI = nextI
  }
}

console.log(answer.trim())
