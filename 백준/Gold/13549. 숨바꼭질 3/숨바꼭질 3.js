const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const [N, K] = input.split(' ').map(Number)
const dp = Array.from({ length: 100000 + 1 }, () => Number.MAX_SAFE_INTEGER)
dp[N] = 0

const queue = [{ currPos: N, dist: 0 }]

let answer = 0
while (queue.length) {
  const { currPos, dist } = queue.shift()
  if (currPos === K) {
    answer = dist
    break
  }
  const TELEPORT = currPos * 2
  if (currPos !== 0 && dp[TELEPORT] > dist) {
    queue.push({ currPos: TELEPORT, dist })
    dp[TELEPORT] = dist
  }
  const MINUS_STEP = currPos - 1
  if (MINUS_STEP >= 0 && dp[MINUS_STEP] > dist + 1) {
    queue.push({ currPos: MINUS_STEP, dist: dist + 1 })
    dp[MINUS_STEP] = dist + 1
  }
  const PLUS_STEP = currPos + 1
  if (PLUS_STEP >= 0 && dp[PLUS_STEP] > dist + 1) {
    queue.push({ currPos: PLUS_STEP, dist: dist + 1 })
    dp[PLUS_STEP] = dist + 1
  }
}

console.log(answer)
