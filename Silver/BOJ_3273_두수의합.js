const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const data = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b)
const X = +input[2]

let answer = 0
let l = 0
let r = data.length - 1

while (l < r) {
  const sum = data[l] + data[r]
  if (sum === X) {
    answer++
    l++
    r--
  } else if (sum > X) {
    r--
  } else {
    l++
  }
}

console.log(answer)
