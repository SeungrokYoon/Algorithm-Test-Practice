const n = require('fs').readFileSync(0).toString().trim() * 1

let margin = 1
const delta = 6
let step = 1

while (n > margin) {
  margin += delta * step++
}

console.log(step)
