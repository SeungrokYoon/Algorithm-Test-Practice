const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const data = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b)
let left = 0
let right = data[N - 1]

let answer = 0

const getTreesFromCutting = (arr, target) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= target) continue
    sum += arr[i] - target
  }
  return sum
}

while (left <= right) {
  const targetHeight = Math.floor((left + right) / 2)
  const treesFromCutting = getTreesFromCutting(data, targetHeight)
  if (treesFromCutting < M) {
    right = targetHeight - 1
  } else {
    answer = targetHeight
    left = targetHeight + 1
  }
}

console.log(answer)
