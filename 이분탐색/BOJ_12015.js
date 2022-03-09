const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]
const arr = input[1].split(' ').map(Number)
const dp = [0]
for (let i = 0; i < N; i++) {
  const current = arr[i]
  if (dp[dp.length - 1] < current) {
    dp.push(current)
    continue
  }
  let lowerBound = 1
  let upperBound = dp.length - 1
  let maxAvailablePos = dp.length - 1
  while (lowerBound <= upperBound) {
    const mid = Math.floor((lowerBound + upperBound) / 2)
    if (dp[mid] >= current) {
      upperBound = mid - 1
      maxAvailablePos = mid
      continue
    }
    lowerBound = mid + 1
  }
  dp[maxAvailablePos] = current
}
console.log(dp.length - 1)
