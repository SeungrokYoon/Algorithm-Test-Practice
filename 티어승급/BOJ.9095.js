const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

input.shift()
const solution = (n) => {
  const arr = Array.from({ length: n + 1 }, () => 0)
  arr[1] = 1
  arr[2] = 2
  arr[3] = 4
  for (let i = 4; i < n + 1; i++) {
    arr[i] = arr[i - 1] + arr[i - 2] + arr[i - 3]
  }
  return arr[n]
}

for (const n of input) {
  console.log(solution(n))
}
