const input = require('fs').readFileSync(0).toString().trim() * 1

function menOfPassion(n) {
  if (n === 1 || n === 2) {
    return 0
  }
  return (BigInt(n * (n - 1) * (n - 2)) / BigInt(6)).toString()
}

console.log(menOfPassion(input))
console.log(3)
