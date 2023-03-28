const input = require('fs').readFileSync('test/test.txt').toString().trim().toUpperCase()
const last = input.split('').reduce(
  (prev, curr) => {
    prev[curr] ? (prev[curr] += 1) : (prev[curr] = 1)
    prev[curr] > prev['max'] ? (prev['max'] = prev[curr]) : ''
    return prev
  },
  { max: 0 },
)

const answerArr = Object.keys(last).filter((e) => last[e] === last.max && e !== 'max')
console.log(answerArr.length === 1 ? answerArr[0] : '?')
