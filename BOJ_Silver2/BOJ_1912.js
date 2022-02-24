const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const N = input[0] * 1
const arr = input[1].split(' ').map(Number)

const solution = () => {
  const dp = Array.from({ length: N }, () => 0)
  dp[0] = arr[0]
  for (let i = 1; i < N; i++) {
    dp[i] = Math.max(Math.max(arr[i - 1], dp[i - 1]), 0) + arr[i]
  }
  return Math.max(...dp)
}

console.log(solution())
