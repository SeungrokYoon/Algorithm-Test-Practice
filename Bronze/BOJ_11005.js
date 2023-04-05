const [inputStr, base] = require('fs').readFileSync(0).toString().trim().split(' ').map(Number)
console.log(inputStr.toString(base).toUpperCase())
