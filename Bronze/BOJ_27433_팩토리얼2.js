const input = require('fs').readFileSync(0).toString().trim() * 1

function factorial(n) {
  if (n < 1) return 1
  return n * factorial(n - 1)
}

console.log(factorial(input))
