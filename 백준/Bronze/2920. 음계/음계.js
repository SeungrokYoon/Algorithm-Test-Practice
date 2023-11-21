const inputArr = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const answers = { asc: 'ascending', desc: 'descending', mix: 'mixed' }

let ascending = true
let descending = true
for (let i = 0; i < inputArr.length; i++) {
  if (!(ascending || descending)) break
  if (inputArr[i] !== i + 1) ascending = false
  if (inputArr[i] !== inputArr.length - i) descending = false
}

console.log(ascending ? answers.asc : descending ? answers.desc : answers.mix)
