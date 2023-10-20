const input = require('fs').readFileSync(0).toString().trim().split('\n').map(Number)

let answer = ''

const solution = (n) => {
  const arr = [0, 1, 1, 1, 2, 2, 3]
  for (let i = 7; i < n + 1; i++) {
    arr.push(arr[i - 1] + arr[i - 5])
  }
  return arr[n]
}

input.forEach((n, i) => {
  if (i === 0) return
  answer += solution(n) + '\n'
})

console.log(answer)
