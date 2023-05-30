const input = require('fs').readFileSync(0).toString().trim() * 1

function fibonnaci(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fibonnaci(n - 1) + fibonnaci(n - 2)
}

console.log(fibonnaci(input))
