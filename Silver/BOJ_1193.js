const n = require('fs').readFileSync(0).toString().trim() * 1

let current = 0
let delta = 1

while (current + delta < n) {
  current += delta++
}

delta % 2 == 0
  ? console.log(`${n - current}/${delta - (n - current) + 1}`)
  : console.log(`${delta - (n - current) + 1}/${n - current}`)
