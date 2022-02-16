const n = require('fs').readFileSync('/dev/stdin').toString().trim() * 1

const solution = () => {
  const arr = Array.from({ length: n + 1 }, () => 0)
  arr[1] = 1
  arr[2] = 2
  for (let i = 3; i < n + 1; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % 10007
  }
  return arr[n]
}

console.log(solution())
