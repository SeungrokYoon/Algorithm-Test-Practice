const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const calcNumberOfLans = (arr, divider) => {
  return arr.reduce((acc, curr) => acc + Math.floor(curr / divider), 0)
}

const [K, N] = input[0].split(' ').map(Number)
const lans = input.slice(1).map(Number)
const max = Math.max(...lans)

let left = 1
let right = max

while (left <= right) {
  const mid = Math.floor((left + right) / 2)
  const num = calcNumberOfLans(lans, mid)
  if (num < N) {
    right = mid - 1
  } else {
    left = mid + 1
  }
}

console.log(right)
