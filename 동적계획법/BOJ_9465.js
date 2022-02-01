const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = input.shift()

const solution = (n, arr) => {
  const temp = new Array(2).fill(0)
  const memoizationTable = temp.map((i) => new Array(n).fill(0))
  memoizationTable[0][0] = arr[0][0]
  memoizationTable[1][0] = arr[1][0]
  for (let i = 1; i < n; i++) {
    memoizationTable[0][i] =
      Math.max(memoizationTable[1][i - 1], i >= 2 ? memoizationTable[1][i - 2] : 0) + arr[0][i]
    memoizationTable[1][i] =
      Math.max(memoizationTable[0][i - 1], i >= 2 ? memoizationTable[0][i - 2] : 0) + arr[1][i]
  }
  return Math.max(memoizationTable[0][n - 1], memoizationTable[1][n - 1])
}

//정답 도출
for (let count = 0; count < N * 3; count += 3) {
  const n = input[count] * 1
  const arr = []
  arr.push(input[count + 1].split(' ').map((i) => +i))
  arr.push(input[count + 2].split(' ').map((i) => +i))
  console.log(solution(n, arr))
}
