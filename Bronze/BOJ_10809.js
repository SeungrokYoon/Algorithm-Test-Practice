const input = require('fs').readFileSync('dev/stdin').toString().trim()

const answerArr = []

for (let i = 'a'.charCodeAt(0); i < 'z'.charCodeAt(0) + 1; i++) {
  const exists = input.indexOf(String.fromCharCode(i))
  answerArr.push(exists)
}

console.log(answerArr.join(' '))
