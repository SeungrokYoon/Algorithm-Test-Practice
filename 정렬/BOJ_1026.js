const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')
const N = 1 * input.shift()
const [A, B] = input.map((s) => s.split(' ').map((i) => +i))
A.sort((a, b) => a - b)
B.sort((a, b) => a - b)

let answer = 0
for (let i = 0; i < N; i++) {
  answer += A[i] * B[N - i - 1]
}
console.log(answer)
