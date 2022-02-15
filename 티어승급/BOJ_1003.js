const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const N = input.shift()

const solution = (n) => {
  let zeros = 0
  let ones = 0
  const fibonacci = (n) => {
    if (n == 0) {
      zeros++
      return 0
    } else if (n === 1) {
      ones++
      return 1
    } else {
      return fibonacci(n - 1) + fibonacci(n - 2)
    }
  }
  fibonacci(n)
  console.log(zeros, ones)
}
for (let i = 0; i < N; i++) {
  solution(input[i])
}
