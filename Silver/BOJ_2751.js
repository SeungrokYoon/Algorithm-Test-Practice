const [N, ...arr] = require('fs').readFileSync(0).toString().trim().split('\n').map(Number)
console.log(arr.sort((a, b) => a - b).join('\n'))
