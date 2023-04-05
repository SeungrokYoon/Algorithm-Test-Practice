const [inputStr, base] = require('fs').readFileSync(0).toString().trim().split(' ')
console.log(parseInt(inputStr, base * 1))
