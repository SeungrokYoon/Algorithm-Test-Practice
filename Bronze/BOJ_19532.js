//B2: 수학은 비대면강의입니다
const [a, b, c, d, e, f] = require('fs').readFileSync(0).toString().trim().split(' ').map(Number)
const x = (c * e - b * f) / (a * e - b * d)
const y = (c * d - a * f) / (b * d - a * e)
console.log(`${x} ${y}`)
