const platform = process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt'
const input = require('fs').readFileSync(platform).toString().trim() * 1

let executionRecursion = 0
let executionDP = 0

function fibonacciRecursion(n) {
  if (n == 1 || n == 2) {
    executionRecursion++
    return 1
  }
  return fibonacciRecursion(n - 1) + fibonacciRecursion(n - 2)
}

function fibonacciDP(n) {
  const dp = new Array(n).fill(0)
  dp[1] = dp[2] = 1
  for (let i = 3; i < n + 1; i++) {
    executionDP++
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

fibonacciRecursion(input)
fibonacciDP(input)

console.log(`${executionRecursion} ${executionDP}`)
