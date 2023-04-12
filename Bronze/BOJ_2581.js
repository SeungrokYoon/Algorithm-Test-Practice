const [M, N] = require('fs').readFileSync(0).toString().trim().split('\n').map(Number)

const matrix = Array.from({ length: N + 1 }).fill(1)
matrix[0] = 0
matrix[1] = 0

for (let i = 2; i <= Math.floor(Math.sqrt(N)); i++) {
  let k = 2
  while (i * k < matrix.length) {
    matrix[i * k] = 0
    k++
  }
}

let sum = 0
let min = N + 1
for (let j = M; j < N + 1; j++) {
  matrix[j] === 1 ? (sum += j) : ''
  matrix[j] === 1 && j < min ? (min = j) : ''
}

if (sum !== 0) {
  console.log(sum)
  console.log(min)
} else {
  console.log(-1)
}
