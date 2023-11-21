const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const edges = input[1].split(' ').map(Number)
const prices = input[2].split(' ').map(Number)

let sum = BigInt(0)
let currentPointer = 0
while (currentPointer < N) {
  let endPointer = currentPointer
  while (prices[currentPointer] < prices[endPointer + 1]) {
    endPointer++
  }

  sum += BigInt(
    prices[currentPointer] * edges.slice(currentPointer, endPointer + 1).reduce((a, b) => a + b, 0),
  )
  currentPointer === endPointer ? currentPointer++ : (currentPointer = endPointer + 1)
}

console.log(sum.toString())
