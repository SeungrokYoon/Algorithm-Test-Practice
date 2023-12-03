const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const [N, M] = input[0]
const arr = [0].concat(input[1])

const dp = arr.reduce((acc, curr, i) => {
  if (i === 0) {
    acc.push(curr)
    return acc
  }
  acc.push(acc[acc.length - 1] + curr)
  return acc
}, [])

const answer = input
  .slice(2)
  .reduce((acc, curr) => {
    acc.push(dp[curr[1]] - dp[curr[0] - 1])
    return acc
  }, [])
  .join('\n')

console.log(answer)
