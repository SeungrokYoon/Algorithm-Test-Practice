//B2: 분해합
const input = require('fs').readFileSync(0).toString().trim() * 1

function genSeparateSum(n) {
  let sum = n
  while (n > 0) {
    const remainder = n % 10
    sum += remainder
    n = Math.floor(n / 10)
  }
  return sum
}

let answer = 0

for (let i = 0; i < input; i++) {
  if (genSeparateSum(i) === input) {
    answer = i
    break
  }
}

console.log(answer)
