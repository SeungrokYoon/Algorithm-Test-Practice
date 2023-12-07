const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const dp = Array.from({ length: 50000 + 1 }, () => 0)

const solution = (n) => {
  for (let i = 1; i < N + 1; i++) {
    const closestSquareRoot = Math.floor(Math.sqrt(i))
    let min = N + 1
    for (let j = 1; j < closestSquareRoot + 1; j++) {
      min = Math.min(min, dp[i - j ** 2])
    }
    dp[i] = 1 + min
  }
  return dp[n]
}

console.log(solution(N))
