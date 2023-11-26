const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const calcNumberOfLans = (arr, divider) => {
  return arr.reduce((acc, curr) => {
    return acc + Math.floor(curr / divider)
  }, 0)
}

const [K, N] = input[0].split(' ').map(Number)
const lans = input.slice(1).map(Number)
const max = Math.max(...lans)

let left = 1
let right = max + 1

while (left < Math.floor((left + right) / 2)) {
  const mid = Math.floor((left + right) / 2)
  const num = calcNumberOfLans(lans, mid)
  if (num < N) {
    right = mid
  } else {
    left = mid
  }
}

console.log(left)
