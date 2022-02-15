const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const N = input.shift()

const solution = (n) => {
  const fibo = Array.from({ length: n + 1 }).fill(0)
  for (let i = 0; i < n + 1; i++) {
    if (i === 0) {
      fibo[0] = [1, 0]
    } else if (i === 1) {
      fibo[1] = [0, 1]
    } else {
      fibo[i] = [fibo[i - 1][0] + fibo[i - 2][0], fibo[i - 1][1] + fibo[i - 2][1]]
    }
  }
  console.log(fibo[n][0], fibo[n][1])
}
for (let i = 0; i < N; i++) {
  solution(input[i])
}
