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

const getPermutations = function (arr, selectNumber) {
  const results = []
  if (selectNumber === 1) return arr.map((value) => [value])

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)]
    const permutations = getPermutations(rest, selectNumber - 1)
    const attached = permutations.map((permutation) => [fixed, ...permutation])
    results.push(...attached)
  })

  return results
}
const deepCopy = (arr) => {
  const temp = []
  arr.forEach((v) => {
    temp.push(v)
  })
  return temp
}

const solution = () => {
  //순열짜놓고 조합 내에서 계산하기
  const arr = Array.from({ length: N }, (_, i) => i + 1)
  const results = getPermutations(arr, N)
  for (const result of results) {
    let tempSum = 0
    const copiedPotions = deepCopy(potions)
    for (const currentChoice of result) {
      //구매
      tempSum += copiedPotions[currentChoice]
      //할인 적용
      for (const discount of discounts[currentChoice]) {
        const [target, amount] = discount
        copiedPotions[target] =
          copiedPotions[target] - amount <= 0 ? 1 : copiedPotions[target] - amount
      }
    }
    minTotal = Math.min(minTotal, tempSum)
  }
}

solution()
console.log(minTotal)
