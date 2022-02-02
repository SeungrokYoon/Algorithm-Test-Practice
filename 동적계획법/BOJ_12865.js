const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, K] = input
  .shift()
  .split(' ')
  .map((i) => +i)

let arr = input.map((i) => {
  const [weight, value] = i.split(' ').map((i) => +i)
  return { weight, value }
})

arr = [{ weight: 0, value: 0 }].concat(arr)

const solution = () => {
  const temp = new Array(N + 1).fill(0)
  const dp = temp.map((i) => new Array(K + 1).fill(0))
  for (let maxWeight = 1; maxWeight < K + 1; maxWeight++) {
    for (let index = 1; index < N + 1; index++) {
      if (arr[index].weight > maxWeight) {
        dp[index][maxWeight] = dp[index - 1][maxWeight]
      } else {
        dp[index][maxWeight] = Math.max(
          dp[index - 1][maxWeight],
          dp[index - 1][maxWeight - arr[index].weight] + arr[index].value,
        )
      }
    }
  }
  console.log(dp[N][K])
}

solution()
