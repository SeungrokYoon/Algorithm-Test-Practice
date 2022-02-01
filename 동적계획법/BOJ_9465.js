const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = input.shift()

const solution = (n, arr) => {
  let pointer = 0
  const memoizationTable = []
  memoizationTable.push([
    arr[0][pointer],
    arr[1][pointer],
    Math.max(arr[0][pointer], arr[1][pointer]),
  ])
  pointer++
  while (pointer < n) {
    const previous = memoizationTable[pointer - 1]
    const prePreviousMax = pointer >= 2 ? Math.max(...memoizationTable[pointer - 2]) : 0
    const currentMax = Math.max(arr[0][pointer], arr[1][pointer])
    const first = previous[1] + arr[0][pointer]
    const second = previous[0] + arr[1][pointer]
    const third = prePreviousMax + currentMax
    memoizationTable.push([first, second, third])
    pointer++
  }
  return Math.max(...memoizationTable[n - 1])
}

//정답 도출
for (let count = 0; count < N * 3; count += 3) {
  const n = input[count] * 1
  const arr = []
  arr.push(input[count + 1].split(' ').map((i) => +i))
  arr.push(input[count + 2].split(' ').map((i) => +i))
  console.log(solution(n, arr))
}
