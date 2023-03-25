const [len, numStr] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n')

let answer = 0

for (let i = 0; i < parseInt(len); i++) {
  answer += parseInt(numStr[i])
}

console.log(answer)
