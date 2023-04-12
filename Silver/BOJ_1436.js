//S5: 영화감독 숌
const n = require('fs').readFileSync('test/test.txt').toString().trim() * 1

const isDoommedNumber = (num) => {
  const str = num.toString()
  const regExp = new RegExp(/(6{3,})/g)
  const isDoommed = regExp.test(str)
  return isDoommed
}

let answer = 665
let count = 0
while (count !== n) {
  isDoommedNumber(++answer) ? count++ : ''
}

console.log(answer)
