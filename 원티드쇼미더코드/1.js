const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
//완탐? 그리디?
const N = input[0] * 1
const potions = [0].concat(input[1].split(' ').map(Number))
const discounts = Array.from({ length: N + 1 }, () => [])
let minTotal = 1000 * N
let index = 2
for (let i = 1; i <= N; i++) {
  discounts[i] = input
    .slice(index + 1, index + input[index] * 1 + 1)
    .map((s) => s.split(' ').map(Number))
  index = index + input[index] * 1 + 1
}

const deepCopy = (arr) => {
  const temp = []
  arr.forEach((v) => {
    temp.push(v)
  })
  return temp
}

const visited = Array.from({ length: N + 1 }, () => 0)
const dfs = (arr, costs, depth, tempSum) => {
  if (depth === N) {
    minTotal = Math.min(minTotal, tempSum)
    return
  }
  for (let i = 1; i <= N; i++) {
    if (visited[i]) continue
    visited[i] = 1
    //구매
    const copiedPotions = deepCopy(costs)
    for (const discount of discounts[i]) {
      const [target, amount] = discount
      copiedPotions[target] =
        copiedPotions[target] - amount <= 0 ? 1 : copiedPotions[target] - amount
    }
    dfs(arr, copiedPotions, depth + 1, tempSum + copiedPotions[i])
    visited[i] = 0
  }
}

const arr = Array.from({ length: N }, (_, i) => i + 1)
dfs(arr, potions, 0, 0)
console.log(minTotal)
