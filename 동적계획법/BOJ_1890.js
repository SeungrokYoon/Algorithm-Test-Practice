const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift() * 1
const map = input.map((i) => i.split(' ').map((j) => +j))
const temp = new Array(N).fill(0)
const dp = temp.fill(0).map((i) => new Array(N).fill(0))

const solution = () => {
  const stack = []
  if (map[0][0] < N) {
    stack.push([0, map[0][0]])
    stack.push([map[0][0], 0])
    dp[0][map[0][0]] += 1
    dp[map[0][0]][0] += 1
  }
  while (stack.length > 0) {
    const [x, y] = stack.pop()
    const nextHop = map[x][y]
    if (x + nextHop < N && nextHop !== 0) {
      stack.push([x + nextHop, y])
      dp[x + nextHop][y] += dp[x][y]
    }
    if (y + nextHop < N && nextHop !== 0) {
      stack.push([x, y + nextHop])
      dp[x][y + nextHop] += dp[x][y]
    }
  }
  console.log(dp[N - 1][N - 1])
}

solution()
