const K =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim()
    .split('\n') * 1

const dp = Array.from({ length: 46 }, () => '')

dp[0] = { A: 1, B: 0 }
dp[1] = { A: 0, B: 1 }

for (let i = 2; i < 46; i++) {
  dp[i] = { A: dp[i - 1].B, B: dp[i - 1].B + dp[i - 1].A }
}

console.log(`${dp[K].A} ${dp[K].B}`)
